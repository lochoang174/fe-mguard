import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const response = await fetch("http://localhost:3001/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ user: null });
    }

    const user = await response.json();
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error getting session:", error);
    return NextResponse.json({ user: null });
  }
}
