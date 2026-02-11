import { Router } from "express";
import { createProject, getAllProjects, getProject, deleteProject } from "../controllers/project.controller";
import { authenticationMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticationMiddleware);

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:id", getProject);
router.delete("/:id", deleteProject);

export default router;
