import openai from '../../lib/openai';


export async function createChatCompletion(messages: any[]) {
  if (!messages || !Array.isArray(messages)) {
    throw new Error('Invalid messages format');
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are an expert academic credential evaluator. Your role is to help users understand:
        1. How their credentials will be evaluated
        2. What documents they need to provide
        3. How different education systems compare
        4. General questions about academic credentials and evaluation
        
        Be professional, accurate, and helpful. If you're not sure about something, say so.
        Focus on providing clear, actionable information.`
      },
      ...messages
    ],
    temperature: 0.7,
    max_tokens: 1000,
  });

  return completion.choices[0].message.content;
}
