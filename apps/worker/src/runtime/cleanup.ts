import { rm } from "node:fs/promises";

export async function cleanupWorkspace(
  deploymentId: string,
  workspace: string
) {
  try {
    await rm(`${workspace}`, { recursive: true, force: true });
  } catch (err) {
    console.warn("Failed to cleanup dist folder", err);
  }
}

export async function cleanupDockerCache() {
  try {
    const proc = Bun.spawn(["docker", "buildx", "prune", "-f"], {
      stdout: "ignore",
      stderr: "ignore",
    });

    await proc.exited;
  } catch (err) {
    console.warn("Docker build cache cleanup failed", err);
  }
}
