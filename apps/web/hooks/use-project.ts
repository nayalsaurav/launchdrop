import { useQuery } from "@tanstack/react-query";
import { Project } from "@/lib/types";
import { shouldRefetchProject } from "@/lib/hook-utils";


export function useProject(id: string) {
  
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const res = await fetch(`/api/project/${id}`);
      
      if (!res.ok) {
        throw new Error("Failed to fetch project");
      }
      return res.json() as Promise<Project>;
    },
    enabled: !!id,
    refetchInterval: (query) => shouldRefetchProject(query.state.data),
  });
}
