import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { connection } from "./queue";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword:{
        enabled: true,
    },
    socialProviders: {
        github:{
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        },
    },
    plugins: [nextCookies()], 
    rateLimit:{
        enabled: true,
        storage:"secondary-storage",
    },
    secondaryStorage:{
        get: async (key) => {
			return await connection.get(key);
		},
		set: async (key, value, ttl) => {
			if (ttl) await connection.set(key, value, 'EX', ttl)
			else await connection.set(key, value);
		},
		delete: async (key) => {
			await connection.del(key);
		}
    }
});
