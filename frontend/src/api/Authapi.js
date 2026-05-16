import api from "./axios";

export const registerUser = async (userData) => {
  const response = await api.post(
    "/user/register",
    userData
  );

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post(
    "/user/login",
    userData
  );

  return response.data;
};

export const getCurrentUser=async(userData)=>{
    const response =await api.get("/user/me",userData);
    return response.data
}