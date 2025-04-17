import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/error.handler";
import { pool } from "../libs/database";

const getTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = new Date();

    const _sevenDaysAgo = new Date(today);

    _sevenDaysAgo.setDate(today.getDate() - 7);

    const sevenDaysAgo = _sevenDaysAgo.toISOString().split("T")[0];

    const { df, dt, s } = req.query;

    const { id } = req.user;

    const startDate = new Date(typeof df === "string" ? df : sevenDaysAgo);
    const endDate = new Date(typeof dt === "string" ? dt : new Date());

    const transactions = await pool.query({
      text: `
          SELECT * 
          FROM tbltransaction 
          WHERE user_id = $1 
            AND createdat BETWEEN $2 AND $3 
            AND (
              description ILIKE '%' || $4 || '%' 
              OR status ILIKE '%' || $4 || '%' 
              OR source ILIKE '%' || $4 || '%'
            )
          ORDER BY id DESC
        `,
      values: [id, startDate, endDate, s],
    });

    res.status(200).json({
      status: "success",
      data: transactions.rows,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(`Internal server Error ${error.message}`, 500)
    );
  }
};

const getDashboardInformation = async (
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

const addTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id:userId } = req.user;
    const { account_id } = req.params;
    const { description, source, amount } = req.body;

    if (!description || !source || !amount) {
      return next(new ErrorHandler(`Provide required fields!`, 403));
    }

    if (Number(amount) <= 0) {
      return next(new ErrorHandler(`Amount should be grater than 0.`, 403));
    }

    const result = await pool.query({
      text: `SELECT * FROM tblaccount WHERE id = $1`,
      values: [account_id],
    });

    const accountInfo = result.rows[0];

    if (!accountInfo) {
      return next(new ErrorHandler(`Invalid account information`, 404));
    }

    if (
      accountInfo.account_balance <= 0 ||
      accountInfo.account_balance < Number(amount)
    ) {
      return next(
        new ErrorHandler(
          `Transaction Failed. Insufficient account balance.`,
          403
        )
      );
    }

    await pool.query("BEGIN");

    await pool.query({
      text: `UPDATE tblaccount SET account_balance = account_balance - $1, updatedat = CURRENT_TIMESTAMP 
      WHERE id = $2 RETURNING *`,
      values: [amount, account_id],
    });

    await pool.query({
      text: `INSERT INTO tbltransaction(user_id,description,type,status,amount,source) VALUES($1,$2,$3,$4,$5)`,
      values: [userId,description,"expense","completed",amount,source],
    });

    await pool.query("COMMIT");

    res.status(200).json({
      status:"Success",
      message:"Transaction completed successfully"
    })
  } catch (error: any) {
    return next(
      new ErrorHandler(`Internal server Error ${error.message}`, 500)
    );
  }
};

const transferMoneyToAccount = async (
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
  getTransactions,
  getDashboardInformation,
  addTransaction,
  transferMoneyToAccount,
};
