export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface UpdateUserInput {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
}

export interface LoginInput {
  identifier?: string;
  email?: string;
  username?: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
