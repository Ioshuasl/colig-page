import { api } from "./api";
import type {
  CreateNewsInput,
  News,
  PaginatedResponse,
  UpdateNewsInput,
} from "../types";

export interface NewsListFilters {
  q?: string;
  title?: string;
  date?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export const newsService = {
  async create(payload: CreateNewsInput): Promise<News> {
    const { data } = await api.post<News>("/news", payload);
    return data;
  },

  async findAll(filters: NewsListFilters = {}): Promise<PaginatedResponse<News>> {
    const { data } = await api.get<PaginatedResponse<News>>("/news", {
      params: filters,
    });
    return data;
  },

  async findById(id: number): Promise<News> {
    const { data } = await api.get<News>(`/news/${id}`);
    return data;
  },

  async update(id: number, payload: UpdateNewsInput): Promise<News> {
    const { data } = await api.put<News>(`/news/${id}`, payload);
    return data;
  },

  async remove(id: number): Promise<{ success: boolean }> {
    const { data } = await api.delete<{ success: boolean }>(`/news/${id}`);
    return data;
  },
};
