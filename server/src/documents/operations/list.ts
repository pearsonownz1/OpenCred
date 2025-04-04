import { PrismaClient, DocumentType } from '@prisma/client';
import path from 'path';
import { processDocument } from '../../services/documentProcessor';

const prisma = new PrismaClient();

export const parseDocument = async (documentId: string, documentType: DocumentType) => {
  const document = await prisma.document.findUnique({ where: { id: documentId } });
  if (!document) throw new Error('Document not found');

  const absoluteFilePath = path.join(process.cwd(), document.path.replace(/^\/uploads\//, 'uploads/'));
  const processedData = await processDocument(absoluteFilePath, documentType);

  const updatedDocument = await prisma.document.update({
    where: { id: documentId },
    data: { parsedData: processedData },
  });

  return processedData;
};

export const getDocumentsByEvaluationRequest = async (evaluationRequestId: string) => {
  return prisma.document.findMany({
    where: { evaluationRequestId },
    include: { evaluationRequest: true },
  });
};

export const getAllDocuments = async () => {
  return prisma.document.findMany({
    select: {
      id: true,
      filename: true,
      originalName: true,
      path: true,
      // type: true, // Exclude the problematic field temporarily
      mimetype: true,
      size: true,
      parsedData: true,
      evaluationRequestId: true,
      createdAt: true,
      updatedAt: true
    }
  });
};