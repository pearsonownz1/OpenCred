import { GoogleGenAI } from '@google/genai';
import { Message, LLMResponse, LLMProvider, LLMClient } from './types';
import { geminiConfig } from './config';

class GeminiClient implements LLMClient {
  private client: GoogleGenAI;

  constructor() {
    this.client = new GoogleGenAI({ apiKey: geminiConfig.apiKey });
  }

  async createChatCompletion(
    messages: Message[],
    systemPrompt?: string,
    options?: Record<string, any>
  ): Promise<LLMResponse> {
    const model = options?.model || geminiConfig.defaultModel || 'gemini-2.0-flash';
    const maxTokens = options?.maxTokens || geminiConfig.defaultMaxTokens || 1000;
    const temperature = options?.temperature || geminiConfig.defaultTemperature || 0.7;

    const content = messages.map(msg => msg.content).join('\n');
    const fullPrompt = systemPrompt ? `${systemPrompt}\n\n${content}` : content;

    const response = await this.client.models.generateContent({
      model,
      contents: fullPrompt
    });

    return {
      content: response.text || '',
      modelName: model,
      provider: 'gemini',
    };
  }

  getProvider(): LLMProvider {
    return 'gemini';
  }
}

export const gemini = new GeminiClient();