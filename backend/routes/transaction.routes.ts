import express from "express";
import transactionController from "../controllers/transaction.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/",authMiddleware,transactionController.getTransactions)
router.get("/dashboard",authMiddleware,transactionController.getDashboardInformation)
router.post("/add-transaction/:account_id",authMiddleware,transactionController.addTransaction)
router.put("/transfer-money",authMiddleware,transactionController.transferMoneyToAccount)


export default router;
