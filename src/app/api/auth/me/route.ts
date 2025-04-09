import { NextResponse } from "next/server";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: Request) {
  try {
    const response = await axios.get(`${baseURL}/api/auth/me`, {
      withCredentials: true,
      headers: {
        Cookie: request.headers.get("cookie") || "",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error getting user info:", error);
    return NextResponse.json({ user: null });
  }
}
