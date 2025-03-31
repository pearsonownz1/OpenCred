import dotenv from 'dotenv';
dotenv.config();

export const apiPrefix = '/api';
export const openaiApiKey = process.env.OPENAI_API_KEY;