import { Router } from "express";
import { VerifyToken, VerifyAdmin } from "../middleware/auth.middleware.js";
import { 
    cancelOrder, 
    createOrder, 
    getOrderById, 
    getUserOrders, 
    updateOrder,
    getAllOrdersAdmin,
    updateOrderStatusAdmin
} from "../controllers/Order.controller.js";

const router = Router();

router.use(VerifyToken);

router.route("/").post(createOrder).get(getUserOrders);
router.route("/admin/all").get(VerifyAdmin, getAllOrdersAdmin);
router.route("/admin/:orderId/status").patch(VerifyAdmin, updateOrderStatusAdmin);
router.route("/:orderId").get(getOrderById).patch(updateOrder);
router.route("/:orderId/cancel").patch(cancelOrder);

export default router;
