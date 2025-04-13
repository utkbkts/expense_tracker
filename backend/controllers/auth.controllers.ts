import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/error.handler";
import { pool } from "../libs/database";

const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, email, password } = req.body;

    if (!firstName || !email || !password) {
      return next(new ErrorHandler("Provide Required Fields!", 404));
    }

    const user_exists = await pool.query({
      text: "SELECT EXISTS (SELECT * FROM tbluser WHERE email = $1)",
      values: [email],
    });

    if (user_exists.rows[0].user_exists) {
      return next(
        new ErrorHandler("Email address already exists. Try Login", 409)
      );
    }
  } catch (error) {
    return next(new ErrorHandler("Internal server Error", 500));
  }
};

const signInUser = async (req: Request, res: Response) => {};

export default {
  signUpUser,
  signInUser,
};
