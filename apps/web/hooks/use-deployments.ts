import { useQuery, useMutation } from "@tanstack/react-query";
import { Deployment } from "./use-projects";
import { toast } from "sonner";
import { getQueryClient } from "@/lib/query-client";
import { env } from "@repo/config";

export function useDeployments(projectId: string) {

  return useQuery({
    queryKey: ["deployments", projectId],
    queryFn: async () => {
      const res = await fetch(
        `${env.NEXT_PUBLIC_API_URL || "http://localhost:3005"}/api/deploy?projectId=${projectId}`,
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch deployments");
      }
      return res.json() as Promise<Deployment[]>;
    },
    enabled: !!projectId,
    refetchInterval: (query) => {
      const deployments = query.state.data;
      if (!deployments) return false;

      const hasActiveDeployment = deployments.some(
        (d) => !["SUCCESS", "FAILED"].includes(d.status)
      );

      return hasActiveDeployment ? 3000 : false;
    },
  });
}

export function useCreateDeployment() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async ({ projectId }: { projectId: string }) => {
      const res = await fetch(
        `${env.NEXT_PUBLIC_API_URL || "http://localhost:3005"}/api/deploy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ projectId }),
          credentials: "include",
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
