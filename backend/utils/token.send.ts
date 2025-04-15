import { Response } from "express";
import { UserType } from "../types/user.types";
import { createJWT } from "../libs/token";

const sendToken =  (user: UserType, statusCode: number, res: Response) => {
  const token = createJWT(user.id);

  const setCookies = () => {
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(
        Date.now() +
          (process.env.COOKIE_EXPIRES_TIME as any) * 24 * 60 * 60 * 1000
      ),
    });
  };
  setCookies();
  res.status(statusCode).json({
    user,
  });
};

export default sendToken