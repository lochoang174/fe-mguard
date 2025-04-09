import { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";

// Cấu hình socket với các options cần thiết
const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling"],
  path: "/socket.io/",
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

interface UseSocketProps {
  onConnect?: () => void;
  onDisconnect?: (reason: string) => void;
  onReconnect?: () => void;
}

export const useSocket = ({
  onConnect,
  onDisconnect,
  onReconnect,
}: UseSocketProps = {}) => {
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    // Kết nối thành công
    socket.on("connect", () => {
      setConnected(true);
      console.log("Đã kết nối với server");
      onConnect?.();
    });

    // Ngắt kết nối
    socket.on("disconnect", (reason) => {
      setConnected(false);
      console.log("Đã ngắt kết nối:", reason);
      onDisconnect?.(reason);
    });

    // Kết nối lại thành công
    socket.on("reconnect", () => {
      console.log("Đã kết nối lại với server");
      onReconnect?.();
    });

    // Cleanup function to remove listeners when the component is unmounted
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("reconnect");
    };
  }, [onConnect, onDisconnect, onReconnect]);

  // Gửi dữ liệu đến server
  const emit = useCallback(
    (event: string, data: any, callback?: (response: any) => void) => {
      if (socket.connected) {
        socket.emit(event, data, callback);
        return true;
      }
      return false;
    },
    []
  );

  // Kiểm tra trạng thái kết nối
  const isConnected = useCallback(() => socket.connected, []);

  return {
    socket,
    connected,
    emit,
    isConnected,
  };
};

export default useSocket;
