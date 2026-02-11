"use client";

import { useProject } from "@/hooks/use-project";
import { DeploymentsList } from "@/components/dashboard/deployments-list";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ArrowLeft, Github, Globe, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

export default function ProjectDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: project, isLoading, isError } = useProject(id);

  if (isLoading) {
    return <ProjectDetailsSkeleton />;
  }

  if (isError || !project) {
    return (
        <div className="flex flex-1 items-center justify-center p-4">
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed p-12 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                    <ArrowLeft className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">
                    Project not found
                </h3>
                <p className="max-w-sm text-sm text-muted-foreground">
                    The project you&apos;re looking for doesn&apos;t exist or you don&apos;t have access.
                </p>
                <Button asChild variant="outline">
                    <Link href="/dashboard">Return to Dashboard</Link>
                </Button>
            </div>
        </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/projects">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Basic information about your project.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-3 gap-2">
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Repository</span>
                </div>
                <a 
                  href={project.repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline flex items-center gap-1 break-all"
                 >
                  {project.repoUrl}
                  <ExternalLink className="h-3 w-3 shrink-0" />
                </a>
             </div>

             {project.domain && (
               <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-3 gap-2">
                 <div className="flex items-center gap-2">
                   <Globe className="h-4 w-4 text-muted-foreground" />
                   <span className="text-sm font-medium">Domain</span>
                 </div>
                 <div className="flex items-center gap-3">
                   {project.deployments?.some(d => d.status === "SUCCESS") ? (
                     <a 
                       href={`https://${project.domain}.hakuro.in`} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-sm text-blue-500 hover:underline flex items-center gap-1 break-all text-right sm:text-left"
                     >
                       {project.domain}.hakuro.in
                       <ExternalLink className="h-3 w-3 shrink-0" />
                     </a>
                   ) : (
                     <span className="text-sm text-muted-foreground italic">
                       Pending successful deployment
                     </span>
                   )}
                 </div>
               </div>
             )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Deployments</CardTitle>
            <CardDescription>Manage and view your project deployments.</CardDescription>
        </CardHeader>
        <CardContent>
            <DeploymentsList projectId={project.id} />
        </CardContent>
      </Card>
    </div>
  );
}

function ProjectDetailsSkeleton() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
            <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-8 w-48" />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                <Skeleton className="h-[200px] w-full" />
                <Skeleton className="h-[200px] w-full" />
            </div>
            <Skeleton className="h-[400px] w-full" />
        </div>
    )
}
