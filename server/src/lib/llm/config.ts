import { LLMProvider, LLMConfig } from './types';
import { openaiApiKey, geminiApiKey, defaultLLMProvider } from '../../config';

export const defaultProvider: LLMProvider = defaultLLMProvider;

export const openaiConfig: LLMConfig = {
    apiKey: openaiApiKey as string,
    defaultModel: 'gpt-3.5-turbo',
    defaultMaxTokens: 1000,
    defaultTemperature: 0.7,
    timeout: 30000,
};

export const geminiConfig: LLMConfig = {
    apiKey: geminiApiKey as string,
    defaultModel: 'gemini-2.0-flash', // gemini-2.0-flash
    defaultMaxTokens: 1000,
    defaultTemperature: 0.7,
    timeout: 30000,
};
