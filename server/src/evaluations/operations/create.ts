import { PrismaClient } from '@prisma/client';

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