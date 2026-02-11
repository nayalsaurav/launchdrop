import { prisma } from "@repo/database";
import type { Request, Response, NextFunction } from "express";

import { DeployInput } from "@repo/types";
import { addToBuildQueue } from "../services/queue.service";

export const createDeploy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const DeployBodySchema = DeployInput.omit({ repoUrl: true });
    const parsed = DeployBodySchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid request body",
        issues: parsed.error,
      });
    }

    const { projectId } = parsed.data;

    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const project = await prisma.project.findUnique({
        where: { id: projectId }
    });

    if (!project) {
        return res.status(404).json({ error: "Project not found" });
    }

    if (project.userId !== req.user.id) {
        return res.status(403).json({ error: "Forbidden" });
    }

    const deployment = await prisma.deployment.create({
      data: {
        projectId: project.id,
        status: "QUEUED",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });

    const deploymentId = deployment.id;
    const data = { 
        projectId: project.id,
        repoUrl: project.repoUrl,
        domain: project.domain,
        env: parsed.data.env || {}
    };
    
    await addToBuildQueue({ deploymentId, data });
    return res.status(201).json({
      deploymentId,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllDeploy = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const projectId = req.query.projectId;
        
        if (!req.user) {
             return res.status(401).json({ error: "Unauthorized" });
        }

        if(!projectId || typeof projectId !== 'string') {
            return res.status(400).json({ error: "Project ID is required and must be a string" });
        }

        const project = await prisma.project.findUnique({
            where: { id: projectId },
        });

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
    
        if (project.userId !== req.user.id) {
            return res.status(403).json({ error: "Forbidden" });
        }

        const deployments = await prisma.deployment.findMany({
            where: {
                projectId
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        
        return res.json(deployments);

    } catch (error) {
        next(error);
    }
}


export const getDeployStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!id || typeof id !== 'string') {
             return res.status(400).json({ error: "Deployment ID is required" });
        }

        const deployment = await prisma.deployment.findUnique({
            where: { id },
        });

        if (!deployment) {
            return res.status(404).json({ error: "Deployment not found" });
        }

        const project = await prisma.project.findUnique({
            where: { id: deployment.projectId }
        });

        if (!project || project.userId !== req.user.id) {
            return res.status(403).json({ error: "Forbidden" });
        }

        return res.json({status: deployment.status});

    } catch (error) {
        next(error);
    }
}