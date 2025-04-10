"use client";
import React from "react";
import ChatContainer from "../../../../components/chat/ChatContainer";
import ChatInput from "../../../../components/chat/ChatInput";
import { useChatOperations } from "@/hooks/useChatOperation";

const Page = () => {
  // const { messages, inputMessage, handleSendMessage, handleInputChange } =
  //   useChat();
  const { messages, sendMessage, inputMessage, setInputMessage } = useChatOperations()

  return (
    <div className="flex flex-col justify-between h-full p-4 ">
      <ChatContainer messages={messages} />
      <ChatInput
        value={inputMessage}
        onChange={setInputMessage}
        onSend={sendMessage}
      />
    </div>
  );
};

export default Page;
