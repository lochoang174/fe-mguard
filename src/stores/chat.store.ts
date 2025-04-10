import { create } from "zustand";
import { Message } from "@/types/chat";
import { v4 as uuidv4 } from "uuid";

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  inputMessage: string;
  setInputMessage: (inputMessage: string) => void;
  addMessage: (content: string, isUser: boolean) => string;
  setError: (error: string | null) => void;
  clearMessages: () => void;
  retryLastMessage: () => string | undefined;
  setResponseMessage: (messageId: string, responseText: string ) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [{
    id: "1",
    content: "Xin chào, tôi là AI, tôi có thể giúp bạn gì?",
    isUser: false,
    isLoading: false,
    timestamp: new Date(),
  }],
  isLoading: false,
  error: null,
  inputMessage: "",

  setInputMessage: (inputMessage: string) => set({ inputMessage }),
  addMessage: (content: string, isUser: boolean) => {
    const id = uuidv4();
    const isLoading = !isUser;
    console.log("isUser: "+isUser)
    console.log("isLoading: "+isLoading)
    const newMessage: Message = {
      id,
      content,
      isUser,
      isLoading: isLoading,
      timestamp: new Date(),
    };
    console.log(newMessage)

    set((state) => ({
      messages: [...state.messages, newMessage],
    }));

    return id;
  },
  setResponseMessage: (messageId: string, responseText: string ) => {
    set((state) => ({
      messages: state.messages.map((msg) => {
        if (msg.id === messageId) {
          return { ...msg, isLoading: false, content: responseText };
        }
        console.log("id: "+ msg.id)
        console.log(messageId)
        return msg;
      }),
    }));
  },
  

  setError: (error: string | null) => set({ error }),

  clearMessages: () => set({ messages: [], error: null }),

  retryLastMessage: () => {
    const lastUserMessage = [...get().messages]
      .reverse()
      .find((msg) => msg.isUser);

    if (lastUserMessage) {
      set((state) => ({
        messages: state.messages.slice(
          0,
          state.messages.findIndex((msg) => msg.id === lastUserMessage.id) + 1
        ),
      }));
      return lastUserMessage.content;
    }
  },
}));

// Custom hook for chat operations
