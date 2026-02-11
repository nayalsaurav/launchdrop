import { rateLimit } from "express-rate-limit";
import { RedisStore, type RedisReply } from "rate-limit-redis";
import { connection } from "@repo/queue";

export const createRateLimiter = (
  windowMs: number = 15 * 60 * 1000,
  limit: number = 100,
  message: string = "Too many requests from this IP, please try again later."
) => {
  return rateLimit({
    windowMs,
    limit,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: message },
    store: new RedisStore({
		sendCommand: (command: string, ...args: string[]) =>
			connection.call(command, ...args) as Promise<RedisReply>,
        prefix: "rl:",
	}),
  });
};

export const globalLimiter = createRateLimiter(15 * 60 * 1000, 500);

export const strictLimiter = createRateLimiter(
  10 * 60 * 1000, 
  10, 
  "Resource creation limit exceeded. Please wait before creating more."
);
