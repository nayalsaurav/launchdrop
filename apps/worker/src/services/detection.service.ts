import path from "node:path";
import { readdir, readFile } from "node:fs/promises";
import { WorkerError } from "../errors";

const STATIC_INDICATORS = ["vite.config.ts", "vite.config.js"];

const DISALLOWED_INDICATORS = [
  "server.js",
  "server.ts",
  "index.js",
  "index.ts",
  "app.js",
  "app.ts",
  "main.ts",
  "main.go",
];

type PackageManager = "bun" | "npm" | "pnpm" | "yarn";

export async function checkTheRepoType(workspace: string) {
  const pkgPath = path.join(workspace, "package.json");

  let pkg: any;
  try {
    pkg = JSON.parse(await readFile(pkgPath, "utf-8"));
  } catch {
    throw new WorkerError(
      "Not a valid JS project (package.json missing)",
      "INVALID_REPO"
    );
  }

  if (!pkg.scripts?.build) {
    throw new WorkerError(
      "No build script found",
      "MISSING_BUILD_SCRIPT"
    );
  }

  const files = await readdir(workspace, { recursive: true });

  for (const file of files) {
    if (DISALLOWED_INDICATORS.includes(path.basename(file))) {
      throw new WorkerError(
        "Backend/server project detected",
        "INVALID_PROJECT_TYPE"
      );
    }
  }

  const isStatic = files.some((file) =>
    STATIC_INDICATORS.includes(path.basename(file))
  );

  if (!isStatic) {
    throw new WorkerError("Not a static project", "INVALID_PROJECT_TYPE");
  }

  return {
    packageManager: detectPackageManager(files),
    buildCommand: pkg.scripts.build,
  };
}

export function detectPackageManager(files: string[]): {
  status: boolean;
  package: PackageManager;
} {
  if (files.includes("bun.lockb")) {
    return { status: true, package: "bun" };
  }

  if (files.includes("pnpm-lock.yaml")) {
    return { status: true, package: "pnpm" };
  }

  if (files.includes("yarn.lock")) {
    return { status: true, package: "yarn" };
  }

  if (files.includes("package-lock.json")) {
    return { status: true, package: "npm" };
  }
  
  throw new WorkerError("Invalid package manager", "INVALID_PACKAGE_MANAGER");
}
