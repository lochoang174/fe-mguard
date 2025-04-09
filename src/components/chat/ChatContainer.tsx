import React, { memo } from "react";
import ChatMessage from "./ChatMessage";
import { Message } from "@/types/message";

interface ChatContainerProps {
  messages: Message[];
}

const ChatContainer = ({ messages }: ChatContainerProps) => {
  return (
    <div className="flex-1  space-y-6 overflow-y-auto scrollbar-hide">
      <div className="w-5xl mx-auto ">
        {" "}
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
};

export default memo(ChatContainer);
