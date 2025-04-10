"use client";

import { useEffect, useCallback, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useChatStore } from "@/stores/chat.store";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

export const useSocket = () => {
  const { addMessage, setResponseMessage } = useChatStore();
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Initialize socket connection
  useEffect(() => {
    console.log("Initializing socket connection to:", SOCKET_URL);

    const newSocket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected successfully. Socket ID:", newSocket.id);
      setIsConnected(true);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
      setIsConnected(false);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected. Reason:", reason);
      setIsConnected(false);
    });

    newSocket.on(
      "messageResponse",
      (data: {
        id: string;
        text: string;
        timestamp: string;
        fromServer: boolean;
      }) => {
        if (data.fromServer) {
          console.log("Received message response:", {
            id: data.id,
            text: data.text,
            timestamp: data.timestamp,
          });
          setResponseMessage(data.id, data.text);
        }
      }
    );

    newSocket.on("error", (error: string) => {
      console.error("Socket error:", error);
    });

    return () => {
      console.log("Cleaning up socket connection");
      newSocket.disconnect();
    };
  }, [setResponseMessage]);

  const sendMessage = useCallback(
    (message: string, idMessage: string, idUser: string) => {
      if (socket && socket.connected) {
        console.log("Sending message:", { idMessage, message });
        socket.emit("sendMessage", {
          idMessage,
          message: message,
          timestamp: new Date(),
          idUser,
        });
      } else {
        console.error("Socket not connected. Current state:", {
          socketExists: !!socket,
          isConnected: socket?.connected,
          socketId: socket?.id,
        });
      }
    },
    [socket]
  );

  return {
    socket,
    sendMessage,
    isConnected,
  };
};

export default useSocket;
