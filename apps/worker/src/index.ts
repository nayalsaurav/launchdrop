import { Worker } from "bullmq";
import { connection } from "./lib/queue";
import type { DeployInputType } from "@repo/types";
import { buildJob } from "./jobs/build.job";

export const worker = new Worker<{
  deploymentId: string;
  data: DeployInputType;
}>(
  "builds",
  buildJob,
  {
    connection,
    concurrency: 1,
  }
);

console.log("🚀 Build worker started");

process.on("SIGTERM", async () => {
  console.log("Worker shutting down...");
  await worker.close();
  process.exit(0);
});
