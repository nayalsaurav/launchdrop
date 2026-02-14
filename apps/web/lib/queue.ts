import { createRedisClient, createBuildQueue } from "@repo/queue";
import { DeployInputType } from "@repo/types";

export const connection = createRedisClient(process.env.REDIS_URL!);
export const buildQueue = createBuildQueue(connection);

export async function addToBuildQueue({
  deploymentId,
  data,
}: {
  deploymentId: string;
  data: DeployInputType;
}) {
  await buildQueue.add(
    "build",
    {
      deploymentId,
      data: data,
    },
    {
      jobId: deploymentId,
    }
  );
}
