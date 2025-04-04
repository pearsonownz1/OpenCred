import { PrismaClient, RevisionStatus } from '@prisma/client';
import { Message } from '../../lib/llm/types';
import llmService from '../../lib/llm/service';

const EVALUATION_SYSTEM_PROMPT = `You are an expert academic credential evaluator with deep knowledge of international education systems, grading scales, and degree equivalencies.

Your task is to evaluate academic credentials from various countries and provide detailed equivalence to the US education system. For each evaluation:

1. Analyze the student's academic background
2. Convert grades to US GPA equivalent using the appropriate scale
3. Determine degree equivalence
4. Provide course-by-course analysis if needed
5. Make clear recommendations

Be precise, thorough, and follow established credential evaluation standards. 
Include references to specific conversion methodologies when applicable.`;

export interface EvaluationRequest {
  studentId: string;
  sourceCountry: string;
  targetCountry?: string;
  program: string;
  institution: string;
  transcriptData?: string; // Simplified for now, could be more structured
  gradingSystem?: string;
  evaluationType: 'Document-by-Document' | 'Course-by-Course';
}

export interface EvaluationResult {
  studentId: string;
  sourceCountry: string;
  targetCountry: string;
  program: string;
  institution: string;
  evaluationDetails: string;
  gpaEquivalent?: string;
  degreeEquivalent?: string;
  recommendationSummary?: string;
}

export async function evaluateCredentials(
  evaluationData: EvaluationRequest,
  provider?: string
): Promise<EvaluationResult> {
  const { 
    studentId, 
    sourceCountry, 
    targetCountry = 'USA', 
    program, 
    institution, 
    transcriptData,
    gradingSystem,
    evaluationType
  } = evaluationData;
  
  // Construct the prompt with available information
  let promptContent = `Please evaluate academic credentials for a student applying to ${program} at ${institution} in ${targetCountry}.
  
Evaluation type: ${evaluationType}
The student's credentials are from: ${sourceCountry}

Please provide:
1. Overall GPA conversion
2. Degree equivalence in ${targetCountry}
3. Detailed evaluation rationale
4. Recommendations for the student`;

  // Add transcript data if available
  if (transcriptData) {
    promptContent += `\n\nTranscript information:\n${transcriptData}`;
  }
  
  // Add grading system information if available
  if (gradingSystem) {
    promptContent += `\n\nGrading system:\n${gradingSystem}`;
  }
  
  const messages: Message[] = [
    {
      role: 'user',
      content: promptContent
    }
  ];
  
  // Get evaluation from LLM
  let evaluationContent: string;
  if (provider) {
    const response = await llmService.createChatCompletionWithProvider(
      provider as any,
      messages,
      EVALUATION_SYSTEM_PROMPT
    );
    evaluationContent = response.content;
  } else {
    const response = await llmService.createChatCompletion(
      messages,
      EVALUATION_SYSTEM_PROMPT
    );
    evaluationContent = response.content;
  }
  
  // For now, return the full response
  // In a production environment, you might want to parse this into structured data
  return {
    studentId,
    sourceCountry,
    targetCountry,
    program,
    institution,
    evaluationDetails: evaluationContent
  };
}

const prisma = new PrismaClient();

export const createEvaluationRequest = async (data: {
  studentId: string;
  evaluationType: string;
  institution: string;
  countryCode: string;
  program: string;
}) => {
  return await prisma.evaluationRequest.create({
    data: {
      ...data,
      status: 'SUBMITTED',
    },
  });
};

export const createOrUpdateEvaluationResult = async (
  requestId: string,
  data: {
    aiAnalysis: any;
    humanReview: any;
    finalResult: any;
    reviewedBy: string;
    reviewNotes: string;
  }
) => {
  return await prisma.evaluationResult.upsert({
    where: { requestId },
    update: data,
    create: {
      requestId,
      ...data,
    },
  });
};

export const createRevision = async (data: {
  requestId: string;
  status: RevisionStatus;
  comments: string;
}) => {
  return await prisma.revision.create({
    data: {
      ...data,
      requestedBy: 'SYSTEM',
      description: 'Initial revision',
      evaluationRequest: {
        connect: { id: data.requestId },
      },
    },
  });
};

export const createOrUpdateEvaluationRequest = async (id: string, data: {
  studentId: string;
  evaluationType: string;
  institution: string;
  countryCode: string;
  program: string;
}) => {
  return await prisma.evaluationRequest.upsert({
    where: { id },
    update: data,
    create: {
      id,
      ...data,
      status: 'SUBMITTED',
    },
  });
};