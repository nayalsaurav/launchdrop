import { connection } from "./queue";
import { NextRequest } from "next/server";

export async function rateLimit(identifier: string, limit: number, windowInSeconds: number) {
  const key = `ratelimit:${identifier}`;
  const count = await connection.incr(key);
  
  if (count === 1) {
    await connection.expire(key, windowInSeconds);
  }
  
  return {
    success: count <= limit,
    limit,
    remaining: Math.max(0, limit - count),
  };
}

export async function globalRateLimit(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1";
    return rateLimit(`global:${ip}`, 100, 60);
}

export async function strictRateLimit(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1";
    return rateLimit(`strict:${ip}`, 5, 60);
}
