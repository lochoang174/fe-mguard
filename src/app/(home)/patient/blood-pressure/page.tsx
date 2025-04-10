import Tutorial from "@/components/webcam/Tutorial";
import WebcamComponent from "@/components/webcam/Webcam";
import React from "react";
import GuidanceMessage from "@/components/webcam/GuidanceMessage";
import PreparationGuide from "@/components/webcam/PreparationGuide";

const Page = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex-2 flex flex-col justify-center items-center gap-10">
        <PreparationGuide />
        <WebcamComponent />
        <GuidanceMessage message="Xin hãy làm theo chỉ dẫn của AI" />
      </div>
      <div className="flex-1">
        <Tutorial />
      </div>
    </div>
  );
};

export default Page;
