import { useChatStore } from "@/stores/chat.store";
import useSocket from "./useSocket";
import { useAuth } from "@/contexts/AuthContext";

export const useChatOperations = () => {
  const {
    messages,
    isLoading,
    error,
    addMessage,
    setError,
    clearMessages,
    retryLastMessage,
    setInputMessage,
    inputMessage,
  } = useChatStore();

  const { sendMessage: socketSendMessage, isConnected } = useSocket();
  const { user } = useAuth();
  const sendDefaultMesssage = async () => {
    if (!isConnected) {
      setError("Không thể kết nối đến server. Vui lòng thử lại sau.");
      return;
    }
    // Add user message
    addMessage("Hãy nhận xét về dữ liệu đo huyết áp mới nhất của tôi", true);
    const id = addMessage("", false);

    setInputMessage("");
    try {
      setError(null);

      // Add a loading message from bot

      // Send message through socket
      socketSendMessage("Hãy nhận xét về dữ liệu đo huyết áp mới nhất của tôi", id, user?._id || "");

      // Note: We don't need to handle the response here
      // The socket listener in useSocket will handle the response
      // and update the store automatically
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Có lỗi xảy ra khi gửi tin nhắn";
      setError(errorMessage);
    } finally {
    }
  };
  const sendMessage = async () => {
    if (!isConnected) {
      setError("Không thể kết nối đến server. Vui lòng thử lại sau.");
      return;
    }
    // Add user message
    addMessage(inputMessage, true);
    const id = addMessage("", false);

    setInputMessage("");
    try {
      setError(null);

      // Add a loading message from bot

      // Send message through socket
      socketSendMessage(inputMessage, id, user?._id || "");

      // Note: We don't need to handle the response here
      // The socket listener in useSocket will handle the response
      // and update the store automatically
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Có lỗi xảy ra khi gửi tin nhắn";
      setError(errorMessage);
    } finally {
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    retryLastMessage,
    isConnected,
    inputMessage,
    setInputMessage,
    sendDefaultMesssage
  };
};
