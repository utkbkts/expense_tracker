import express from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import accountRoutes from "./account.routes";
import transactionRoutes from "./transaction.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/account", accountRoutes);
router.use("/transaction", transactionRoutes);

export default router;
