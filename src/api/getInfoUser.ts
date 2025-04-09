import { cookies } from "next/headers";
import axiosInstance from "./axios";

// Server-side function to get user info
export async function getUserInfo() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return null;
    }

    const response = await axiosInstance.get("/auth/info");

    if (response.status === 200) {
      const user = response.data;

      return user;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
}

export default getUserInfo;