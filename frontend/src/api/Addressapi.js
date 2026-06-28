import api from "./axios";

export const getAddresses = async () => {
  const response = await api.get("/address");
  return response.data;
};

export const createAddress = async (addressData) => {
  const response = await api.post("/address", addressData);
  return response.data;
};

export const updateAddress = async (addressId, addressData) => {
  const response = await api.patch(`/address/${addressId}`, addressData);
  return response.data;
};

export const deleteAddress = async (addressId) => {
  const response = await api.delete(`/address/${addressId}`);
  return response.data;
};

export const setDefaultAddress = async (addressId) => {
  const response = await api.put(`/address/${addressId}/default`);
  return response.data;
};
