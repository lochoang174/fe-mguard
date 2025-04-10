"use client";

import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/hooks/useSocket";
import { Video, VideoOff, Camera } from "lucide-react";

const WebcamComponent = () => {
  const webcamRef = useRef<Webcam>(null);
  const [lastImage, setLastImage] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const { socket, isConnected } = useSocket();

  // Hàm chụp và gửi frame từ webcam
  const captureAndSendFrame = useCallback(() => {
    if (!socket || !isConnected) {
      console.error("Socket is not connected");
      return false;
    }

    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        // Loại bỏ tiền tố nếu cần thiết
        const base64Data = imageSrc.split(",")[1] || imageSrc;

        // Gửi base64 image đến server
        socket.emit("webcam-frame", base64Data);
        setLastImage(imageSrc);
        return true;
      }
    }
    return false;
  }, [socket, isConnected]);

  const toggleCamera = useCallback(() => {
    setIsCameraOn((prev) => !prev);
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
          onClick={captureAndSendFrame}
          disabled={!isConnected || !isCameraOn}
          className="flex items-center gap-2"
        >
          <Camera className="h-4 w-4" />
          Chụp ảnh
        </Button>
      </div>

      {lastImage && (
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-medium">Ảnh đã chụp:</h3>
          <img
            src={lastImage}
            alt="Last captured"
            className="rounded-lg border border-gray-200"
          />
        </div>
      )}
    </div>
  );
};

export default WebcamComponent;
