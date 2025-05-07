import express from "express";
import accountController from "../controllers/account.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/:id?", authMiddleware,accountController.getAccounts);
router.post("/create",authMiddleware, accountController.createAccount);
router.put("/add-money/:id",authMiddleware, accountController.addMoneyToAccount);
router.delete("/:id",authMiddleware, accountController.deleteAccount);

export default router;
