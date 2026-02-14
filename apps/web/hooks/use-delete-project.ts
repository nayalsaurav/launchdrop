import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getQueryClient } from "@/lib/query-client";


export function useDeleteProject() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/project/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to delete project");
      }
      
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted successfully");
    },
     onError: (error) => {
        toast.error(error.message);
    }
  });
}
