"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Bot, Send, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useConversation, useSendMessage, useClearConversation } from '@/hooks/use-chat';
import { useQueryClient } from '@tanstack/react-query';

const CONVERSATION_ID = 'demo-conversation';

const suggestedPrompts = [
  "How does the Indian grading system convert to US GPA?",
  "What's the US equivalent of a UK Upper Second-Class Honours degree?",
  "Is University of São Paulo accredited?",
  "Compare German and US education systems",
];

const modelOptions = [
  { value: "gemini", label: "Gemini", description: "Powered by Google" },
  { value: "openai", label: "OpenEval AI", description: "Powered by OpenAI" },
];

export default function AskPage() {
  const [input, setInput] = useState('');
  const [selectedProvider, setSelectedProvider] = useState("gemini");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  
  const { data: messages = [] } = useConversation(CONVERSATION_ID);
  const { mutate: sendMessage, isPending: isLoading } = useSendMessage();
  const clearConversation = useClearConversation();

  const selectedModel = modelOptions.find((model) => model.value === selectedProvider);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user' as const,
      content: input.trim(),
      timestamp: new Date(),
    };

    const currentMessages = queryClient.getQueryData<typeof messages>(['conversation', CONVERSATION_ID]) || [];
    const updatedMessages = [...currentMessages, userMessage];
    queryClient.setQueryData(['conversation', CONVERSATION_ID], updatedMessages);
    
    setInput('');
    
    sendMessage({ 
      messages: updatedMessages.map(({ role, content }) => ({ role, content })), 
      conversationId: CONVERSATION_ID,
      provider: selectedProvider
    });
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Ask your Expert AI Evaluator</h1>
      </div>
      <Card className="flex flex-col h-[calc(100vh-220px)]">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
              <AvatarFallback className="bg-primary/10 text-primary">AI</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">Credential Evaluation Assistant</CardTitle>
              <CardDescription>
                Powered by{" "}
                {selectedProvider === "gemini"
                  ? "Gemini"
                  : "OpenEval AI"}
              </CardDescription>
            </div>
            <div className="ml-auto">
              <Button variant="outline" size="sm" onClick={() => clearConversation(CONVERSATION_ID)}>
                Clear Chat
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <div className="max-w-md space-y-2">
                <h3 className="text-xl font-semibold">How can I help you today?</h3>
                <p>Ask questions about credential evaluation, educational systems, or specific institutions.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6">
                  {suggestedPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start text-left h-auto py-3 font-normal"
                      onClick={() => handlePromptClick(prompt)}
                    >
                      <span className="line-clamp-2">{prompt}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.timestamp.getTime()} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="flex items-start gap-3 max-w-[90%] sm:max-w-[80%]">
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                        <AvatarFallback className="bg-primary/10 text-primary">AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg px-3 sm:px-4 py-2 sm:py-3 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="whitespace-pre-line break-words">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-primary/10 text-primary">AI</AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-4 py-3 bg-muted">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce delay-75"></div>
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce delay-150"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          )}
        </CardContent>
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Reply to ${selectedModel?.label || "Assistant"}...`}
              className="min-h-[56px] max-h-[200px] resize-none pr-24"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 gap-1">
                    {selectedModel?.label || "Select Model"}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {modelOptions.map((model) => (
                    <DropdownMenuItem
                      key={model.value}
                      onClick={() => setSelectedProvider(model.value)}
                      className="flex flex-col items-start py-3 px-4"
                    >
                      <div className="flex items-center w-full">
                        <span className="font-medium">{model.label}</span>
                        {selectedProvider === model.value && <span className="ml-auto text-primary">✓</span>}
                      </div>
                      <span className="text-xs text-muted-foreground">{model.description}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button type="submit" size="icon" className="h-9 w-9 rounded-full" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}