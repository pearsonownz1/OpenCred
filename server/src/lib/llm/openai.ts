import OpenAI from "openai";
import { openaiApiKey } from "../../config";
import { Message, LLMResponse, LLMProvider, LLMClient } from './types';

class OpenAIClient implements LLMClient {
    private client: OpenAI;

    constructor() {
        this.client = new OpenAI({ apiKey: openaiApiKey });
    }

    async createChatCompletion(
        messages: Message[],
        systemPrompt?: string,
        options?: Record<string, any>
    ): Promise<LLMResponse> {
        const response = await this.client.chat.completions.create({
            model: options?.model || 'gpt-3.5-turbo',
            messages: [
                ...(systemPrompt ? [{ role: 'system' as const, content: systemPrompt }] : []),
                ...messages.map(m => ({ role: m.role as 'system' | 'user' | 'assistant', content: m.content }))
            ],
            ...options
        });

        return {
            content: response.choices[0].message.content || '',
            usage: {
                promptTokens: response.usage?.prompt_tokens,
                completionTokens: response.usage?.completion_tokens,
                totalTokens: response.usage?.total_tokens
            },
            provider: 'openai'
        };
    }

    getProvider(): LLMProvider {
        return 'openai';
    }
}

export const openai = new OpenAIClient();
