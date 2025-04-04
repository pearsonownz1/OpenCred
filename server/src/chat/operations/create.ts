import { Message, LLMResponse } from '../../lib/llm/types';
import llmService from '../../lib/llm/service';

const SYSTEM_PROMPT = `You are an expert academic credential evaluator. Your role is to help users understand:
1. How their credentials will be evaluated
2. What documents they need to provide
3. How different education systems compare
4. General questions about academic credentials and evaluation

Be professional, accurate, and helpful. If you're not sure about something, say so.
Focus on providing clear, actionable information.`;

export async function createChatCompletion(messages: Message[], provider?: string): Promise<string> {
  if (!messages || !Array.isArray(messages)) {
    throw new Error('Invalid messages format');
  }

  // If provider is specified, use it for this request
  if (provider) {
    const response = await llmService.createChatCompletionWithProvider(
      provider as any,
      messages,
      SYSTEM_PROMPT
    );
    return response.content;
  }

  // Otherwise use the default provider
  const response = await llmService.createChatCompletion(
    messages,
    SYSTEM_PROMPT
  );
  return response.content;
}
