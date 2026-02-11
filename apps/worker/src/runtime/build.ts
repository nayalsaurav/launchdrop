import { WorkerError } from "../errors";

export const dockerBuild = async (deploymentId: string, workspace: string) => {
  const proc = Bun.spawn(
    ["docker", "buildx", "build", "--output", "type=local,dest=.", "."],
    {
      cwd: workspace,
      stdout: "inherit",
      stderr: "inherit",
    }
  );

  const exitCode = await proc.exited;

  if (exitCode !== 0) {
    throw new WorkerError(
      `Docker build failed for ${deploymentId}`,
      "BUILD_FAILED"
    );
  }
};
