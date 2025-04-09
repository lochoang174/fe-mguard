"use client";
import React from "react";
import ChatContainer from "../../../../components/chat/ChatContainer";
import ChatInput from "../../../../components/chat/ChatInput";
import { useChat } from "../../../../hooks/useChat";

const Page = () => {
  const { messages, inputMessage, handleSendMessage, handleInputChange } =
    useChat();

  return (
    <div className="flex flex-col justify-between h-full p-4 ">
      <ChatContainer messages={messages} />
      <ChatInput
        value={inputMessage}
        onChange={handleInputChange}
        onSend={handleSendMessage}
      />
    </div>
  );
};

export default Page;
