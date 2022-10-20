import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

const router = Router();

router.post("/findUser", userController.findUser);
router.post("/register", userController.registerUser);
router.post("/encrypt", userController.encriptPassword);

export default router;