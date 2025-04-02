import { PrismaClient, RevisionStatus } from '@prisma/client';

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