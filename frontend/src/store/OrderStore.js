import { create } from "zustand";
import {
  getOrders,
  createOrder,
  cancelOrder,
  getAdminOrders,
  updateOrderStatus
} from "../api/Orderapi";

const useOrderStore = create((set, get) => ({
  orders: [],
  adminOrders: [],
  loading: false,
  error: null,

  fetchUserOrders: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getOrders();
      set({ orders: response.data || [], loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch user orders",
        loading: false
      });
    }
  },

  placeOrder: async (orderData) => {
    try {
      set({ loading: true, error: null });
      const response = await createOrder(orderData);
      await get().fetchUserOrders();
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to place order",
        loading: false
      });
      throw error;
    }
  },

  cancelUserOrder: async (orderId) => {
    try {
      set({ loading: true, error: null });
      await cancelOrder(orderId);
      await get().fetchUserOrders();
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to cancel order",
        loading: false
      });
      throw error;
    }
  },

  fetchAdminOrders: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getAdminOrders();
      set({ adminOrders: response.data || [], loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch admin orders",
        loading: false
      });
    }
  },

  updateOrderStatus: async (orderId, statusData) => {
    try {
      set({ loading: true, error: null });
      await updateOrderStatus(orderId, statusData);
      await get().fetchAdminOrders();
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update order status",
        loading: false
      });
      throw error;
    }
  }
}));

export default useOrderStore;
