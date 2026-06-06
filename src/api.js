import axios from "axios";

const api = axios.create({
  baseURL: "https://food-service-s5lq.onrender.com"
});

// Attach JWT automatically
api.interceptors.request.use((config) => {

  const token = localStorage.getItem("jwtToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;