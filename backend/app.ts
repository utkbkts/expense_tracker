import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import compression from "compression";
import hpp from "hpp";
import { sanitizeInput } from "./middlewares/xss.sanitize";
import path from "path";
import router from "./routes";
import {errorMiddleware} from "./middlewares/error.middleware";
const __dirname = path.resolve();
const app = express();
dotenv.config();
//path
//Security Alert
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);


//help for package
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(limiter);
app.use(helmet());
app.use(compression());
app.use(hpp());
app.use(sanitizeInput);

//router
app.use("/api/v1", router);

//after router middleware
app.use(errorMiddleware)
//Build provice
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    const indexPath = path.resolve(__dirname, "../frontend/dist/index.html");
    res.sendFile(indexPath);
  });
}
//Server listen
app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} Server is Running PORT`);
});
