
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL! + "/api/auth",
    credentials: "include",
    fetchOptions: {
        onError: async (context) => {
            const { response } = context;
            if (response.status === 429) {
                const retryAfter = response.headers.get("X-Retry-After");
                throw new Error(`Rate limit exceeded. Retry after ${retryAfter} seconds`);
            }
        },
    }
})