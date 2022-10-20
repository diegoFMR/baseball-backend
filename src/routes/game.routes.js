import { Router } from "express";
import {gameController} from "../controllers/game.controller.js";

const router = Router();

router.post("/findById", gameController.findNextGameByTeam);
router.post("/create", gameController.createMatch);
router.post("/update", gameController.updateMatch);
router.post("/delete", gameController.deleteMatch);

export default router;