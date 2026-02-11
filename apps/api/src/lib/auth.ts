import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@repo/database";
import { env } from "@repo/config";
import { fromNodeHeaders } from "better-auth/node";
import { type Request } from "express";
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword:{
        enabled: true,
    },
    socialProviders: {
        github:{
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        },
    },
    baseURL: env.BETTER_AUTH_URL || "http://localhost:3005",
    trustedOrigins: ["http://localhost:3000"],
});


export const getAuthContext = async (req: Request) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    });
    return session;
}