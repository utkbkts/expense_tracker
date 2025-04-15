import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import userControllers from "../controllers/user.controllers";


const router = express.Router();


router.get("/",authMiddleware,userControllers.getUser)


export default router;
