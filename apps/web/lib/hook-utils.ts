import { Project, Deployment } from "./types";

export const REFERSH_INTERVAL = 3000;

export function shouldRefetchProject(project?: Project) {
  if (!project) return false;
  const hasActiveDeployment = project.deployments?.some((d) =>
    !["SUCCESS", "FAILED"].includes(d.status)
  );
  return hasActiveDeployment ? REFERSH_INTERVAL : false;
}

export function shouldRefetchProjects(projects?: Project[]) {
    if (!projects) return false;
    const hasActiveDeployment = projects.some(project => 
      project.deployments?.some(d => !["SUCCESS", "FAILED"].includes(d.status))
    );
    return hasActiveDeployment ? REFERSH_INTERVAL : false;
}

export function shouldRefetchDeployments(deployments?: Deployment[]) {
    if (!deployments) return false;
    const hasActiveDeployment = deployments.some(
      (d) => !["SUCCESS", "FAILED"].includes(d.status)
    );
    return hasActiveDeployment ? REFERSH_INTERVAL : false;
}
