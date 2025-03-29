import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is not set');
}

const prisma = new PrismaClient();
const openai = new OpenAI();

interface GradingSystem {
  scale: {
    min: number;
    max: number;
    passing: number;
  };
  conversion: {
    A: { min: number; max: number };
    B: { min: number; max: number };
    C: { min: number; max: number };
    D: { min: number; max: number };
    F: { min: number; max: number };
  };
}

interface DegreeEquivalence {
  localDegree: string;
  usEquivalent: string;
  credits: number;
  duration: string;
}

interface EducationSystem {
  country: string;
  gradingSystem: GradingSystem;
  degreeEquivalences: DegreeEquivalence[];
}

export async function getCountryRules(country: string): Promise<EducationSystem> {
  // Try to get existing rules from database
  const existingRules = await prisma.countryRules.findUnique({
    where: { country }
  });

  if (existingRules) {
    return JSON.parse(existingRules.rules);
  }

  // Generate rules if they don't exist
  const rules = await generateCountryRules(country);
  
  // Save to database
  await prisma.countryRules.create({
    data: {
      country,
      rules: JSON.stringify(rules)
    }
  });

  return rules;
}

async function generateCountryRules(country: string): Promise<EducationSystem> {
  const prompt = `Generate detailed education system rules for ${country} including:
1. Grading system with scale (minimum, maximum, and passing grades)
2. Grade conversion to US system (A, B, C, D, F)
3. Common degrees and their US equivalents
4. Typical duration and credits for each degree

Format as JSON matching this TypeScript interface:
interface EducationSystem {
  country: string;
  gradingSystem: {
    scale: { min: number; max: number; passing: number };
    conversion: {
      A: { min: number; max: number };
      B: { min: number; max: number };
      C: { min: number; max: number };
      D: { min: number; max: number };
      F: { min: number; max: number };
    };
  };
  degreeEquivalences: Array<{
    localDegree: string;
    usEquivalent: string;
    credits: number;
    duration: string;
  }>;
}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { 
        role: "system", 
        content: "You are an expert in international education systems and credential evaluation." 
      },
      { 
        role: "user", 
        content: prompt 
      }
    ],
    response_format: { type: "json_object" }
  });

  const content = completion.choices[0].message.content;
  if (!content) {
    throw new Error(`Failed to generate rules for ${country}`);
  }

  return JSON.parse(content) as EducationSystem;
}

export async function evaluateCredentials(
  documentType: string,
  parsedData: any,
  country: string
): Promise<any> {
  const countryRules = await getCountryRules(country);
  
  if (documentType === 'transcript') {
    return evaluateTranscript(parsedData, countryRules);
  } else if (documentType === 'diploma') {
    return evaluateDiploma(parsedData, countryRules);
  }
  
  throw new Error('Unsupported document type');
}

function evaluateTranscript(parsedData: any, rules: EducationSystem) {
  const { courses, grades, gpa } = parsedData;
  const evaluatedCourses = courses.map((course: any) => {
    const numericGrade = parseFloat(course.grade);
    let usGrade = 'F';
    
    for (const [grade, range] of Object.entries(rules.gradingSystem.conversion)) {
      if (numericGrade >= range.min && numericGrade <= range.max) {
        usGrade = grade;
        break;
      }
    }
    
    return {
      ...course,
      originalGrade: course.grade,
      usGrade,
      passed: numericGrade >= rules.gradingSystem.scale.passing
    };
  });

  // Calculate US GPA (4.0 scale)
  const gradePoints: Record<string, number> = {
    'A': 4.0,
    'B': 3.0,
    'C': 2.0,
    'D': 1.0,
    'F': 0.0
  };

  const usGpa = evaluatedCourses.reduce((sum: number, course: any) => {
    return sum + (gradePoints[course.usGrade] || 0);
  }, 0) / evaluatedCourses.length;

  return {
    originalGpa: gpa,
    usGpa: usGpa.toFixed(2),
    courses: evaluatedCourses,
    evaluationNotes: `Grades evaluated according to ${rules.country} grading system. GPA converted to US 4.0 scale.`
  };
}

function evaluateDiploma(parsedData: any, rules: EducationSystem) {
  const { degree } = parsedData;
  const equivalence = rules.degreeEquivalences.find(
    eq => eq.localDegree.toLowerCase() === degree.toLowerCase()
  );

  if (!equivalence) {
    return {
      originalDegree: degree,
      usEquivalent: 'No direct equivalent found',
      evaluationNotes: `Could not find a direct US equivalent for ${degree} from ${rules.country}.`
    };
  }

  return {
    originalDegree: degree,
    usEquivalent: equivalence.usEquivalent,
    credits: equivalence.credits,
    duration: equivalence.duration,
    evaluationNotes: `Degree evaluated according to ${rules.country} education system standards.`
  };
}

export async function updateCountryRules(country: string, updates: any) {
  return prisma.countryRule.upsert({
    where: { country },
    update: updates,
    create: {
      country,
      ...updates
    }
  });
} 