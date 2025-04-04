import express from 'express';
import { parseDocument, getDocumentsByEvaluationRequest, getAllDocuments } from './operations/list';
import { uploadDocument, evaluateDocument } from './operations/create';
import { deleteDocument } from './operations/delete';
import path from 'path';

import multer from 'multer';

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    // Create unique filename with original extension
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// Create the multer instance
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});


const router = express.Router();

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const result = await uploadDocument(req.file, req.body);
    res.json(result);
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

router.post('/parse-document', async (req, res) => {
  try {
    const { documentType, filePath } = req.body;
    const parsedData = await parseDocument(documentType, filePath);
    res.json(parsedData);
  } catch (error) {
    console.error('Error parsing document:', error);
    res.status(500).json({ error: 'Failed to parse document' });
  }
});

router.post('/evaluate-document', async (req, res) => {
  try {
    const { documentId, documentType, country, institution, evaluationType } = req.body;
    const evaluationResult = await evaluateDocument(documentId, documentType, country, institution, evaluationType);
    res.json(evaluationResult);
  } catch (error) {
    console.error('Error evaluating document:', error);
    res.status(500).json({ error: 'Failed to evaluate document' });
  }
});

router.get('/evaluation/:evaluationId', async (req, res) => {
  try {
    const documents = await getDocumentsByEvaluationRequest(req.params.evaluationId);
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

router.get('/', async (req, res) => {
  try {
    const documents = await getAllDocuments();
    res.json({ documents });
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await deleteDocument(req.params.id);
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

export default router;