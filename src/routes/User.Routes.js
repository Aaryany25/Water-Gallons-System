import { Router } from "express";
import { RegisterUser } from "../controllers/User.Controller.js";

const router = Router()

router.route("/register",RegisterUser)

export default router