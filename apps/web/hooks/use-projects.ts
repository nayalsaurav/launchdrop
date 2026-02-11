import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

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

export function useProjects() {
  const { data: session } = authClient.useSession();
  
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005"}/api/project`, {
        credentials: "include",
      });
      
      if (!res.ok) {
        throw new Error("Failed to fetch projects");
      }
      return res.json() as Promise<Project[]>;
    },
    enabled: !!session, // Only fetch if user is logged in
    refetchInterval: (query) => {
      const projects = query.state.data;
      if (!projects) return false;
      
      const hasActiveDeployment = projects.some(project => 
        project.deployments?.some(d => !["SUCCESS", "FAILED"].includes(d.status))
      );
      
      return hasActiveDeployment ? 3000 : false;
    },
  });
}
