import { PrismaClient, DocumentType, RequestStatus } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { processDocument } from '../../services/documentProcessor';
import { evaluateCredentials } from '../../services/evaluationRules';

const prisma = new PrismaClient();

export const uploadDocument = async (file: Express.Multer.File, evaluationRequestId?: string) => {
  const uploadsDir = path.join(process.cwd(), 'uploads');
  await fs.mkdir(uploadsDir, { recursive: true });

  const uniqueId = uuidv4();
  const filename = uniqueId + path.extname(file.originalname);
  const filePath = path.join(uploadsDir, filename);

  await fs.writeFile(filePath, file.buffer);

  let evaluationRequest = evaluationRequestId 
    ? await prisma.evaluationRequest.findUnique({ where: { id: evaluationRequestId } }) 
    : null;

  if (!evaluationRequest) {
    evaluationRequest = await prisma.evaluationRequest.create({
      data: {
        status: RequestStatus.SUBMITTED,
        evaluationType: 'DOCUMENT_BY_DOCUMENT',
        institution: 'Unknown',
        countryCode: 'Unknown',
        program: 'Unknown',
        studentId: (await prisma.student.create({ data: { name: 'Unknown', email: `${uniqueId}@example.com` } })).id,
      }
    });
  }

  const document = await prisma.document.create({
    data: {
      filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      path: `/uploads/${filename}`,
      type: DocumentType.OTHER,
      evaluationRequestId: evaluationRequest.id,
    },
  });

  return { document, evaluationRequest };
};

export const evaluateDocument = async (documentId: string, documentType: DocumentType, countryCode: string, institution: string, evaluationType?: string) => {
  const document = await prisma.document.findUnique({
    where: { id: documentId },
    include: { evaluationRequest: true }
  });
  if (!document) throw new Error('Document not found');

  await prisma.evaluationRequest.update({
    where: { id: document.evaluationRequestId! },
    data: {
      countryCode,
      institution,
      evaluationType: evaluationType || 'Document-by-Document',
      status: RequestStatus.AI_PROCESSING
    }
  });

  let parsedData = document.parsedData as any;
  if (!parsedData || !parsedData.extractedData) {
    const processedData = await processDocument(document.path, documentType);
    await prisma.document.update({
      where: { id: documentId },
      data: { parsedData: processedData }
    });
    parsedData = processedData;
  }

  const evaluationResult = await evaluateCredentials(documentType, parsedData.extractedData, countryCode);

  await prisma.evaluationResult.create({
    data: {
      requestId: document.evaluationRequestId!,
      aiAnalysis: evaluationResult,
    }
  });

  await prisma.evaluationRequest.update({
    where: { id: document.evaluationRequestId! },
    data: {
      status: RequestStatus.HUMAN_REVIEW
    }
  });

  return evaluationResult;
};