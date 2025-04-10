"use client";

import React, { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/hooks/useSocket";
import { Video, VideoOff, Camera } from "lucide-react";

const WebcamComponent = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { socket, isConnected } = useSocket();

  // Hàm gửi frame từ webcam
  const sendFrame = useCallback(() => {
    if (!socket || !isConnected || !isRecording) {
      return;
    }

    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const base64Data = imageSrc.split(",")[1] || imageSrc;
        socket.emit("webcam-frame", base64Data);
      }
    }
  }, [socket, isConnected, isRecording]);

  // Gửi frame liên tục khi đang recording
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRecording) {
      intervalId = setInterval(sendFrame, 1000); // Gửi mỗi giây
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRecording, sendFrame]);

  const toggleCamera = useCallback(() => {
    setIsCameraOn((prev) => !prev);
    if (isRecording) {
      setIsRecording(false);
    }
  }, [isRecording]);

  const toggleRecording = useCallback(() => {
    setIsRecording((prev) => !prev);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {isCameraOn ? (
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            className="rounded-lg"
          />
        ) : (
          <div className="flex h-[240px] w-[320px] items-center justify-center rounded-lg bg-gray-200">
            <VideoOff className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={toggleCamera}
          variant="outlined"
          className="flex items-center gap-2"
        >
          {isCameraOn ? (
            <>
              <VideoOff className="h-4 w-4" />
              Tắt Camera
            </>
          ) : (
            <>
              <Video className="h-4 w-4" />
              Bật Camera
            </>
          )}
        </Button>

        <Button
          onClick={toggleRecording}
          disabled={!isConnected || !isCameraOn}
          className={`flex items-center gap-2 ${
            isRecording ? "bg-red-500 hover:bg-red-600" : ""
          }`}
        >
          <Camera className="h-4 w-4" />
          {isRecording ? "Dừng đo" : "Bắt đầu đo"}
        </Button>
      </div>
    </div>
  );
};

export default WebcamComponent;
