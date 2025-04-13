import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/error.handler";
import { pool } from "../libs/database";
import { hashPassword } from "../libs/token";

const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstname, email, password } = req.body;

    if (!firstname || !email || !password) {
      return next(new ErrorHandler("Provide Required Fields!", 404));
    }

    const user_exists = await pool.query({
      text: "SELECT EXISTS (SELECT * FROM tbluser WHERE email = $1)",
      values: [email],
    });

    if (user_exists.rows[0].exists) {
      return next(
        new ErrorHandler("Email address already exists. Try Login", 409)
      );
    }

    const hashedPassword = await hashPassword(password);

    const insertResult = await pool.query({
      text: `INSERT INTO tbluser (firstname,email,password) VALUES ($1,$2,$3) RETURNING *`,
      values: [firstname, email, hashedPassword],
    });

    const newUser = { ...insertResult.rows[0] };
    delete newUser.password;

    res.status(201).json({
      status: "Success",
      message: "User account created successfully",
      user: newUser,
    });
  } catch (error) {
    return next(new ErrorHandler("Internal server Error", 500));
  }
};

const signInUser = async (req: Request, res: Response) => {
    
};

export default {
  signUpUser,
  signInUser,
};
