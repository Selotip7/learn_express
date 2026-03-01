import express from "express";
import prisma from "./conn.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/user.route.js";
import { errorHandler } from "#src/handler/errorHandler.js";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

//express middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173", // HARUS SAMA dengan frontend
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
  console.log("the server is running in port 3001");
});
