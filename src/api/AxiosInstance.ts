import axios from "axios";

// const url = "https://helptalk-backend.up.railway.app/";
// export const API_URL = "http://localhost:5431";
export const API_URL = "https://helptalk-backend.up.railway.app";
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

axiosInstance.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    config.headers["Content-Type"] = "application/json";
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

export default axiosInstance;
