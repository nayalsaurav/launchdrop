import { z } from "zod";

export const DeployInput = z.object({
  repoUrl: z.string().url(),
  buildCommand: z.string().default("bun run build"),
  outputDir: z.string().default("dist"),
  env: z.record(z.string(), z.string()).default({}),
  projectId: z.string(),
});

export type DeployInputType = z.infer<typeof DeployInput>;

export const CreateProjectSchema = z.object({
  name: z.string().min(3).max(50),
  repoUrl: z.string().url(),
});

export type CreateProjectSchemaType = z.infer<typeof CreateProjectSchema>;
