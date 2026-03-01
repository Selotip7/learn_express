import { asyncHandler } from "#src/handler/asyncHandler.js";
import { createToken, findToken } from "#src/services/tokenService.js";
export const refreshTokenController = asyncHandler(async (req, res, next) => {
  const cookiesToken = req.cookies.refreshToken;
  if (!cookiesToken) {
    return res.sendStatus(204);
  }

  const find = await findToken(cookiesToken);
  if (!find) {
    return res.sendStatus(204);
  }
  return res.json({
    success: true,
    // token: find.token,
  });
});
