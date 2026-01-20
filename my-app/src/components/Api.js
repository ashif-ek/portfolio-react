import axios from "axios";

// Local URL (Use for development)
// const Api = axios.create({
//   baseURL: "http://localhost:5000/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// Production URL (Use for live deployment)
// Production URL (Use for live deployment)
export const BASE_URL = "https://portfolio-server-35.onrender.com";

const Api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the auth token
Api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Api;