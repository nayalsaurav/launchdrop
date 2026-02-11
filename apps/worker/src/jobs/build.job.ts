import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Job } from "bullmq";
import type { DeployInputType } from "@repo/types";
import { prisma } from "@repo/database";
import { cloneRepo } from "../services/git.service";
import { createWorkspace, copyFile } from "../services/workspace.service";
import { checkTheRepoType } from "../services/detection.service";
import { uploadToR2 } from "../services/upload.service";
import { dockerBuild } from "../runtime/build";
import { cleanupWorkspace, cleanupDockerCache } from "../runtime/cleanup";
import { WorkerError } from "../errors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function buildJob(
  job: Job<{ deploymentId: string; data: DeployInputType }>
) {
  const { deploymentId, data } = job.data;
  let workspace: string | undefined;

  try {
    console.log(JSON.stringify({ deploymentId, phase: "start" }));
    workspace = await createWorkspace(deploymentId);

    console.log(JSON.stringify({ deploymentId, phase: "clone" }));
    await prisma.deployment.update({
      where: { id: deploymentId },
      data: { status: "CLONING" },
    });
    await cloneRepo({ repoUrl: data.repoUrl, workspace });

    console.log(JSON.stringify({ deploymentId, phase: "detect" }));
    const meta = await checkTheRepoType(workspace);

    console.log(JSON.stringify({ deploymentId, phase: "dockerfile" }));
    const dockerfileSrc = path.resolve(
      __dirname,
      "../templates",
      `Dockerfile.${meta.packageManager.package}`
    );
    const dockerfileDest = path.join(workspace, "Dockerfile");
    await copyFile(dockerfileSrc, dockerfileDest);

    console.log(JSON.stringify({ deploymentId, phase: "build" }));
    await prisma.deployment.update({
      where: { id: deploymentId },
      data: { status: "BUILDING" },
    });
    await Promise.race([
      dockerBuild(deploymentId, workspace),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new WorkerError("Build timed out", "TIMEOUT")),
          10 * 60_000
        )
      ),
    ]);

    console.log(JSON.stringify({ deploymentId, phase: "upload" }));
    await prisma.deployment.update({
      where: { id: deploymentId },
      data: { status: "DEPLOYING" },
    });
    await uploadToR2(data.domain!, workspace);

    console.log(JSON.stringify({ deploymentId, phase: "done" }));
    await prisma.deployment.update({
      where: { id: deploymentId },
      data: { status: "SUCCESS" },
    });
  } catch (error) {
    const isWorkerError = error instanceof WorkerError;
    const errorCode = isWorkerError ? error.code : "UNKNOWN_ERROR";
    const errorMessage = isWorkerError
      ? error.message
      : "An unexpected error occurred";

    console.error(
      JSON.stringify({
        deploymentId,
        phase: "error",
        jobId: job.id,
        code: errorCode,
        message: errorMessage,
        stack: error instanceof Error ? error.stack : undefined,
      })
    );
    await prisma.deployment.update({
      where: { id: deploymentId },
      data: { status: "FAILED" },
    });
    throw error;
  } finally {
    if (workspace) {
      console.log(JSON.stringify({ deploymentId, phase: "workspace-cleanup" }));
      await cleanupWorkspace(deploymentId, workspace);
    }
    await cleanupDockerCache();
  }
}
