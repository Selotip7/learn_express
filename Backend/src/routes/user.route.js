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
// console.log("login route is running");
router.get("/refresh", refreshTokenController);
router.get("/logout", verifyRefreshToken, logoutController);

router.use(verifyToken);
router.use(checkRole("ADMIN"));
router.delete("/:id", deleteMemberController);
router.get("/all", getAllMemberController);
router.post("/add", addMemberController);
router.put("/:id", addMemberController);
router.get("/me", meController);


export default router;



