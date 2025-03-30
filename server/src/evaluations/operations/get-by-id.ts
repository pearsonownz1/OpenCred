import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEvaluationRequestById = async (id: string) => {
    return await prisma.evaluationRequest.findUnique({
        where: { id },
        include: { student: true, documents: true, country: true },
    });
};

export const getEvaluationResultById = async (id: string) => {
    return await prisma.evaluationResult.findUnique({
        where: { id },
        include: { request: true },
    });
};
