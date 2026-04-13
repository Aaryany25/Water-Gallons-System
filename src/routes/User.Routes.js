import { Router } from "express";
import { AllUser, RegisterUser } from "../controllers/User.Controller.js";

const router = Router()

// router.route("/register",RegisterUser)
router.route("/register").post(RegisterUser)
router.route("/here").get(AllUser)
export default router