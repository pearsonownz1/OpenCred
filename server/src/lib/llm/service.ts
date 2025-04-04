import { getLLMClient } from './client';
import { Message, LLMResponse, LLMProvider } from './types';
import { defaultProvider } from './config';

export interface EvaluationResult {
  studentId: string;
  sourceCountry: string;
  targetCountry: string;
  program: string;
  institution: string;
  evaluationDetails: string;
}

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

  async evaluateCredentials(
    studentId: string, 
    documents: string[], 
    sourceCountry: string, 
    targetCountry: string = 'USA',
    program: string,
    institution: string,
    provider?: string
  ): Promise<EvaluationResult> {
    const messages: Message[] = [
      {
        role: 'user',
        content: `Please evaluate academic credentials for a student applying to ${program} at ${institution} in ${targetCountry}.
        The student's credentials are from ${sourceCountry}.
        Based on the transcript information and grading system, provide:
        1. Overall GPA conversion
        2. Degree equivalence
        3. Course-by-course evaluation if needed
        4. Any recommendations`
      }
    ];
    
    if (documents && documents.length) {
      // Logic to extract and format document content would go here
    }
    
    const evaluationResponse = await this.createChatCompletion(messages, undefined, { provider });
    const evaluationContent = evaluationResponse.content;
    
    return {
      studentId,
      sourceCountry,
      targetCountry,
      program,
      institution,
      evaluationDetails: evaluationContent,
    };
  }
}

const llmService = new LLMService();
export default llmService;