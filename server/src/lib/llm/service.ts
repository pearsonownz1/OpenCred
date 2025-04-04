import { getLLMClient } from './client';
import { Message, LLMResponse, LLMProvider } from './types';
import { defaultProvider } from './config';

export class LLMService {
  private activeProvider: LLMProvider;

  constructor(provider: LLMProvider = defaultProvider) {
    this.activeProvider = provider;
  }

  setProvider(provider: LLMProvider): void {
    this.activeProvider = provider;
  }

  getProvider(): LLMProvider {
    return this.activeProvider;
  }

  async createChatCompletion(
    messages: Message[],
    systemPrompt?: string,
    options?: Record<string, any>
  ): Promise<LLMResponse> {
    const client = getLLMClient(this.activeProvider);
    return client.createChatCompletion(messages, systemPrompt, options);
  }

  async createChatCompletionWithProvider(
    provider: LLMProvider,
    messages: Message[],
    systemPrompt?: string,
    options?: Record<string, any>
  ): Promise<LLMResponse> {
    const client = getLLMClient(provider);
    return client?.createChatCompletion(messages, systemPrompt, options);
  }
}

const llmService = new LLMService();
export default llmService;