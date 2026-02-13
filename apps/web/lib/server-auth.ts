import { cookies } from "next/headers";


const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";

export async function getServerSession() {
  const cookieStore = cookies();
  try {
    const response = await fetch(
      `${backendUrl}/api/auth/get-session`,
      {
        method: "GET",
        headers: {
          Cookie: (await cookieStore).toString(),
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!response.ok) return null;

    return response.json();
  } catch (error) {
    console.error("Failed to fetch session:", error);
    return null;
  }
}
