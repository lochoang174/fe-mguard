import { useState, useCallback } from "react";
import { welcomeMessage } from "../lib/constants";
import { Message } from "@/types/message";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: welcomeMessage,
      isUser: false,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = useCallback(() => {
    if (!inputMessage.trim()) return;

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
    };

    // Add AI loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "",
      isUser: false,
      isLoading: true,
    };

    setMessages((prev) => [...prev, newUserMessage, loadingMessage]);
    setInputMessage("");

    // Simulate AI response after 2 seconds
    setTimeout(() => {
      setMessages((prev) => {
        const newMessages = [...prev];
        // Replace loading message with actual response
        newMessages[newMessages.length - 1] = {
          id: Date.now().toString(),
          content:
            "Thank you for your message. I'm processing your request and will respond shortly.",
          isUser: false,
        };
        return newMessages;
      });
    }, 2000);
  }, [inputMessage]);

  const handleInputChange = useCallback((value: string) => {
    setInputMessage(value);
  }, []);

  return {
    messages,
    inputMessage,
    handleSendMessage,
    handleInputChange,
  };
};
