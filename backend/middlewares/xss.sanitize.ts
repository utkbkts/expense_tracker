import xss from "xss";
import { NextFunction, Request, Response } from "express";
import { ParsedQs } from "qs";

const sanitize = (obj: any): any =>
  Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [
      key,
      typeof val === "string" ? xss(val) : val,
    ])
  );

export const sanitizeInput = (
  req: Request<any, any, any, ParsedQs>,
  res: Response,
  next: NextFunction
) => {
  if (req.body) req.body = sanitize(req.body);
  if (req.query) req.query = sanitize(req.query) as ParsedQs;
  if (req.params) req.params = sanitize(req.params);

  next();
};
