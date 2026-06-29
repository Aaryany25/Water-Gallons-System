import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, registerUser, updateUser ,getAllUser} from "../controllers/User.Controller.js";
import { VerifyToken, VerifyAdmin } from "../middleware/auth.middleware.js";

const router = Router()

// router.route("/register",RegisterUser)
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/alluser").get(VerifyToken, VerifyAdmin, getAllUser)
// Authenticated Routes
router.route("/logout").post(VerifyToken,logoutUser)
router.route("/me").get(VerifyToken,getCurrentUser)
router.route("/edit").patch(VerifyToken,updateUser)

export default router