import { Queue } from "bullmq";
import { connection } from "./client";

export const buildQueue = new Queue("builds", {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 30_000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});
