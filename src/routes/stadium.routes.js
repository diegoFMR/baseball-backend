import { Router } from "express";
import {stadiumController} from "../controllers/stadium.controller.js";

const router = Router();

router.get("/list", stadiumController.listStadium);

export default router;