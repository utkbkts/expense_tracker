import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/error.handler";
import { pool } from "../libs/database";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("🚀 ~ getUser ~ userId:", req.user)
  } catch (error:any) {
    return next(new ErrorHandler(`Internal server Error ${error.message}`, 500));
  }
};

const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    return next(new ErrorHandler("Internal server Error", 500));
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    return next(new ErrorHandler("Internal server Error", 500));
  }
};

export default {
  getUser,
  changePassword,
  updateUser,
};
