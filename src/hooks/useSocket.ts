"use client";

import { useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { useChatStore } from "@/stores/chat.store";

let socket: Socket;

export const useSocket = () => {
  const { addMessage, setResponseMessage } = useChatStore();

  const initializeSocket = useCallback(() => {
    const SOCKET_URL =
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";
    socket = io(SOCKET_URL);

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    socket.on(
      "messageResponse",
      (data: {
        id: string;
        text: string;
        timestamp: string;
        fromServer: boolean;
      }) => {
        if (data.fromServer) {
          console.log("data.text: "+data.text)
          console.log("data.id: "+data.id)
          // Update the loading message or add a new one
          // addMessage(data.text, false);
          // setLoading(false,data.id);
          setResponseMessage(data.id,data.text);
        }
      }
    );

    socket.on("error", (error: string) => {
      console.error("Socket error:", error);
    });

    return () => {
      socket.disconnect();
    };
    }, [addMessage]);

  const sendMessage = useCallback((message: string,id:string) => {
    if (socket && socket.connected) {
      socket.emit("sendMessage", {
        id,
        text: message,
        timestamp: new Date(),
      });
    } else {
      console.error("Socket not connected");
    }
  }, []);

  useEffect(() => {
    const cleanup = initializeSocket();
    return () => {
      cleanup();
    };
  }, [initializeSocket]);

  return {
    socket,
    sendMessage,
    isConnected: socket?.connected || false,
  };
};

export default useSocket;
