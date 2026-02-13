import type { Request, Response } from "express";
import { prisma } from "../lib/db";
import { CreateProjectSchema } from "@repo/types";
import { generateDomain } from "@repo/utils";

export const createProject = async (req: Request, res: Response) => {
  const parsed = CreateProjectSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input", details: parsed.error });
  }

  const { name, repoUrl } = parsed.data;

  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const projectCount = await prisma.project.count({
      where: {
        userId: req.user.id,
      },
    });

    if (projectCount >= 5) {
      return res.status(403).json({
        error: "Project limit reached",
        message: "You can only have up to 5 projects.",
      });
    }
    async function createWithUniqueDomain(domain: string, attempts = 0): Promise<any> {
      try {
        return await prisma.project.create({
          data: {
            name,
            repoUrl,
            domain,
            userId: req.user!.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      } catch (error: any) {
        if (error.code === "P2002" && attempts < 10) {
          const nextDomain = generateDomain(name);
          return createWithUniqueDomain(nextDomain, attempts + 1);
        }
        throw error;
      }
    }

    const initialDomain = generateDomain(name);
    const project = await createWithUniqueDomain(initialDomain);

    return res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllProjects = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const projects = await prisma.project.findMany({
      where: {
        userId: req.user.id,
        deletedAt: null,
      },
      include: {
        deployments: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getProject = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const id = req.params.id as string;

  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        deployments: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!project) {
        return res.status(404).json({ error: "Project not found" });
    }

    if (project.userId !== req.user.id) {
        return res.status(403).json({ error: "Forbidden" });
    }

    return res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const id = req.params.id as string;

  try {
    const project = await prisma.project.findUnique({
        where: { id },
    });

    if (!project) {
        return res.status(404).json({ error: "Project not found" });
    }

    if (project.userId !== req.user.id) {
        return res.status(403).json({ error: "Forbidden" });
    }

    await prisma.project.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
