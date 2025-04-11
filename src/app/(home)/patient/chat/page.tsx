"use client";
import React, { useEffect } from "react";
import ChatContainer from "../../../../components/chat/ChatContainer";
import ChatInput from "../../../../components/chat/ChatInput";
import { useChatOperations } from "@/hooks/useChatOperation";
import { useSearchParams } from "next/navigation";

const Page = () => {
  // const { messages, inputMessage, handleSendMessage, handleInputChange } =
  //   useChat();
  const { messages, sendDefaultMesssage, inputMessage, setInputMessage, sendMessage } =
    useChatOperations();
  const searchParams = useSearchParams();

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "consultation" && messages.length === 0) {
      sendDefaultMesssage();
    }
  }, []);

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
