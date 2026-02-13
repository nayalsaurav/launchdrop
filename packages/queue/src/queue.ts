import { Queue } from "bullmq";
import type { Redis } from "ioredis";

export const createBuildQueue = (connection: Redis) => {
  return new Queue("builds", {
    connection,
    defaultJobOptions: {
      attempts: 1,
      backoff: {
        type: "exponential",
        delay: 30_000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    },
  });
};
