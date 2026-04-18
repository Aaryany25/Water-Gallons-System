import { Router } from "express";
import { VerifyToken } from "../middleware/auth.middleware.js";
import { SetAddress } from "../controllers/Address.controller.js";

const router = Router()


router.use(VerifyToken)

router.route("/SetAddress").post(SetAddress)
export default router