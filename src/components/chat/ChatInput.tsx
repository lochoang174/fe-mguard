import React, { memo } from "react";
import { SendHorizontal } from "lucide-react";
import { Button } from "../ui/button";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

const ChatInput = ({ value, onChange, onSend }: ChatInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="relative w-full max-w-[1000px] mx-auto  rounded-3xl flex flex-col p-4 bg-gray-200/80  h-[108px] hover:border-none hover:outline-none">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Bắt đầu tư vấn cùng M-Guard Agent..."
        className="w-full bg-transparent focus:outline-none focus:ring-0 placeholder:text-gray-500 resize-none pt-0 overflow-y-auto scrollbar-hide h-[40px] align-top"
      />
      <div className="flex justify-end">
        <Button
          onClick={onSend}
          className="ms-2 rounded-full p-2 w-[44px]"
        >
          <SendHorizontal />
        </Button>
      </div>
    </div>
  );
};

export default memo(ChatInput);