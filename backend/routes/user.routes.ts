import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import userControllers from "../controllers/user.controllers";

const router = express.Router();

router.get("/", authMiddleware, userControllers.getUser);
router.put("/change-password", authMiddleware, userControllers.changePassword);
router.put("/", authMiddleware, userControllers.updateUser);

export default router;
