// lib/api.ts
import axios from "axios";
import { useAuthStore } from "@/lib/store/authStore"; 
import Router from "next/router";

const api = axios.create({
  baseURL: "/api", // proxy route in Next.js
  withCredentials: true, // send cookies
});

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // token expired or unauthorized
      const { clearAuth } = useAuthStore.getState();
      clearAuth();
      Router.push("/auth/signin");
    }
    return Promise.reject(error);
  }
);

export default api;
