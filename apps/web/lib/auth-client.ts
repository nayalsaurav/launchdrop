import { env } from "@repo/config/env";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
    baseURL: env.NEXT_PUBLIC_APP_URL! + "/api/auth",
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