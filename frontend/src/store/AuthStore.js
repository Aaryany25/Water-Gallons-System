import { create } from "zustand";
import {
  loginUser,
  registerUser,
  getCurrentUser
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
        // loading: true,
        error: null,
      });

      const data = await registerUser(userData);

      set({
        user: data.user,
        loading: false,
      });

    } catch (error) {

      set({
        error: error.response.data.message,
        loading: false,
      });

    }
  },
login: async (userData) => {
  try {

    set({
      // loading: true,
      error: null,
    });

    const response = await loginUser(userData);

    console.log(response);

    const { user, accesstoken } = response;

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

    const data = await getCurrentUser();

    console.log(data);

    set({
      user: data.user,
      isAuthenticated: true,
      loading: false,
    });

  } catch (error) {

    set({
      error:
        error.response?.data?.message ||
        "Failed to fetch user",
      loading: false,
    });

    throw error;
  }
},
})));

export default useAuthStore;