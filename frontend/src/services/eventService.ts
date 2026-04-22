import { api } from "./api";
import type {
  CreateEventInput,
  Event,
  EventStatus,
  PaginatedResponse,
  UpdateEventInput,
} from "../types";

export interface EventListFilters {
  q?: string;
  title?: string;
  category?: string;
  status?: EventStatus;
  date?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export const eventService = {
  async create(payload: CreateEventInput): Promise<Event> {
    const { data } = await api.post<Event>("/events", payload);
    return data;
  },

  async findAll(filters: EventListFilters = {}): Promise<PaginatedResponse<Event>> {
    const { data } = await api.get<PaginatedResponse<Event>>("/events", {
      params: filters,
    });
    return data;
  },

  async findById(id: number): Promise<Event> {
    const { data } = await api.get<Event>(`/events/${id}`);
    return data;
  },

  async update(id: number, payload: UpdateEventInput): Promise<Event> {
    const { data } = await api.put<Event>(`/events/${id}`, payload);
    return data;
  },

  async remove(id: number): Promise<{ success: boolean }> {
    const { data } = await api.delete<{ success: boolean }>(`/events/${id}`);
    return data;
  },
};
