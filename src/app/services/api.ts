import axios from "axios";

const API_URL = "https://backend-stashify-production.up.railway.app";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Kirim cookies otomatis
});

// ✅ Interceptor untuk menangani error token expired
api.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response?.status === 401) {
      alert("Session expired! Please log in again."); // Ganti pesan sesuai keinginan
      localStorage.removeItem("token"); // Hapus token di localStorage
      window.location.href = "/"; // Redirect ke login
    }
    return Promise.reject(error);
  }
);

export default api;
