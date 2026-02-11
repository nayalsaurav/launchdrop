import path from "node:path";
import { readdir } from "node:fs/promises";
import { upload } from "@repo/storage";
import { WorkerError } from "../errors";

export async function uploadToR2(domain: string, workspace: string) {
  try {
    const dirPath = path.join(workspace, "dist");
    const entries = await readdir(dirPath, {
      recursive: true,
      withFileTypes: true,
    });
    const uploads: Promise<void>[] = [];
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      const absolutePath = path.join(entry.parentPath, entry.name);
      const relativePath = path
        .relative(workspace, absolutePath)
        .replace(/\\/g, "/");
      const key = `deployments/${domain}/${relativePath}`;
      uploads.push(uploadFile(key, absolutePath));
    }
    await Promise.all(uploads);
  } catch (error: any) {
    console.error(`[Upload Error] ${error.message}`, error);
    throw new WorkerError(
      `Upload failed: ${error.message}`,
      "UPLOAD_FAILED"
    );
  }
}

async function uploadFile(key: string, filePath: string) {
  try {
    const file = Bun.file(filePath);
    const body = new Uint8Array(await file.arrayBuffer());
    await upload({ key, type: file.type, body });
  } catch (error: any) {
    console.error(`[File Upload Error] ${key}: ${error.message}`, error);
    throw new WorkerError(`Failed to upload file: ${key}. ${error.message}`, "UPLOAD_FAILED");
  }
}
