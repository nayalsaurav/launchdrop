import { WorkerError } from "../errors";

export async function cloneRepo({
  repoUrl,
  workspace,
}: {
  repoUrl: string;
  workspace: string;
}) {
  const proc = Bun.spawn(
    [
      "git",
      "clone",
      "--depth=1",
      "--single-branch",
      "--config",
      "core.hooksPath=/dev/null",
      repoUrl,
      workspace,
    ],
    {
      stdout: "inherit",
      stderr: "inherit",
      env: {
        GIT_TERMINAL_PROMPT: "0",
      },
    }
  );

  const exitCode = await proc.exited;
  if (exitCode !== 0) {
    throw new WorkerError("Git clone failed", "GIT_CLONE_FAILED");
  }
}
