import { PrismaClient, RevisionStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const updateRevisionStatus = async (id: string, status: RevisionStatus) => {
    return await prisma.revision.update({
        where: { id },
        data: { status }
    });
}