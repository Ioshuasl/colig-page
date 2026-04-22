import { api } from "./api";
import type {
  CreateMemberInput,
  Member,
  PaginatedResponse,
  UpdateMemberInput,
} from "../types";

export interface MemberListFilters {
  q?: string;
  name?: string;
  role?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export const memberService = {
  async create(payload: CreateMemberInput): Promise<Member> {
    const { data } = await api.post<Member>("/members", payload);
    return data;
  },

  async findAll(filters: MemberListFilters = {}): Promise<PaginatedResponse<Member>> {
    const { data } = await api.get<PaginatedResponse<Member>>("/members", {
      params: filters,
    });
    return data;
  },

  async findById(id: number): Promise<Member> {
    const { data } = await api.get<Member>(`/members/${id}`);
    return data;
  },

  async update(id: number, payload: UpdateMemberInput): Promise<Member> {
    const { data } = await api.put<Member>(`/members/${id}`, payload);
    return data;
  },

  async remove(id: number): Promise<{ success: boolean }> {
    const { data } = await api.delete<{ success: boolean }>(`/members/${id}`);
    return data;
  },
};
