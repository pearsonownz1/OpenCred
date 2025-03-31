import express from 'express';
import { createChatCompletion } from './operations/create';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { messages } = req.body;
    const content = await createChatCompletion(messages);
    res.json({ content });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Failed to process chat request',
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

export default router;