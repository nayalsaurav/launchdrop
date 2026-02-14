export interface Deployment {
  id: string;
  status: "QUEUED" | "CLONING" | "BUILDING" | "DEPLOYING" | "SUCCESS" | "FAILED";
  createdAt: string;
  updatedAt: string;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  repoUrl: string;
  domain?: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  deployments?: Deployment[];
}

export interface DeployStatus {
  status: Deployment["status"];
}
