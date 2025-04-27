import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/error.handler";
import { pool } from "../libs/database";
import { comparePassword, hashPassword } from "../libs/token";
import sendToken from "../utils/token.send";

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
      newUser,
    });
  } catch (error: any) {
    return next(new ErrorHandler("Internal server Error" + error.message, 500));
  }
};

const signInUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Email and password are required", 400));
    }

    const result = await pool.query({
      text: `SELECT * FROM tbluser WHERE email = $1`,
      values: [email],
    });

    const user = result.rows[0];

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordValid = await comparePassword(password, user?.password);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    delete user.password;
    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler("Internal server Error", 500));
  }
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.cookie("token", null, { expires: new Date(0) });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return next(new ErrorHandler("Internal server Error", 500));
  }
};

export default {
  signUpUser,
  signInUser,
  logoutUser,
};
