import { Router } from "express";
import { LoginUser, LogoutUser, RegisterUser } from "../controllers/User.Controller.js";
import { VerifyToken } from "../middleware/auth.middleware.js";

const router = Router()

// router.route("/register",RegisterUser)
router.route("/register").post(RegisterUser)
router.route("/login").post(LoginUser)

// Authenticated Routes
router.route("/logout").post(VerifyToken,LogoutUser)
export default router