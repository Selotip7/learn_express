import express from "express";
import prisma from "../src/conn.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter  from "#src/routes/user.routes.js";
import {errorHandler} from "#src/handler/errorHandler.js"
import cors from "cors";


dotenv.config();
const app = express();
const PORT = process.env.PORT;

//express middleware
app.use(
  cors({
    origin: "http://localhost:5500", // HARUS SAMA dengan frontend
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
