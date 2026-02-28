import dotenv from "dotenv";
import jwt from "jsonwebtoken";
// import {logoutController} from "../controllers/user.js";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Mengambil token dari header Authorization

  if (!token) {
    return res.status(401).json({ 
      success : false,
      message: "Silahkan login dahulu" });



  }

  // verify without try catch, karena jwt.verify bisa melempar error jika token tidak valid
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // console.log("error at verify token, Token verification error :", err);
      return res.status(403).json({
        success: false,
        message: "Invalid token",
      });
    }
    req.user = decoded;
    next();
  });

  

  // Verify with try catch
  // try {
  //   const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  //   console.log("decoded token:", decoded);
  //   req.user = decoded;
  //   next();
  // } catch (err) {
  //   return res.status(401).json({ 
  //     success: false,
  //     message: "Invalid token" });
  // }
 
};