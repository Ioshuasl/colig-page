export interface Member {
  id: number;
  name: string;
  role: string;
  description: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMemberInput {
  name: string;
  role: string;
  description?: string | null;
  image?: string | null;
}

export interface UpdateMemberInput {
  name?: string;
  role?: string;
  description?: string | null;
  image?: string | null;
}
