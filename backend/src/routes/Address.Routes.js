import { Router } from "express";
import { VerifyToken } from "../middleware/auth.middleware.js";
import { 
    deleteAddress, 
    getAddressById, 
    getUserAddresses, 
    setAddress, 
    setDefaultAddress, 
    updateAddress 
} from "../controllers/Address.controller.js";

const router = Router()

router.use(VerifyToken)

router.route("/").post(setAddress).get(getUserAddresses)
router.route("/:addressId").get(getAddressById).patch(updateAddress).delete(deleteAddress)
router.route("/:addressId/default").put(setDefaultAddress)

export default router