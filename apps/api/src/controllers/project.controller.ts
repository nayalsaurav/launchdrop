import type { Request, Response } from "express";
import { prisma } from "@repo/database";
import { CreateProjectSchema } from "@repo/types";

export const createProject = async (req: Request, res: Response) => {
  const parsed = CreateProjectSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input", details: parsed.error });
  }

  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const project = await prisma.project.create({
      data: {
        name: parsed.data.name,
        repoUrl: parsed.data.repoUrl,
        userId: req.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

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
      },
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

    await prisma.project.delete({
      where: {
        id,
      },
    });

    return res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
