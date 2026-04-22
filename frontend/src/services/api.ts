import axios from "axios";

export const AUTH_TOKEN_KEY = "colig_token";
export const AUTH_USER_KEY = "colig_user";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3333/api";

export const getAuthToken = (): string | null => localStorage.getItem(AUTH_TOKEN_KEY);

export const clearAuthSession = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};

export const api = axios.create({
  baseURL: apiBaseUrl,
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error?.response?.status;
    const isAdminRoute = window.location.pathname.startsWith("/admin");

    if (statusCode === 401 && isAdminRoute) {
      clearAuthSession();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
