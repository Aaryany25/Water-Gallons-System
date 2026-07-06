import { create } from "zustand";
import {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser,
  updateCurrentUser
} from "../api/Authapi";
import { persist } from "zustand/middleware";

const useAuthStore = create(persist((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  register: async (userData) => {
    try {
      set({
        loading: true,
        error: null,
      });
      const response = await registerUser(userData);
      set({
        user: response.data,
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Registration failed",
        loading: false,
      });
      throw error;
    }
  },
  login: async (userData) => {
    try {
      set({
        error: null,
      });
      const response = await loginUser(userData);
      console.log(response);
      const { user, accesstoken } = response.data || {};
      if (accesstoken) {
        localStorage.setItem(
          "accesstoken",
          accesstoken
        );
      }
      set({
        user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Login failed",
        loading: false,
      });
      throw error;
    }
  },
  getUser: async () => {
    try {
      set({
        loading: true,
        error: null,
      });
      const response = await getCurrentUser();
      console.log(response);
      set({
        user: response.data,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      localStorage.removeItem("accesstoken");
      set({
        error:
          error.response?.data?.message ||
          "Failed to fetch user",
        loading: false,
        isAuthenticated: false,
        user: null,
      });
    }
  },
  logout: async () => {
    try {
      set({ loading: true, error: null });
      await logoutUser();
      localStorage.removeItem("accesstoken");
      set({ user: null, isAuthenticated: false, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Logout failed",
        loading: false,
      });
      throw error;
    }
  },
  updateUser: async (userData) => {
    try {
      set({ loading: true, error: null });
      await updateCurrentUser(userData);
      const response = await getCurrentUser();
      set({ user: response.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update user profile",
        loading: false,
      });
      throw error;
    }
  },
}), { name: 'auth-store' }));

export default useAuthStore;