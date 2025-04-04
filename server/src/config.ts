import dotenv from 'dotenv';
dotenv.config();

export const apiPrefix = '/api';
export const openaiApiKey = process.env.OPENAI_API_KEY;
export const geminiApiKey = process.env.GEMINI_API_KEY;
export const defaultLLMProvider = "openai";