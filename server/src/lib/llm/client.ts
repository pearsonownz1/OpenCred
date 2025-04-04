import { LLMProvider, LLMClient } from './types';
import { openai } from './openai';
import { gemini } from './gemini';

export function getLLMClient(provider: LLMProvider): LLMClient {
    switch (provider) {
        case 'openai':
            return openai;
        case 'gemini':
            return gemini;
        default:
            throw new Error(`Unsupported LLM provider: ${provider}`);
    }
}