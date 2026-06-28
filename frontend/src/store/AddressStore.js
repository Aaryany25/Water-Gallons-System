import { create } from "zustand";
import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress
} from "../api/Addressapi";

const useAddressStore = create((set, get) => ({
  addresses: [],
  defaultAddress: null,
  loading: false,
  error: null,

  fetchAddresses: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getAddresses();
      const addrList = response.data || [];
      const defAddr = addrList.find(addr => addr.isDefault) || null;
      set({
        addresses: addrList,
        defaultAddress: defAddr,
        loading: false
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch addresses",
        loading: false
      });
    }
  },

  addAddress: async (addressData) => {
    try {
      set({ loading: true, error: null });
      await createAddress(addressData);
      await get().fetchAddresses();
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to add address",
        loading: false
      });
      throw error;
    }
  },

  editAddress: async (addressId, addressData) => {
    try {
      set({ loading: true, error: null });
      await updateAddress(addressId, addressData);
      await get().fetchAddresses();
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update address",
        loading: false
      });
      throw error;
    }
  },

  removeAddress: async (addressId) => {
    try {
      set({ loading: true, error: null });
      await deleteAddress(addressId);
      await get().fetchAddresses();
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete address",
        loading: false
      });
      throw error;
    }
  },

  setDefault: async (addressId) => {
    try {
      set({ loading: true, error: null });
      await setDefaultAddress(addressId);
      await get().fetchAddresses();
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to set default address",
        loading: false
      });
      throw error;
    }
  }
}));

export default useAddressStore;
