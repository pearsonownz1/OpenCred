import { prisma } from '../../db';
import type { Revision, RevisionStatus } from '@prisma/client';

export async function getAllRevisions(): Promise<Revision[]> {
    return prisma.revision.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
}

export async function getRevisionById(id: string): Promise<Revision | null> {
    return prisma.revision.findUnique({
        where: { id }
    });
}

interface CreateRevisionInput {
    evaluationResultId: string;
    content: any;
    status: RevisionStatus;
}

export async function createRevision(data: CreateRevisionInput): Promise<Revision> {
    return prisma.revision.create({
        data: {
            evaluationResultId: data.evaluationResultId,
            content: data.content,
            status: data.status
        }
    });
}

export async function updateRevisionStatus(id: string, status: RevisionStatus): Promise<Revision> {
    return prisma.revision.update({
        where: { id },
        data: { 
            status,
            updatedAt: new Date()
        }
    });
}
