import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/error.handler";
import { pool } from "../libs/database";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      return next(
        new ErrorHandler("You are not authorized to access this route", 401)
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
    };
    
    const result = await pool.query("SELECT * FROM tbluser WHERE id = $1", [
      decoded.userId,
    ]);

    if (result.rows.length === 0) {
      return next(new ErrorHandler("User not found", 404));
    }

    req.user = result.rows[0];
    delete req.user?.password
    next();
  } catch (error:any) {
    return next(new ErrorHandler(`Internal Server Error ${error.message}`, 500));
  }
};
