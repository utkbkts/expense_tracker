import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/error.handler";
import { pool } from "../libs/database";

const getAccounts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;

    const accountQuery = await pool.query({
      text: `SELECT * FROM tblaccount WHERE user_id = $1`,
      values: [id],
    });

    if (accountQuery.rowCount === 0) {
      return next(new ErrorHandler(`No accounts found for this user`, 404));
    }

    res.status(200).json({
      status: "success",
      data: accountQuery.rows,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(`Internal server Error ${error.message}`, 500)
    );
  }
};

const createAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;
    const { name, amount, account_number } = req.body;

    const accountExistQuery = await pool.query({
      text: `SELECT * FROM tblaccount WHERE account_name = $1 AND user_id = $2`,
      values: [name, id],
    });

    if (accountExistQuery.rows.length > 0) {
      return next(
        new ErrorHandler(`Account with this name already exists`, 409)
      );
    }

    const createAccountResult = await pool.query({
      text: `INSERT INTO tblaccount(user_id, account_name, account_number, account_balance) 
               VALUES($1, $2, $3, $4) RETURNING *`,
      values: [id, name, account_number, amount],
    });

    const account = createAccountResult.rows[0];

    const userAccounts = [name];

    const updateUserAccountQuery = {
      text: `UPDATE tbluser SET accounts = array_cat(accounts, $1), updatedat = CURRENT_TIMESTAMP 
               WHERE id = $2 RETURNING *`,
      values: [userAccounts, id],
    };

    await pool.query(updateUserAccountQuery);

    const description = account.account_name + "(Initial Deposit)";

    const initialDepositQuery = {
      text: `INSERT INTO tbltransaction(user_id,description,type,status,amount,source) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
      values: [
        id,
        description,
        "income",
        "Completed",
        amount,
        account.account_name,
      ],
    };

    await pool.query(initialDepositQuery);

    res.status(201).json({
      status: "success",
      message: account.account_name + "Account created successfully",
      data: account,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(`Internal server Error: ${error.message}`, 500)
    );
  }
};

const addMoneyToAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error: any) {
    return next(
      new ErrorHandler(`Internal server Error ${error.message}`, 500)
    );
  }
};

export default {
  getAccounts,
  createAccount,
  addMoneyToAccount,
};
