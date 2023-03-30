import axios from "axios";

export const API_URL = "https://helptalk-backend.onrender.com";
const index = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

index.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default index;
