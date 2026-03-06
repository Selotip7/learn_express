import { asyncHandler } from "#src/handler/asyncHandler.js";
import {  findToken,findUserByToken } from "#src/services/tokenService.js";
import { generateAccessToken, cookieOptions } from "#src/handler/jwtHandler.js";
import jwt from "jsonwebtoken";
export const refreshTokenController = asyncHandler(async (req, res, next) => {
  const cookiesToken = req.cookies.refreshToken;
  console.log("REFRESH COOKIE:", cookiesToken);
  if (!cookiesToken) {
    return res.sendStatus(403);
  }
  const verify = jwt.verify(cookiesToken, process.env.REFRESH_TOKEN_SECRET);
  if (!verify) {
    return res.sendStatus(403);
  }
  const find = await findToken(cookiesToken);
  if (!find) {
    return res.sendStatus(204);
  }
  const findUser= await findUserByToken(find.user_id);
  if (!findUser) {
    return res.sendStatus(204);
  }
  const accessToken = generateAccessToken(findUser);
  res.cookie("accessToken", accessToken, cookieOptions);

  return res.json({
    success: true,
    // token: find.token,
    message: "Token refreshed successfully",
  });
});
