import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import cors from "cors";

const router = Router();

router.post("/findUser", cors(), userController.findUser);
router.post("/register", userController.registerUser);
router.post("/encrypt", userController.encriptPassword);

export default router;