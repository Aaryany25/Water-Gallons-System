import axios from "axios";

const api = axios.create({
  baseURL: "api/v1",
  withCredentials: true, // for cookies/auth
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default api;