import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { Deployment } from "./use-projects";

export function useDeployments(projectId: string) {
  const { data: session } = authClient.useSession();

  return useQuery({
    queryKey: ["deployments", projectId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005"}/api/deploy?projectId=${projectId}`,
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch deployments");
      }
      return res.json() as Promise<Deployment[]>;
    },
    enabled: !!session && !!projectId,
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId }: { projectId: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005"}/api/deploy`,
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
  });
}
