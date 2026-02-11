import { Router } from "express";
import { createDeploy, getAllDeploy, getDeployStatus } from "../controllers/deploy.controller";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import { strictLimiter } from "../middlewares/ratelimit.middleware";

const router = Router();

router.use(authenticationMiddleware);

router.post("/", strictLimiter, createDeploy);
router.get("/", getAllDeploy);
router.get("/:id/status", getDeployStatus);

export default router;
