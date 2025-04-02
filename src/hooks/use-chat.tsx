// hooks/use-chat.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const CHAT_API_URL = 'http://localhost:8000/api/chat';

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date;
}

interface ChatResponse {
  content: string;
}

// Hook to fetch conversation history
export const useConversation = (conversationId: string) => {
  return useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: () => {
      const saved = localStorage.getItem(`conversation_${conversationId}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
        } catch (e) {
          console.error('Error parsing saved messages:', e);
          return [];
        }
      }
      return [];
    }
  });
};

// Hook to send a message and get a response
export const useSendMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ messages, conversationId }: { messages: Message[], conversationId: string }) => {
      // Important: Format messages for the API 
      // (no timestamps since the API doesn't expect them)
      const apiMessages = messages.map(({ role, content }) => ({ role, content }));
      
      const { data } = await axios.post<ChatResponse>(CHAT_API_URL, { messages: apiMessages });
      return { content: data.content, conversationId };
    },
    onSuccess: (data, variables) => {
      const { content, conversationId } = data;
      
      // Get current messages
      const currentMessages = queryClient.getQueryData<Message[]>(['conversation', conversationId]) || [];
      
      // Add the new assistant message
      const newMessage: Message = {
        role: 'assistant',
        content: content,
        timestamp: new Date()
      };
      
      const updatedMessages = [...currentMessages, newMessage];
      
      // Update the cache
      queryClient.setQueryData(['conversation', conversationId], updatedMessages);
      
      // Save to localStorage for persistence
      localStorage.setItem(`conversation_${conversationId}`, JSON.stringify(updatedMessages));
    }
  });
};

// Hook to clear conversation history
export const useClearConversation = () => {
  const queryClient = useQueryClient();
  
  return (conversationId: string) => {
    // Clear from cache
    queryClient.setQueryData(['conversation', conversationId], []);
    
    // Clear from localStorage
    localStorage.removeItem(`conversation_${conversationId}`);
  };
};