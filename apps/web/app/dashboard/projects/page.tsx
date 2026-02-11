"use client";

import { useProjects } from "@/hooks/use-projects";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { FolderGit2, Globe, ExternalLink } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { CreateProjectDialog } from "@/components/dashboard/create-project-dialog";
import { ProjectCardActions } from "@/components/dashboard/project-card-actions";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function ProjectsPage() {
  const { data: projects, isLoading, isError } = useProjects();

  if (isLoading) {
    return <ProjectsPageSkeleton />;
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
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Manage all your projects in one place.
          </p>
        </div>
        <CreateProjectDialog />
      </div>

      {projects?.length === 0 ? (
        <Empty>
          <EmptyMedia>
            <FolderGit2 className="text-muted-foreground size-6" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No projects yet</EmptyTitle>
            <EmptyDescription>
              Create your first project to get started.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <CreateProjectDialog />
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects?.map((project) => (
            <Card
              key={project.id}
              className="group relative transition-colors hover:bg-muted/50"
            >
              <Link
                href={`/dashboard/projects/${project.id}`}
                className="absolute inset-0 z-10"
              >
                <span className="sr-only">View {project.name}</span>
              </Link>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-base">{project.name}</CardTitle>
                  <CardDescription className="line-clamp-1 text-xs">
                    {project.repoUrl}
                  </CardDescription>
                </div>
                <div className="relative z-20">
                  <ProjectCardActions project={project} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-xs">
                    <FolderGit2 className="mr-1 h-3 w-3" />
                    Git
                  </Badge>
                  {project.deployments?.some(d => d.status === "SUCCESS") && project.domain && (
                    <a 
                      href={`https://${project.domain}.hakuro.in`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-20 flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] text-blue-500 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Globe className="h-3 w-3" />
                      {project.domain}
                      <ExternalLink className="h-2 w-2" />
                    </a>
                  )}
                  <span>
                    Updated{" "}
                    {formatDistanceToNow(new Date(project.updatedAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectsPageSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-10 w-36" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-[140px] w-full rounded-xl" />
        <Skeleton className="h-[140px] w-full rounded-xl" />
        <Skeleton className="h-[140px] w-full rounded-xl" />
        <Skeleton className="h-[140px] w-full rounded-xl" />
        <Skeleton className="h-[140px] w-full rounded-xl" />
        <Skeleton className="h-[140px] w-full rounded-xl" />
      </div>
    </div>
  );
}
