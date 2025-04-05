import { PrismaClient, DocumentType, RequestStatus } from '@prisma/client';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { processDocument } from '../../services/documentProcessor';
import { evaluateCredentials } from '../../services/evaluationRules';
// import { supabase } from '../../lib/supabase';

const prisma = new PrismaClient();

export const uploadDocument = async (file: Express.Multer.File, evaluationRequestId?: string) => {
  const uniqueId = uuidv4();
  const filename = uniqueId + path.extname(file.originalname);

  // const { data, error } = await supabase.storage
  //   .from('documents')
  //   .upload(filename, file.buffer, {
  //     contentType: file.mimetype,
  //   });

  // if (error) throw new Error(`Failed to upload file: ${error.message}`);

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
      path: data?.path || '',
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
    const { data, error } = await supabase.storage
      .from('documents')
      .download(document.path);

    if (error) throw new Error(`Failed to download file: ${error.message}`);

    const processedData = await processDocument(await data.arrayBuffer(), documentType);
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