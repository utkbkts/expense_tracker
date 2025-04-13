import express from "express";
import authControllers from "../controllers/auth.controllers";

const router = express.Router();

router.post("/sign-up", authControllers.signUpUser);
router.post("/sign-in", authControllers.signInUser);

export default router;
