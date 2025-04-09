import React, { memo } from "react";
import AIWriter from "react-aiwriter";
import ReactMarkdown from "react-markdown";
import { Flag, Bot } from "lucide-react";
import { Message } from "../../app/(home)/patient/chat/types";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const { user } = useAuth();
  if (!message.isUser && message.isLoading) {
    return (
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <Bot className="w-8 h-8 text-pink-500" />
        </div>
        <div className="flex-1 max-w-[80%] bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-gray-600">
            Vui lòng đợi, tôi đang tạo câu trả lời...
          </p>
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
          <div className=" bg-white rounded-full">
            {" "}
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
      <div
        className={`max-w-[60%] rounded-2xl py-2 px-4 ${
          message.isUser
            ? "bg-[#f60384] text-white"
            : "bg-white/40 shadow-sm text-gray-800"
        }`}
      >
        {message.isUser ? (
          <p className="">{message.content}</p>
        ) : (
          <div className="prose prose-sm max-w-none">
            <AIWriter>
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </AIWriter>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ChatMessage);
