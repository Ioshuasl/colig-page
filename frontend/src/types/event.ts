export type EventStatus = "upcoming" | "past";

export interface Event {
  id: number;
  title: string;
  date: string;
  category: string;
  status: EventStatus;
  description: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventInput {
  title: string;
  date: string;
  category: string;
  status: EventStatus;
  description: string;
  image?: string | null;
}

export interface UpdateEventInput {
  title?: string;
  date?: string;
  category?: string;
  status?: EventStatus;
  description?: string;
  image?: string | null;
}
