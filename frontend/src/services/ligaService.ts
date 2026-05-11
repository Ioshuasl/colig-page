import { api } from "./api";
import type {
  CreateLigaInput,
  Liga,
  PaginatedResponse,
  UpdateLigaInput,
} from "../types";

export interface LigaListFilters {
  q?: string;
  nome?: string;
  sigla?: string;
  ativo?: boolean;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "updatedAt" | "nome" | "sigla" | "ativo";
  sortOrder?: "ASC" | "DESC";
}

export const ligaService = {
  async create(payload: CreateLigaInput): Promise<Liga> {
    const { data } = await api.post<Liga>("/ligas", payload);
    return data;
  },

  async findAll(filters: LigaListFilters = {}): Promise<PaginatedResponse<Liga>> {
    const { data } = await api.get<PaginatedResponse<Liga>>("/ligas", {
      params: filters,
    });
    return data;
  },

  async findById(id: number): Promise<Liga> {
    const { data } = await api.get<Liga>(`/ligas/${id}`);
    return data;
  },

  async update(id: number, payload: UpdateLigaInput): Promise<Liga> {
    const { data } = await api.put<Liga>(`/ligas/${id}`, payload);
    return data;
  },

  /** Multipart: campo `file` (imagem), mesma rota do backend. */
  async uploadLogo(id: number, file: File): Promise<Liga> {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await api.post<Liga>(`/ligas/${id}/logo`, formData);
    return data;
  },

  async remove(id: number): Promise<{ success: boolean }> {
    const { data } = await api.delete<{ success: boolean }>(`/ligas/${id}`);
    return data;
  },
};
