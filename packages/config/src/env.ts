import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({
  path: "../../.env",
});

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DATABASE_URL: z.url(),
  REDIS_URL: z.url(),
  NEXT_PUBLIC_APP_URL: z.url().optional(),

  R2_ACCOUNT_ID: z.string().min(1),
  R2_ACCESS_KEY_ID: z.string().min(1),
  R2_SECRET_ACCESS_KEY: z.string().min(1),
  R2_BUCKET_NAME: z.string().min(1),

  R2_PUBLIC_URL: z.url(),
  R2_ENDPOINT: z.url(),
  GITHUB_CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.string().min(1),
  
});

export const env = EnvSchema.parse(process.env);
export type Env = z.infer<typeof EnvSchema>;
