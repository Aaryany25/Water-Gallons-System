import { Router } from "express";
import { VerifyToken } from "../middleware/auth.middleware.js";
import { GetUserAddress, SetAddress } from "../controllers/Address.controller.js";

const router = Router()


router.use(VerifyToken)

router.route("/SetAddress").post(SetAddress)
router.route("/GetAddress").get(GetUserAddress)
router.route("/setDefault").put()
export default router