import { UserType } from "../types/user.types";

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}