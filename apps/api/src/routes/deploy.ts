import { Router } from "express";
import { createDeploy, getAllDeploy, getDeployStatus } from "../controllers/deploy.controller";
import { authenticationMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticationMiddleware);

router.post("/", createDeploy);
router.get("/", getAllDeploy);
router.get("/:id/status", getDeployStatus);

export default router;
