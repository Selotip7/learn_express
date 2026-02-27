import express from "express";
import {checkRole} from "#src/middleware/checkRole.js"
import {
  registration,
  loginController,
  logoutController,
  meController,
} from "#src/controllers/user.js";
import {verifyToken} from "#src/middleware/jwt.middleware.js";
const router = express.Router();


router.post("/registration",registration);
router.post("/login", loginController);
router.get("/logout",verifyToken,logoutController);
// router.get()
router.get("/me", verifyToken, checkRole("ADMIN"), meController);
// router.get("/me", verifyToken, meController);
export default router;

