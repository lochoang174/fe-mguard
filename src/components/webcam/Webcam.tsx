"use client";

import useSocket from "@/hooks/useSocket";
import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";

const WebcamComponent = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [fps, setFps] = useState(5); // Mặc định là 5 frames/giây
  const [lastImage, setLastImage] = useState<string | null>(null);

  // Sử dụng hook useSocket
  const { connected, emit } = useSocket({
    onConnect: () => {
      console.log("Webcam component connected to server");
    },
    onDisconnect: (reason) => {
      console.log("Webcam component disconnected:", reason);
      setIsSending(false);
    },
  });

  // Kích hoạt khi người dùng cho phép truy cập webcam
  const handleWebcamInit = () => {
    setIsWebcamActive(true);
    console.log("Webcam access granted and initialized");
  };

  // Hàm chụp và gửi frame từ webcam
  const captureAndSendFrame = useCallback(() => {
    if (webcamRef.current && connected) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        // Loại bỏ tiền tố nếu cần thiết
        const base64Data = imageSrc.split(",")[1] || imageSrc;

        // Gửi base64 image đến server
        emit("webcam-frame", base64Data);
        setLastImage(imageSrc);
        return true;
      }
    }
    return false;
  }, [connected, emit]);

  // Bắt đầu/dừng gửi frames liên tục
  const toggleSending = useCallback(() => {
    setIsSending((prev) => !prev);
  }, []);

  const toggleWebcam = useCallback(() => {
    if (isWebcamActive) {
      setIsWebcamActive(false);
      setIsSending(false);
    } else {
      setIsWebcamActive(true);
    }
  }, [isWebcamActive]);

  // Thay đổi FPS
  const handleFpsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFps(Number(e.target.value));
  };

  // Thiết lập interval để gửi frames liên tục theo FPS
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isSending && isWebcamActive && connected) {
      intervalId = setInterval(captureAndSendFrame, 1000 / fps);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isSending, isWebcamActive, connected, captureAndSendFrame, fps]);

  return (
    <div className="flex flex-col items-center gap-5 p-5 bg-gray-50 rounded-lg shadow-lg">
      <div className="text-sm text-gray-600">
        <p>Streaming: {isSending ? "Active" : "Stopped"}</p>
      </div>

      {isWebcamActive && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
          height={480}
          videoConstraints={{
            width: 640,
            height: 480,
            facingMode: "user",
          }}
          onUserMedia={handleWebcamInit}
          className="rounded-lg shadow-md"
        />
      )}

      <div className="flex gap-3 items-center">
        <button
          onClick={toggleWebcam}
          className={`px-5 py-2.5 rounded-lg font-medium text-white transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg
            ${
              isWebcamActive
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          {isWebcamActive ? "Turn Off Camera" : "Turn On Camera"}
        </button>

        {isWebcamActive && (
          <>
            <button
              onClick={toggleSending}
              disabled={!connected}
              className={`px-4 py-2 rounded-lg font-medium text-white transition-all duration-300 ease-in-out
                ${
                  isSending
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }
                ${!connected ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {isSending ? "Stop Streaming" : "Start Streaming"}
            </button>

            <button
              onClick={captureAndSendFrame}
              disabled={!connected || isSending}
              className={`px-4 py-2 rounded-lg font-medium text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-in-out
                ${
                  !connected || isSending ? "opacity-50 cursor-not-allowed" : ""
                }
              `}
            >
              Send Single Frame
            </button>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">FPS: {fps}</label>
              <input
                type="range"
                min="1"
                max="30"
                value={fps}
                onChange={handleFpsChange}
                className="w-32"
              />
            </div>
          </>
        )}
      </div>

      {lastImage && (
        <div className="mt-5 text-center">
          <h3 className="text-base font-medium text-gray-800 mb-2">
            Last Sent Frame:
          </h3>
          <img
            src={lastImage}
            alt="Last sent frame"
            width={320}
            height={240}
            className="rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
};

export default WebcamComponent;
