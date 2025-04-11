"use client";
import React, { Suspense } from "react";
import ChatContainer from "../../../../components/chat/ChatContainer";
import ChatInput from "../../../../components/chat/ChatInput";
import { useChatOperations } from "@/hooks/useChatOperation";
import { useSearchParams } from "next/navigation";

const ChatContent = () => {
  const {
    messages,
    sendDefaultMesssage,
    inputMessage,
    setInputMessage,
    sendMessage,
  } = useChatOperations();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const type = searchParams.get("type");
    if (type === "consultation" && messages.length === 0) {
      sendDefaultMesssage();
    }
  }, [searchParams, messages.length, sendDefaultMesssage]);

  return (
    <div className="flex flex-col justify-between h-full p-4">
      <ChatContainer messages={messages} />
      <ChatInput
        value={inputMessage}
        onChange={setInputMessage}
        onSend={sendMessage}
      />
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatContent />
    </Suspense>
  );
};

export default Page;
