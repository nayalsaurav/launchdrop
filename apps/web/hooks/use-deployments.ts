import { useQuery, useMutation } from "@tanstack/react-query";
import { Deployment } from "@/lib/types";
import { toast } from "sonner";
import { getQueryClient } from "@/lib/query-client";
import { shouldRefetchDeployments } from "@/lib/hook-utils";


export function useDeployments(projectId: string) {

  return useQuery({
    queryKey: ["deployments", projectId],
    queryFn: async () => {
      const res = await fetch(`/api/deploy?projectId=${projectId}`);

      if (!res.ok) {
        throw new Error("Failed to fetch deployments");
      }
      return res.json() as Promise<Deployment[]>;
    },
    enabled: !!projectId,
    refetchInterval: (query) => shouldRefetchDeployments(query.state.data),
  });
}

export function useCreateDeployment() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async ({ projectId }: { projectId: string }) => {
      const res = await fetch("/api/deploy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ projectId }),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create deployment");
      }

      return res.json();
    },
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["deployments", projectId] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
}
