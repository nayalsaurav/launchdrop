import { useQuery } from "@tanstack/react-query";
import { Project } from "@/lib/types";
import { shouldRefetchProjects } from "@/lib/hook-utils";

export function useProjects() {
  
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch("/api/project");

      
      if (!res.ok) {
        throw new Error("Failed to fetch projects");
      }
      return res.json() as Promise<Project[]>;
    },
    staleTime: 10000,
    refetchInterval: (query) => shouldRefetchProjects(query.state.data),
  });
}
