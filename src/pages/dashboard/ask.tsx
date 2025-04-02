import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, User, Loader2 } from 'lucide-react';
import { useConversation, useSendMessage, useClearConversation } from '@/hooks/use-chat';
import { useQueryClient } from '@tanstack/react-query';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const CONVERSATION_ID = 'demo-conversation';

export default function AskPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const queryClient = useQueryClient(); // We need this for optimistic updates
  
  // Get conversation data using the hook
  const { data: messages = [] } = useConversation(CONVERSATION_ID);
  
  // Get mutation function for sending messages
  const { mutate: sendMessage, isPending: isLoading } = useSendMessage();
  
  // Get clear conversation function
  const clearConversation = useClearConversation();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Create user message
    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    // Add user message to the UI immediately (optimistic update)
    const currentMessages = queryClient.getQueryData<Message[]>(['conversation', CONVERSATION_ID]) || [];
    const updatedMessages = [...currentMessages, userMessage];
    queryClient.setQueryData(['conversation', CONVERSATION_ID], updatedMessages);
    
    // Also update localStorage for immediate persistence
    localStorage.setItem(`conversation_${CONVERSATION_ID}`, JSON.stringify(updatedMessages));

    // Clear input
    setInput('');
    
    // Send message to API
    sendMessage({ 
      messages: updatedMessages.map(({ role, content }) => ({ role, content })), 
      conversationId: CONVERSATION_ID 
    });
  };

  const handleClearChat = () => {
    clearConversation(CONVERSATION_ID);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Ask your Expert AI Evaluator</h1>
        </div>
        <Button variant="outline" size="sm" onClick={handleClearChat}>
          Clear Chat
        </Button>
      </div>

      <Card className="flex flex-col h-[calc(100vh-12rem)]">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground p-4">
                <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="mb-2">Ask questions about credential evaluation, educational systems, or specific institutions.</p>
                <p className="text-sm">Examples:</p>
                <ul className="text-sm space-y-1 mt-2">
                  <li>"How does the Indian grading system convert to US GPA?"</li>
                  <li>"What's the US equivalent of a UK Upper Second-Class Honours degree?"</li>
                  <li>"Is University of São Paulo accredited?"</li>
                </ul>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs mt-2 opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-lg p-4 bg-muted flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p className="text-sm">Thinking...</p>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your question..."
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}