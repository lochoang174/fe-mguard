import React, { memo } from "react";

const ChatHeader = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold text-gray-800">
        AI Health Assistant
      </h1>
    </div>
  );
};

export default memo(ChatHeader);
