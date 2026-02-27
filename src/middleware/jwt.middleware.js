// import dotenv from "dotenv";
import jwt from "jsonwebtoken";
// import {logoutController} from "../controllers/user.js";
// dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log("verifyToken is running, token:", token);
  if (!token) {
    return res.status(401).json({ 
      success : false,
      message: "No access token provided" });
    // return res.redirect("../../Frontend/login.html");


  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("decoded token:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ 
      success: false,
      message: "Invalid token" });
  }
 
};