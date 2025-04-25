import express from "express";
import authControllers from "../controllers/auth.controllers";

const router = express.Router();

router.post("/sign-up", authControllers.signUpUser);
router.post("/sign-in", authControllers.signInUser);
router.post("/logout", authControllers.logoutUser);

export default router;
