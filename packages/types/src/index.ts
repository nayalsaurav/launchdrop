import { z } from "zod";

export const DeployInput = z.object({
  repoUrl: z.url(),
  env: z.record(z.string(), z.string()).default({}),
  projectId: z.string(),
  domain: z.string().nullable().optional(),
});

export type DeployInputType = z.infer<typeof DeployInput>;

export const CreateProjectSchema = z.object({
  name: z.string().min(3).max(50),
  repoUrl: z.url(),
});

export type CreateProjectSchemaType = z.infer<typeof CreateProjectSchema>;
