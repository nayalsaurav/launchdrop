import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Project } from "@/lib/types";
import { getQueryClient } from "@/lib/query-client";


interface CreateProjectInput {
  name: string;
  repoUrl: string;
}

export function useCreateProject() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async (data: CreateProjectInput) => {
      const res = await fetch("/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create project");
      }

      return res.json() as Promise<Project>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created successfully");
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });
}
