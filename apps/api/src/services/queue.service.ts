import { buildQueue } from "@repo/queue";
import type { DeployInputType } from "@repo/types";

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
