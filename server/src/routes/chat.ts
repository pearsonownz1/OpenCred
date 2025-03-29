import express from 'express';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert academic credential evaluator. Your role is to help users understand:
          1. How their credentials will be evaluated
          2. What documents they need to provide
          3. How different education systems compare
          4. General questions about academic credentials and evaluation
          
          Be professional, accurate, and helpful. If you're not sure about something, say so.
          Focus on providing clear, actionable information.`
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    res.json({
      content: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Failed to process chat request',
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

export default router; 