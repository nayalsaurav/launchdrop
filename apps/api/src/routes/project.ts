import { Router } from "express";
import { createProject, getAllProjects, getProject, deleteProject } from "../controllers/project.controller";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import { strictLimiter } from "../middlewares/ratelimit.middleware";

const router = Router();

router.use(authenticationMiddleware);

router.post("/", strictLimiter, createProject);
router.get("/", getAllProjects);
router.get("/:id", getProject);
router.delete("/:id", deleteProject);

export default router;
