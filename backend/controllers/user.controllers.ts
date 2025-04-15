import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/error.handler";
import { pool } from "../libs/database";


const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (error) {
    return next(new ErrorHandler("Internal server Error", 500));
  }
};


export default {
    getUser
}