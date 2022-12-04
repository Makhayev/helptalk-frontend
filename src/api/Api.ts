import axios from "axios";
import User from "../mobx/user";
import UserType from "../types/User";

export const API_URL = import.meta.env.VITE_VERCEL_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
  }
  return config;
});
//
// api.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status == 401) {
//       try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         const response = await axios.post(`${API_URL}/refresh`, {
//           refreshToken,
//         });
//         console.log(response);
//         const {
//           accessToken,
//           newRefreshToken,
//           email,
//           first_name,
//           last_name,
//           role,
//         } = response.data;
//         localStorage.setItem("accessToken", accessToken);
//         localStorage.setItem("accessToken", newRefreshToken);
//         User.assignUser({
//           name: first_name,
//           surname: last_name,
//           role,
//           isAuth: true,
//           id: email,
//         } as UserType);
//         return api.request(originalRequest);
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   }
// );

export default api;
