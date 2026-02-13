import os from "node:os";
import path from "node:path";
import fs from "node:fs/promises";

import { WorkerError } from "../errors";

export async function createWorkspace(deploymentId: string) {
  try {
    const baseDir =
      process.env.NODE_ENV === "production"
        ? path.join(os.tmpdir(), "launchdrop", "builds")
        : path.resolve(".launchdrop", "builds");

    const workspace = path.join(baseDir, deploymentId);

    await fs.mkdir(workspace, { recursive: true });

    return workspace;
  } catch (error) {
    throw new WorkerError(
      "Failed to create workspace",
      "WORKSPACE_CREATION_FAILED"
    );
  }
}

export async function copyFile(from: string, to: string) {
  try {
    await fs.mkdir(path.dirname(to), { recursive: true });
    await fs.copyFile(from, to);
  } catch (error) {
    throw new WorkerError("Failed to copy file", "FILE_COPY_FAILED");
  }
}
