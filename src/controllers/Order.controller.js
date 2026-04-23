import { Order } from "../models/order.models.js";
import { Address } from "../models/address.models.js";
import { User } from "../models/user.models.js";
import { APIerror } from "../utils/APIerror.js";
import { APIresponse } from "../utils/APIresponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { createOrderSchema, updateOrderSchema } from "../validators/order.schema.js";

const RATE_PER_GALLON = 50;

const createOrder = AsyncHandler(async (req, res) => {
    const validation = createOrderSchema.safeParse(req.body);
    if (!validation.success) {
        throw new APIerror(400, validation.error.errors[0].message);
    }

    const { gallons, deliveryTime, paymentMethod, note } = validation.data;
    let addressId = validation.data.address;
    const userAddress = await Address.findOne({owner:req.user._id,isDefault:true})
console.log(userAddress)
    // If no address provided, use user's default address
    if (!addressId) {
        addressId = userAddress._id;
    }

    if (!addressId) {
        throw new APIerror(400, "Delivery address is required");
    }

    // Verify address exists and belongs to the user
    const address = await Address.findOne({ _id: addressId, owner: req.user._id });
    if (!address) {
        throw new APIerror(404, "Invalid delivery address");
    }

    const price = gallons * RATE_PER_GALLON;

    const order = await Order.create({
        owner: req.user._id,
        address: addressId,
        gallons,
        price,
        deliveryTime,
        paymentMethod,
        note,
        status: "pending",
        paymentStatus: "pending"
    });

    res.status(201).json(
        new APIresponse(201, order, "Order placed successfully")
    );
});

const getUserOrders = AsyncHandler(async (req, res) => {
    const orders = await Order.find({ owner: req.user._id })
        .populate("address")
        .sort({ createdAt: -1 });

    res.status(200).json(
        new APIresponse(200, orders, "Orders fetched successfully")
    );
});

const getOrderById = AsyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const order = await Order.findOne({ _id: orderId, owner: req.user._id }).populate("address");

    if (!order) {
        throw new APIerror(404, "Order not found or unauthorized");
    }

    res.status(200).json(
        new APIresponse(200, order, "Order fetched successfully")
    );
});

const updateOrder = AsyncHandler(async (req, res) => {
    const validation = updateOrderSchema.safeParse(req.body);
    if (!validation.success) {
        throw new APIerror(400, validation.error.errors[0].message);
    }

    const { orderId } = req.params;
    const order = await Order.findOne({ _id: orderId, owner: req.user._id });

    if (!order) {
        throw new APIerror(404, "Order not found or unauthorized");
    }

    if (order.status !== "pending") {
        throw new APIerror(400, `Cannot update order once it is ${order.status}`);
    }

    // Recalculate price if gallons changed
    if (validation.data.gallons) {
        order.price = validation.data.gallons * RATE_PER_GALLON;
        order.gallons = validation.data.gallons;
    }

    if (validation.data.note !== undefined) {
        order.note = validation.data.note;
    }

    await order.save();

    res.status(200).json(
        new APIresponse(200, order, "Order updated successfully")
    );
});

const cancelOrder = AsyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const order = await Order.findOne({ _id: orderId, owner: req.user._id });

    if (!order) {
        throw new APIerror(404, "Order not found or unauthorized");
    }

    if (order.status === "delivered" || order.status === "cancelled") {
        throw new APIerror(400, `Cannot cancel order as it is already ${order.status}`);
    }

    order.status = "cancelled";
    await order.save();

    res.status(200).json(
        new APIresponse(200, order, "Order cancelled successfully")
    );
});

export { createOrder, getUserOrders, getOrderById, updateOrder, cancelOrder };
