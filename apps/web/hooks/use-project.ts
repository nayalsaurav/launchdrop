import { useQuery } from "@tanstack/react-query";
import { Project } from "./use-projects";


export function useProject(id: string) {
  
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005"}/api/project/${id}`, {
        credentials: "include",
      });
      
      if (!res.ok) {
        throw new Error("Failed to fetch project");
      }
      return res.json() as Promise<Project>;
    },
    enabled: !!id,
    refetchInterval: (query) => {
      const project = query.state.data;
      if (!project) return false;
      
      const hasActiveDeployment = project.deployments?.some(
        (d) => !["SUCCESS", "FAILED"].includes(d.status)
      );
      
      return hasActiveDeployment ? 3000 : false;
    },
  });
}
