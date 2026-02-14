import { useQuery } from "@tanstack/react-query";
import { DeployStatus } from "@/lib/types";

export function useDeployStatus(id: string) {
  return useQuery({
    queryKey: ["deploy-status", id],
    queryFn: async () => {
      const res = await fetch(`/api/deploy/${id}/status`);
      if (!res.ok) {
        throw new Error("Failed to fetch deploy status");
      }
      return res.json() as Promise<DeployStatus>;
    },
    enabled: !!id,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status && ["SUCCESS", "FAILED"].includes(status)) {
        return false;
      }
      return 1000;
    },
  });
}
