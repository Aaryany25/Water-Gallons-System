import api from "./axios";

export const getOrders = async () => {
  const response = await api.get("/order");
  return response.data;
};

export const getOrderDetails = async (orderId) => {
  const response = await api.get(`/order/${orderId}`);
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await api.post("/order", orderData);
  return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await api.patch(`/order/${orderId}/cancel`);
  return response.data;
};

export const updateOrder = async (orderId, updateData) => {
  const response = await api.patch(`/order/${orderId}`, updateData);
  return response.data;
};

// Admin Operations
export const getAdminOrders = async () => {
  const response = await api.get("/order/admin/all");
  return response.data;
};

export const updateOrderStatus = async (orderId, statusData) => {
  const response = await api.patch(`/order/admin/${orderId}/status`, statusData);
  return response.data;
};
