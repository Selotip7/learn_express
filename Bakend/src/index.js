import dotenv from "dotenv";
dotenv.config();


import express from "express";
import pool from "./conn.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/user.route.js";
import { errorHandler } from "#src/handler/errorHandler.js";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import fs from "fs";

// console.log("Does .env exist?", fs.existsSync("./.env"));

const app = express();
const PORT = process.env.PORT;

//express middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5500",
      "http://127.0.0.1:5500",
    ], // HARUS SAMA dengan frontend
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// console.log("DB:", process.env.DATABASE_URL);

app.use("/api/user", authRouter);
app.use(errorHandler);

// app.use("/api",userRoute)
app.listen(PORT, () => {
  console.log("the server is running in port " + PORT);
});
