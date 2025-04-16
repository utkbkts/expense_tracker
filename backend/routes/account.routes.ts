import express from "express";
import accountController from "../controllers/account.controller";

const router = express.Router();

router.get("/:id", accountController.getAccounts);
router.post("/create", accountController.createAccount);
router.put("/add-money/:id", accountController.addMoneyToAccount);

export default router;
