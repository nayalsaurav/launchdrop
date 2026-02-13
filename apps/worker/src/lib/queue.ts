import { createRedisClient, createBuildQueue } from "@repo/queue";

export const connection = createRedisClient(process.env.REDIS_URL!);
export const buildQueue = createBuildQueue(connection);
