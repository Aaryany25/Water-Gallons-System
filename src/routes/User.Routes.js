import { Router } from "express";
import { AllUser, LoginUser, RegisterUser } from "../controllers/User.Controller.js";

const router = Router()

// router.route("/register",RegisterUser)
router.route("/register").post(RegisterUser)
router.route("/login").post(LoginUser)

router.route("/here").get(AllUser)
export default router