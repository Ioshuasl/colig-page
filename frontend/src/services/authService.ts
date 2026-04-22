import { api, AUTH_TOKEN_KEY, AUTH_USER_KEY, clearAuthSession } from "./api";
import type { LoginInput, LoginResponse, User } from "../types";

export const authService = {
  async login(payload: LoginInput): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("/users/login", payload);

    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));

    return data;
  },

  async logout(): Promise<void> {
    try {
      await api.post("/users/logout");
    } finally {
      clearAuthSession();
    }
  },

  getStoredUser(): User | null {
    const rawUser = localStorage.getItem(AUTH_USER_KEY);
    if (!rawUser) {
      return null;
    }

    try {
      return JSON.parse(rawUser) as User;
    } catch {
      return null;
    }
  },
};
