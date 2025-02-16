import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://localhost:5000", // Replace with your API base URL
  baseURL:"https://detroit-backend-main.vercel.app",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
