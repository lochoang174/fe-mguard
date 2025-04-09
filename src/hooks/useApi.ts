import { useState } from "react";
import axiosInstance from "@/lib/axios";

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}

export function useApi<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const execute = async (
    method: "get" | "post" | "put" | "delete",
    url: string,
    data?: any,
    options: UseApiOptions<T> = {}
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.request<T>({
        method,
        url,
        data,
      });

      options.onSuccess?.(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data || err.message);
      options.onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    execute,
  };
}
