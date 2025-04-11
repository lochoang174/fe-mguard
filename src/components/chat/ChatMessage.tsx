"use client";

import React, { memo } from "react";
import AIWriter from "react-aiwriter";
import { Bot, Copy, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Message } from "@/types/message";
import MDContent from "../markdown";

interface ChatMessageProps {
  message: Message;
  onRetry?: () => void;
}

const ChatMessage = ({ message, onRetry }: ChatMessageProps) => {
  const { user } = useAuth();

  const handleCopy = async () => {};

  console.log(message);
  if (!message.isUser && message.isLoading) {
    return (
      <div className="flex gap-3 ">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <Bot className="w-8 h-8 text-pink-500" />
        </div>
        <div className="flex-1 max-w-[40%] bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" />
            </div>
            <p className="text-gray-600">Đang tạo câu trả lời...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-end gap-3 mb-5 text-[16px] font-extrabold ${
        message.isUser ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`w-10 h-10 p-1 rounded-full flex items-center justify-center flex-shrink-0 self-start bg-[#d0d7df]/60`}
      >
        {message.isUser ? (
          <div className="bg-white rounded-full">
            <Image
              src={user?.image || ""}
              alt="User"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
        ) : (
          <Bot className="w-8 h-8 text-pink-500" />
        )}
      </div>
      <div className="flex flex-col gap-2 max-w-[60%]">
        <div
          className={cn(
            "rounded-2xl py-2 px-4",
            message.isUser
              ? "bg-[#f60384] text-white"
              : "bg-white/80 shadow-sm"
          )}
        >
          {message.isUser ? (
            <p>{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none font-[500]">
              <AIWriter>
                <MDContent>{message.content}</MDContent>
              </AIWriter>
            </div>
          )}
        </div>

        {!message.isUser && !message.isLoading && (
          <div className="flex items-center gap-1 self-end">
            <Button
              variant="text"
              size="sm"
              className="p-1 hover:bg-white/60 rounded-lg group"
              onClick={handleCopy}
            >
              <Copy className="w-4 h-4 text-gray-500 group-hover:text-pink-500" />
            </Button>
            <Button
              variant="text"
              size="sm"
              className="p-1 hover:bg-white/60 rounded-lg group"
            >
              <ThumbsUp className="w-4 h-4 text-gray-500 group-hover:text-pink-500" />
            </Button>
            <Button
              variant="text"
              size="sm"
              className="p-1 hover:bg-white/60 rounded-lg group"
            >
              <ThumbsDown className="w-4 h-4 text-gray-500 group-hover:text-pink-500" />
            </Button>
            <Button
              variant="text"
              size="sm"
              className="p-1 hover:bg-white/60 rounded-lg group"
              onClick={onRetry}
            >
              <RotateCcw className="w-4 h-4 text-gray-500 group-hover:text-pink-500" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ChatMessage);
