export interface News {
  id: number;
  title: string;
  date: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNewsInput {
  title: string;
  date: string;
  summary: string;
}

export interface UpdateNewsInput {
  title?: string;
  date?: string;
  summary?: string;
}
