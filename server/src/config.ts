import dotenv from 'dotenv';
dotenv.config();

export const apiPrefix = '/api';
export const openaiApiKey = process.env.OPENAI_API_KEY;
export const geminiApiKey = process.env.GEMINI_API_KEY;
export const defaultLLMProvider = "openai";
export const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
export const supabaseUrl = process.env.SUPABASE_URL;
