import { createUser, login } from "#src/services/userService.js";
import { asyncHandler } from "#src/handler/asyncHandler.js";
import {
  cookieOptions,
  generateAccessToken,
  generateRefreshToken,
} from "#src/handler/jwtHandler.js";

import * as tokenService from "#src/services/tokenService.js";
import jwt from "jsonwebtoken";

export const registration = asyncHandler(async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    const error = new Error("name,email,password are required");
    error.code = 400;
    throw error;
  }

  await createUser(req);

  return res.json({
    success: true,
    message: "user created successfully",
  });
});

export const loginController = asyncHandler(async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    const error = new Error("email and password are required");
    error.code = 400;

    throw error;
  }

  const user = await login(req);

  const accessToken = generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);
  console.log("accessToken:", accessToken);
  res.cookie("refreshToken", refreshToken, cookieOptions);
  res.cookie("token","adaluuuuurr", cookieOptions);
  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      token: accessToken,
    },
  });
});

export const meController = asyncHandler(async (req, res, next) => {
  // const token = req.cookies.accessToken;
  // const user=jwt.decode(token);

  res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      role: req.user.role,
    },
  });
});

export const logoutController = asyncHandler(async (req, res, next) => {
  tokenService.deleteToken(req.token);
  // console.log("logout is running, token:", token);
  res.clearCookie("refreshToken", cookieOptions);
  // res.clearCookie("accessToken", cookieOptions);
  res.json({
    message: "logged out",
    // token: req.user.token,
  });
});
