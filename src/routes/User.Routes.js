import { Router } from "express";
import { CurrentUser, LoginUser, LogoutUser, RegisterUser, UpdateUser } from "../controllers/User.Controller.js";
import { VerifyToken } from "../middleware/auth.middleware.js";

const router = Router()

// router.route("/register",RegisterUser)
router.route("/register").post(RegisterUser)
router.route("/login").post(LoginUser)

// Authenticated Routes
router.route("/logout").post(VerifyToken,LogoutUser)
router.route("/me").get(VerifyToken,CurrentUser)
router.route("/edit").patch(VerifyToken,UpdateUser)

export default router