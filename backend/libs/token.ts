import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import ErrorHandler from "../utils/error.handler";
import { NextFunction } from "express";

export const hashPassword = async (value: string) => {
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(value, salt);

  return hashedPassword;
};

export const comparePassword = async (
  userPassword: string,
  password: string
) => {
  try {
    const compare = await bcrypt.compare(userPassword, password);
    return compare;
  } catch (error) {
    console.log(error);
  }
};

export const createJWT = (id: string) => {
  return JWT.sign({ userId: id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_TIME as any,
  });
};
