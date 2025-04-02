import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllEvaluationRequests = async () => {
  return await prisma.evaluationRequest.findMany({
    include: { student: true, documents: true, country: true },
  });
};

export const getAllEvaluationResults = async () => {
  return await prisma.evaluationResult.findMany({
    include: { request: true },
  });
};

export const getAllRevisions = async () => {
  return await prisma.revision.findMany({
    include: { evaluationRequest: true },
  });
};