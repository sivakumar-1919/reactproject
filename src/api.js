import axios from "axios";

const api = axios.create({
  baseURL: "http://54.227.32.25"
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