import "dotenv/config";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { connection } from "./queue";

const baseURL = process.env.BETTER_AUTH_URL!;
const isProduction = process.env.NODE_ENV === "production";

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  throw new Error("Missing GitHub OAuth environment variables");
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  baseURL,
  secret: process.env.BETTER_AUTH_SECRET!,

  trustedOrigins: [
    baseURL,
    ...(isProduction && baseURL.includes("www.")
      ? [baseURL.replace("www.", "")]
      : []),
  ],

  advanced: {
    useSecureCookies: isProduction,
    defaultCookieAttributes: {
      sameSite: "lax",
      secure: isProduction,
    },
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },

  // ✅ Enable rate limiting with Redis
  rateLimit: {
    enabled: true,
    storage: "secondary-storage",
  },

  // ✅ Secondary storage (Redis)
  secondaryStorage: {
    get: async (key) => {
      return await connection.get(key);
    },
    set: async (key, value, ttl) => {
      if (ttl) {
        await connection.set(key, value, "EX", ttl);
      } else {
        await connection.set(key, value);
      }
    },
    delete: async (key) => {
      await connection.del(key);
    },
  },
});
