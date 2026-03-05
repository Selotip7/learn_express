import express from "express";
import {checkRole} from "#src/middleware/checkRoleMidlleware.js"
import {
  registration,
  loginController,
  logoutController,
  meController,
  addMemberController,
  getAllMemberController,
  deleteMemberController
} from "#src/controllers/userController.js";

import { refreshTokenController } from "#src/controllers/refreshTokenController.js";
import {
  verifyToken,
  verifyRefreshToken,
} from "#src/middleware/jwt.middleware.js";
const router = express.Router();


router.post("/registration",registration);
router.post("/login", loginController);
console.log("login route is running");
router.get("/logout", verifyRefreshToken, logoutController);
router.get("/refresh", refreshTokenController);
// router.get()
router.get("/me", verifyToken, meController);
router.post("/add", addMemberController);
router.get("/all", getAllMemberController);
router.delete("/:id", deleteMemberController);


export default router;

