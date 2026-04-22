import { api } from "./api";
import type {
  CreateUserInput,
  PaginatedResponse,
  UpdateUserInput,
  User,
} from "../types";

export interface UserListFilters {
  q?: string;
  name?: string;
  username?: string;
  email?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export const userService = {
  async create(payload: CreateUserInput): Promise<User> {
    const { data } = await api.post<User>("/users", payload);
    return data;
  },

  async findAll(filters: UserListFilters = {}): Promise<PaginatedResponse<User>> {
    const { data } = await api.get<PaginatedResponse<User>>("/users", {
      params: filters,
    });
    return data;
  },

  async findById(id: number): Promise<User> {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  },

  async update(id: number, payload: UpdateUserInput): Promise<User> {
    const { data } = await api.put<User>(`/users/${id}`, payload);
    return data;
  },

  async remove(id: number): Promise<{ success: boolean }> {
    const { data } = await api.delete<{ success: boolean }>(`/users/${id}`);
    return data;
  },
};
