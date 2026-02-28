import { asyncHandler } from "#src/handler/asyncHandler.js";
import { findToken } from "#src/services/userServices.js";

export const refreshTokenController = asyncHandler(async (req, res, next) => {
  const cookiesToken = req.cookies.refreshToken;
  if (!cookiesToken) {
    return res.sendStatus(204);
  }

  const findToken = await findToken(cookiesToken);
});
