"use client";

import { useProjects } from "@/hooks/use-projects";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderGit2, Globe, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CreateProjectDialog } from "@/components/dashboard/create-project-dialog";
import { ProjectCardActions } from "@/components/dashboard/project-card-actions";

export default function DashboardPage() {
  const { data: projects, isLoading, isError } = useProjects();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
      return (
          <div className="flex flex-1 items-center justify-center p-4">
              <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed p-12 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                      <FolderGit2 className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">
                      Something went wrong
                  </h3>
                  <p className="max-w-sm text-sm text-muted-foreground">
                      We couldn&apos;t load your projects. Please check your connection and try again.
                  </p>
                  <Button variant="outline" onClick={() => window.location.reload()}>
                      Try Again
                  </Button>
              </div>
          </div>
      );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* ... Other stats cards can go here ... */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderGit2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              +0% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 lg:col-span-7">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Recent Projects</CardTitle>
                <CardDescription>
                You have {projects?.length || 0} total projects.
                </CardDescription>
            </div>
            <CreateProjectDialog />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects?.length === 0 ? (
                <Empty>
                  <EmptyMedia>
                    <FolderGit2 className="text-muted-foreground size-6" />
                  </EmptyMedia>
                  <EmptyHeader>
                    <EmptyTitle>No projects found</EmptyTitle>
                    <EmptyDescription>
                      You haven&apos;t created any projects yet. Start by creating a new one.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <CreateProjectDialog />
                  </EmptyContent>
                </Empty>
              ) : (
                projects?.slice(0, 5).map((project) => {
                    const isDeployed = project.deployments?.some(d => d.status === "SUCCESS");
                    const domainUrl = project.domain ? `https://${project.domain}.hakuro.in` : null;

                    return (
                        <div
                            key={project.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50 gap-4"
                        >
                            <Link href={`/dashboard/projects/${project.id}`} className="flex flex-1 items-center gap-4 min-w-0">
                                <div className="grid gap-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="text-sm font-medium leading-none">
                                            {project.name}
                                        </p>
                                        {isDeployed && domainUrl && (
                                            <a 
                                                href={domainUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex items-center gap-1 text-[10px] text-blue-500 hover:underline px-1.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 whitespace-nowrap"
                                            >
                                                <Globe className="h-3 w-3" />
                                                {project.domain}
                                                <ExternalLink className="h-2 w-2" />
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground truncate">
                                        {project.repoUrl}
                                    </p>
                                </div>
                            </Link>
                            <div className="flex items-center justify-between sm:justify-end gap-4">
                                <div className="text-sm text-muted-foreground whitespace-nowrap">
                                    {formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}
                                </div>
                                <ProjectCardActions project={project} />
                            </div>
                        </div>
                    );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <Skeleton className="h-[125px] w-full rounded-xl" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Skeleton className="col-span-4 h-[400px] w-full rounded-xl" />
                <Skeleton className="col-span-3 h-[400px] w-full rounded-xl" />
            </div>
        </div>
    )
}
