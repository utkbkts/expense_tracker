import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/error.handler";
import { pool } from "../libs/database";
import { getMonthName } from "../libs/token";

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
    const { id: userId } = req.user;

    let totalIncome = 0;
    let totalExpense = 0;

    const transactionsResult = await pool.query({
      text: `
        SELECT type, SUM(amount) AS totalAmount 
        FROM tbltransaction 
        WHERE user_id = $1 
        GROUP BY type
      `,
      values: [userId],
    });

    const transactions = transactionsResult.rows;

    transactions.forEach((transaction) => {
      const amount = parseFloat(transaction.totalamount);
      if (transaction.type === "income") {
        totalIncome += amount;
      } else if (transaction.type === "expense") {
        totalExpense += amount;
      }
    });

    const availableBalance = totalIncome - totalExpense;

    const year = new Date().getFullYear();
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59);

    const monthlyResult = await pool.query({
      text: `
        SELECT 
          EXTRACT(MONTH FROM createdat) AS month,
          type,
          SUM(amount) AS totalAmount 
        FROM tbltransaction 
        WHERE user_id = $1 
          AND createdat BETWEEN $2 AND $3 
        GROUP BY EXTRACT(MONTH FROM createdat), type
      `,
      values: [userId, startDate, endDate],
    });

    const data = new Array(12).fill(null).map((_, index) => {
      const monthData = monthlyResult.rows.filter(
        (item) => parseInt(item.month) === index + 1
      );

      const income = parseFloat(
        monthData.find((item) => item.type === "income")?.totalamount || 0
      );

      const expense = parseFloat(
        monthData.find((item) => item.type === "expense")?.totalamount || 0
      );

      return {
        label: getMonthName(index),
        income,
        expense,
      };
    });

    const lastTransactionsResult = await pool.query({
      text: `SELECT * FROM tbltransaction WHERE user_id = $1 ORDER BY id DESC LIMIT 5`,
      values: [userId],
    });

    const lastTransactions = lastTransactionsResult.rows;

    const lastAccountResult = await pool.query({
      text: `SELECT * FROM tblaccount WHERE user_id = $1 ORDER BY id DESC LIMIT 4`,
      values: [userId],
    });

    const lastAccount = lastAccountResult.rows;

    res.status(200).json({
      status: "success",
      availableBalance,
      totalIncome,
      totalExpense,
      chartData: data,
      lastTransactions,
      lastAccount,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(`Internal server error: ${error.message}`, 500)
    );
  }
};

const addTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.user;
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
      text: `INSERT INTO tbltransaction(user_id, description, type, status, amount, source) 
             VALUES($1, $2, $3, $4, $5, $6)`,
      values: [userId, description, "expense", "completed", amount, source],
    });

    await pool.query("COMMIT");

    res.status(200).json({
      status: "Success",
      message: "Transaction completed successfully",
    });
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
    const { id: userId } = req.user;
    const { from_account, to_account, amount } = req.body;

    if (!from_account || !to_account || !amount) {
      return next(new ErrorHandler("Provide required fields!", 400));
    }

    if (from_account === to_account) {
      return next(new ErrorHandler("Cannot transfer to the same account", 400));
    }

    const newAmount = Number(amount);

    if (isNaN(newAmount) || newAmount <= 0) {
      return next(new ErrorHandler("Amount should be greater than 0.", 400));
    }

    await pool.query("BEGIN");

    const fromAccountResult = await pool.query(
      `SELECT * FROM tblaccount WHERE id = $1 FOR UPDATE`,
      [from_account]
    );

    const fromAccount = fromAccountResult.rows[0];

    if (!fromAccount) {
      await pool.query("ROLLBACK");
      return next(new ErrorHandler("Sender account not found.", 404));
    }

    if (newAmount > fromAccount.account_balance) {
      await pool.query("ROLLBACK");
      return next(
        new ErrorHandler("Transfer failed. Insufficient account balance.", 403)
      );
    }

    const toAccountResult = await pool.query(
      `SELECT * FROM tblaccount WHERE id = $1 FOR UPDATE`,
      [to_account]
    );

    const toAccount = toAccountResult.rows[0];

    if (!toAccount) {
      await pool.query("ROLLBACK");
      return next(new ErrorHandler("Recipient account not found.", 404));
    }

    await pool.query(
      `UPDATE tblaccount 
       SET account_balance = account_balance - $1, updatedat = CURRENT_TIMESTAMP 
       WHERE id = $2`,
      [newAmount, from_account]
    );

    await pool.query(
      `UPDATE tblaccount 
       SET account_balance = account_balance + $1, updatedat = CURRENT_TIMESTAMP 
       WHERE id = $2`,
      [newAmount, to_account]
    );

    const description = `Transfer (${fromAccount.account_name} → ${toAccount.account_name})`;
    const descriptionReceived = `Received (${fromAccount.account_name} → ${toAccount.account_name})`;

    await pool.query(
      `INSERT INTO tbltransaction(user_id, description, type, status, amount, source) 
       VALUES($1, $2, $3, $4, $5, $6)`,
      [
        userId,
        description,
        "expense",
        "Completed",
        newAmount,
        fromAccount.account_name,
      ]
    );

    await pool.query(
      `INSERT INTO tbltransaction(user_id, description, type, status, amount, source) 
       VALUES($1, $2, $3, $4, $5, $6)`,
      [
        userId,
        descriptionReceived,
        "income",
        "Completed",
        newAmount,
        toAccount.account_name,
      ]
    );

    await pool.query("COMMIT");

    res.status(201).json({
      status: "success",
      message: "Transfer completed successfully",
    });
  } catch (error: any) {
    await pool.query("ROLLBACK");
    console.error("Transfer Error:", error);
    return next(
      new ErrorHandler(`Internal Server Error: ${error.message}`, 500)
    );
  }
};

export default {
  getTransactions,
  getDashboardInformation,
  addTransaction,
  transferMoneyToAccount,
};
