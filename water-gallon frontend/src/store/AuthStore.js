import { create } from "zustand";
import {
  loginUser,
  registerUser,
  AllUser
} from "../api/Authapi";

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  register: async (userData) => {
    try {

      set({
        loading: true,
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
        loading: true,
        error: null,
      });

      const data = await loginUser(userData);

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
  alluser:async (userData)=>{
    try {
         set({
        loading: true,
        error: null,
      });

      const data = await AllUser(userData);
console.log("this is being called from AuthStore ",data.data)
      set({
        users: data.data,
        loading: false,
      });
    } catch (error) {
         set({
        error: error.response.data.message,
        loading: false,
      });

    }
  }
}));

export default useAuthStore;