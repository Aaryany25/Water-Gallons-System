import { Router } from "express";
import { VerifyToken } from "../middleware/auth.middleware.js";
import { 
    cancelOrder, 
    createOrder, 
    getOrderById, 
    getUserOrders, 
    updateOrder 
} from "../controllers/Order.controller.js";

const router = Router();

router.use(VerifyToken);

router.route("/").post(createOrder).get(getUserOrders);
router.route("/:orderId").get(getOrderById).patch(updateOrder);
router.route("/:orderId/cancel").patch(cancelOrder);

export default router;
