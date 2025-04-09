import React from "react";

const GuidanceMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center justify-center ">
      <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg text-foreground">
        <span className="text-sm text-[#1E40AF]">{message}</span>
      </div>
    </div>
  );
};

export default GuidanceMessage;
