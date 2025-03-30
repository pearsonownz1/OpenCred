import { PrismaClient, RequestStatus, DocumentType } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Create students
  const students = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.student.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
        },
      })
    )
  );

  // Create country rules
  const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany'];
  for (const country of countries) {
    await prisma.countryRules.upsert({
      where: { country },
      update: {},
      create: {
        country,
        rules: JSON.stringify({
          educationSystem: faker.lorem.paragraph(),
          gradingScale: faker.lorem.sentences(),
          degreeEquivalence: faker.lorem.sentences(),
        }),
      },
    });
  }

  // Create evaluation requests and documents for each student
  for (const student of students) {
    const evaluationRequest = await prisma.evaluationRequest.create({
      data: {
        studentId: student.id,
        status: faker.helpers.arrayElement(Object.values(RequestStatus)),
        evaluationType: faker.helpers.arrayElement(['Document-by-Document', 'Course-by-Course']),
        institution: faker.company.name(),
        countryCode: faker.helpers.arrayElement(countries),
        program: faker.helpers.arrayElement(['Bachelor', 'Master', 'PhD']),
      },
    });

    await prisma.document.create({
      data: {
        filename: faker.system.fileName(),
        originalName: faker.system.fileName(),
        path: faker.system.filePath(),
        type: faker.helpers.arrayElement(Object.values(DocumentType)),
        mimetype: 'application/pdf',
        size: faker.number.int({ min: 1000, max: 5000000 }),
        parsedData: { content: faker.lorem.paragraphs() },
        evaluationRequestId: evaluationRequest.id,
      },
    });

    if (evaluationRequest.status === RequestStatus.COMPLETED) {
      await prisma.evaluationResult.create({
        data: {
          requestId: evaluationRequest.id,
          aiAnalysis: { analysis: faker.lorem.paragraph() },
          humanReview: faker.datatype.boolean() ? { review: faker.lorem.paragraph() } : undefined,
          finalResult: { result: faker.lorem.paragraph() },
          reviewedBy: faker.person.fullName(),
          reviewedAt: faker.date.recent(),
          reviewNotes: faker.lorem.sentences(),
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
