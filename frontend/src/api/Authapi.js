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

export const getCurrentUser=async()=>{
    const response =await api.get("/user/me");
    return response.data
}

export const logoutUser = async () => {
  const response = await api.post("/user/logout");
  return response.data;
};

export const updateCurrentUser = async (userData) => {
  const response = await api.patch("/user/edit", userData);
  return response.data;
};

export const fetchAllUsers = async () => {
  const response = await api.get("/user/alluser");
  return response.data;
};