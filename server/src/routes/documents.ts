import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { processDocument } from '../services/documentProcessor';
import { evaluateCredentials } from '../services/evaluationRules';
import fs from 'fs/promises';

dotenv.config();
const router = express.Router();
const prisma = new PrismaClient();

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
try {
  fs.access(uploadsDir).catch(() => {
    fs.mkdir(uploadsDir, { recursive: true });
    console.log('Created uploads directory');
  });
} catch (error) {
  console.error('Error checking/creating uploads directory:', error);
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      await fs.access(uploadsDir);
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueId = uuidv4();
    cb(null, uniqueId + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    console.log('File type:', file.mimetype);
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/json',
      'text/plain',
    ];

    if (process.env.NODE_ENV === 'development' || allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type: ${file.mimetype}. Allowed types: ${allowedTypes.join(', ')}`));
    }
  },
});

// Error handling middleware
const handleErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Upload error:', err);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  if (err.message.includes('Invalid file type')) {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: err.message || 'Internal server error' });
};

// Upload single file
router.post('/upload', (req, res, next) => {
  console.log('Upload request received');
  upload.single('file')(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return handleErrors(err, req, res, next);
    }

    try {
      if (!req.file) {
        console.error('No file in request');
        return res.status(400).json({ error: 'No file uploaded' });
      }

      console.log('File received:', req.file);

      const file = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        path: `/uploads/${req.file.filename}`,
      };

      // Create or get student
      let student;
      try {
        if (req.body.studentId) {
          student = await prisma.student.findUnique({
            where: { id: req.body.studentId }
          });
          console.log('Found existing student:', student);
        }

        if (!student) {
          student = await prisma.student.create({
            data: {
              name: 'Test Student',
              email: `test${Date.now()}@example.com`,
            }
          });
          console.log('Created new student:', student);
        }
      } catch (error) {
        console.error('Error handling student:', error);
        return res.status(500).json({ error: 'Failed to process student data' });
      }

      // Create or get evaluation
      let evaluation;
      try {
        if (req.body.evaluationId) {
          evaluation = await prisma.evaluation.findUnique({
            where: { id: req.body.evaluationId }
          });
          console.log('Found existing evaluation:', evaluation);
        }

        if (!evaluation) {
          evaluation = await prisma.evaluation.create({
            data: {
              studentId: student.id,
              status: 'pending',
              evaluationType: 'Document-by-Document',
              institution: 'Unknown',
              country: 'Unknown',
              program: 'Unknown',
            }
          });
          console.log('Created new evaluation:', evaluation);
        }
      } catch (error) {
        console.error('Error handling evaluation:', error);
        return res.status(500).json({ error: 'Failed to process evaluation data' });
      }

      // Store file information in database
      try {
        const document = await prisma.document.create({
          data: {
            ...file,
            type: req.body.type || 'unknown',
            evaluationId: evaluation.id,
          },
        });
        console.log('Created document record:', document);

        return res.json({
          message: 'File uploaded successfully',
          document,
          evaluation: {
            id: evaluation.id,
            status: evaluation.status,
          },
        });
      } catch (error) {
        console.error('Error creating document record:', error);
        return res.status(500).json({ error: 'Failed to store document information' });
      }
    } catch (error) {
      console.error('Unexpected error during upload:', error);
      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  });
});

// Parse document
router.post('/parse-document', async (req, res) => {
  try {
    const { documentType, filePath } = req.body;
    
    if (!documentType || !filePath) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: {
          documentType: !documentType ? 'missing' : 'provided',
          filePath: !filePath ? 'missing' : 'provided'
        }
      });
    }

    console.log('Parsing document:', { documentType, filePath });
    
    const absoluteFilePath = path.join(process.cwd(), filePath.replace(/^\/uploads\//, 'uploads/'));
    
    // Check if file exists
    try {
      await fs.access(absoluteFilePath);
    } catch (error) {
      console.error('File not found:', absoluteFilePath);
      return res.status(404).json({ 
        error: 'File not found',
        details: { filePath, absoluteFilePath }
      });
    }
    
    // Process document with enhanced features
    const processedData = await processDocument(absoluteFilePath, documentType);

    // Find document by path first
    const existingDocument = await prisma.document.findFirst({
      where: { path: filePath }
    });

    if (!existingDocument) {
      console.error('Document not found in database:', filePath);
      return res.status(404).json({ 
        error: 'Document not found in database',
        details: { filePath }
      });
    }

    // Update document in database with parsed data using ID
    const document = await prisma.document.update({
      where: { id: existingDocument.id },
      data: { parsedData: processedData },
    });

    console.log('Document parsed successfully');
    res.json(processedData);
  } catch (error: any) {
    console.error('Error parsing document:', error);
    res.status(500).json({ 
      error: 'Error parsing document',
      details: error.message || String(error)
    });
  }
});

// Evaluate document
router.post('/evaluate-document', async (req, res) => {
  try {
    const { documentId, documentType, country, institution, evaluationType } = req.body;
    console.log('Evaluation request:', { documentId, documentType, country, institution, evaluationType });

    // Validate required fields
    if (!documentId || !documentType || !country || !institution) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: {
          documentId: !documentId ? 'Document ID is required' : undefined,
          documentType: !documentType ? 'Document type is required' : undefined,
          country: !country ? 'Country is required' : undefined,
          institution: !institution ? 'Institution is required' : undefined
        }
      });
    }

    // Find the document
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: { evaluation: true }
    });

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Update evaluation with provided data
    await prisma.evaluation.update({
      where: { id: document.evaluationId },
      data: {
        country,
        institution,
        evaluationType: evaluationType || 'Document-by-Document',
        status: 'processing'
      }
    });

    let parsedData = document.parsedData as any;

    // Process document if not already processed
    if (!parsedData || !parsedData.extractedData) {
      try {
        console.log('Processing document:', document.path);
        const processedData = await processDocument(document.path, documentType);
        console.log('Document processed successfully:', processedData);

        // Update document with parsed data
        await prisma.document.update({
          where: { id: documentId },
          data: { parsedData: processedData }
        });

        parsedData = processedData;
      } catch (error) {
        console.error('Error processing document:', error);
        return res.status(500).json({
          error: 'Error processing document',
          details: error instanceof Error ? error.message : String(error)
        });
      }
    }

    // Validate parsed data structure
    if (!parsedData || !parsedData.extractedData) {
      return res.status(500).json({
        error: 'Invalid document data',
        details: 'Document data is missing or invalid'
      });
    }

    // Evaluate the document
    try {
      console.log('Evaluating document with data:', parsedData.extractedData);
      const evaluationResult = await evaluateCredentials(documentType, parsedData.extractedData, country);
      console.log('Evaluation completed successfully:', evaluationResult);

      // Update evaluation with results
      await prisma.evaluation.update({
        where: { id: document.evaluationId },
        data: {
          result: evaluationResult,
          status: 'completed'
        }
      });

      res.json(evaluationResult);
    } catch (error) {
      console.error('Error evaluating document:', error);
      // Update evaluation status to failed
      await prisma.evaluation.update({
        where: { id: document.evaluationId },
        data: {
          status: 'failed',
          error: error instanceof Error ? error.message : String(error)
        }
      });
      
      res.status(500).json({
        error: 'Error evaluating document',
        details: error instanceof Error ? error.message : String(error)
      });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({
      error: 'An unexpected error occurred',
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

// Get all documents for an evaluation
router.get('/evaluation/:evaluationId', async (req, res) => {
  try {
    const documents = await prisma.document.findMany({
      where: { evaluationId: req.params.evaluationId },
      include: { evaluation: true },
    });
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Get all documents
router.get('/', async (req, res) => {
  try {
    const documents = await prisma.document.findMany({
      orderBy: { createdAt: 'desc' },
      include: { evaluation: true },
    });
    res.json({ documents });
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Delete document
router.delete('/:id', async (req, res) => {
  try {
    const document = await prisma.document.delete({
      where: { id: req.params.id },
    });

    // Delete file from uploads directory
    const filePath = path.join(process.cwd(), 'uploads', path.basename(document.path));
    await fs.unlink(filePath);

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Error deleting document' });
  }
});

export default router; 