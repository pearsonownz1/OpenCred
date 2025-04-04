export interface LLMClient {
    createChatCompletion(
        messages: Message[],
        systemPrompt?: string,
        options?: Record<string, any>
    ): Promise<LLMResponse>;

    getProvider(): LLMProvider;
}

export type LLMProvider = 'openai' | 'gemini';


export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
    role: MessageRole;
    content: string;
}

export interface LLMResponse {
    content: string;
    usage?: {
        promptTokens?: number;
        completionTokens?: number;
        totalTokens?: number;
    };
    modelName?: string;
    provider: LLMProvider;
}

export interface LLMConfig {
    apiKey: string;
    defaultModel: string;
    defaultMaxTokens?: number;
    defaultTemperature?: number;
    timeout?: number;
}