"use client";

import { useDeployments, useCreateDeployment } from "@/hooks/use-deployments";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Loader2, Rocket } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function DeploymentsList({ projectId }: { projectId: string }) {
  const { data: deployments, isLoading, isError } = useDeployments(projectId);
  const { mutate: createDeployment, isPending: isDeploying } = useCreateDeployment();

  if (isLoading) {
    return <DeploymentsListSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
          <Rocket className="h-5 w-5 text-destructive" />
        </div>
        <h3 className="text-sm font-semibold">Failed to load deployments</h3>
        <p className="text-xs text-muted-foreground">Something went wrong. Please try again.</p>
      </div>
    );
  }

  if (deployments?.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Deployments</h3>
        <Empty className="rounded-md border border-dashed p-10">
          <EmptyMedia>
            <Rocket className="h-10 w-10 text-muted-foreground" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No deployments yet</EmptyTitle>
            <EmptyDescription>
              Launch your project by triggering your first deployment.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              onClick={() => createDeployment({ projectId })}
              disabled={isDeploying}
              size="lg"
            >
              {isDeploying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isDeploying ? "Deploying..." : "Deploy Now"}
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Deployments</h3>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Deployed At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deployments?.map((deployment) => (
              <TableRow key={deployment.id}>
                <TableCell>
                  <Badge
                    variant={
                      deployment.status === "SUCCESS"
                        ? "default"
                        : deployment.status === "FAILED"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {deployment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(deployment.createdAt), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function DeploymentsListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-9 w-24" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Deployed At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 3 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

