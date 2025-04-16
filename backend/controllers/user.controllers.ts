import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/error.handler";
import { pool } from "../libs/database";
import { comparePassword, hashPassword } from "../libs/token";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.user;

    const userExist = await pool.query({
      text:`SELECT * FROM tbluser WHERE id = $1`,
      values: [id]
    })

    const user = userExist.rows[0];

    if(!user){
      return next(new ErrorHandler(`User not found`, 404));
    }

    delete user.password;

    res.status(201).json({
      status:"success",
      user
    })

  } catch (error:any) {
    return next(new ErrorHandler(`Internal server Error ${error.message}`, 500));
  }
};

const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.user;
    const {firstname,lastname,country,currency,contact} = req.body;

    const userExist = await pool.query({
      text:`SELECT * FROM tbluser WHERE id = $1`,
      values: [id]
    })

    const user = userExist.rows[0];

    if(!user){
      return next(new ErrorHandler(`User not found`, 404));
    }

    const updateProfile = await pool.query({
      text: `UPDATE tbluser SET firstname = $1, lastname = $2, country = $3, currency = $4, contact = $5,updatedat = CURRENT_TIMESTAMP WHERE id = $6 RETURNING * `,
      values: [firstname, lastname, country, currency, contact, id]
    });

    delete updateProfile.rows[0].password;
    
    res.status(200).json({
      status:"success",
      message:"User information updated successfully",
      user:updateProfile.rows[0]
    })
  } catch (error:any) {
    return next(new ErrorHandler(`Internal server Error ${error.message}`, 500));
  }
};

const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.user;
    const {currentPassword,newPassword,confirmPassword} = req.body;

    
    const userExist = await pool.query({
      text:`SELECT * FROM tbluser WHERE id = $1`,
      values: [id]
    })

    const user = userExist.rows[0];

    if(!user){
      return next(new ErrorHandler(`User not found`, 404));
    }

    if(newPassword !== confirmPassword){
      return next(new ErrorHandler(`New passwords does not match`, 401));
    }

    const isMatch = await comparePassword(currentPassword,user?.password);

    if(!isMatch){
      return next(new ErrorHandler(`Invalid current password`, 401));
    }

    const hashedPassword = await hashPassword(newPassword);

    await pool.query({
      text:`UPDATE tbluser SET password = $1 WHERE id = $2`,
      values:[hashedPassword,id]
    })

    res.status(200).json({
      status:"success",
      message:"Password changed successfully"
    })

  } catch (error:any) {
    return next(new ErrorHandler(`Internal server Error ${error.message}`, 500));
  }
};

export default {
  getUser,
  changePassword,
  updateUser,
};
