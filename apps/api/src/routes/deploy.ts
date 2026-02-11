import { Router } from "express";
import { createDeploy, deleteDeploy, getAllDeploy, getDeployStatus } from "../controllers/deploy.controller";
import { authenticationMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticationMiddleware);

router.post("/", createDeploy);
router.get("/", getAllDeploy);
router.delete("/:id", deleteDeploy);
router.get("/:id/status", getDeployStatus);

export default router;
