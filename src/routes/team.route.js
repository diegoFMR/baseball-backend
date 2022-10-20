import { Router } from "express";
import { teamController } from "../controllers/team.controller.js";

const router = Router();

router.get("/list", teamController.listTeams);

export default router;