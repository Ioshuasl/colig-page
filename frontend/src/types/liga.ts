export interface Liga {
  id: number;
  nome: string;
  logo_url: string | null;
  sigla: string;
  ativo: boolean;
  presidente: string;
  contato_presidente: string | null;
  vice_presidente: string | null;
  contato_vice_presidente: string | null;
  email: string | null;
  descricao: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLigaInput {
  nome: string;
  sigla: string;
  presidente: string;
  ativo?: boolean;
  logo_url?: string | null;
  contato_presidente?: string | null;
  vice_presidente?: string | null;
  contato_vice_presidente?: string | null;
  email?: string | null;
  descricao?: string | null;
}

export interface UpdateLigaInput {
  nome?: string;
  sigla?: string;
  presidente?: string;
  ativo?: boolean;
  logo_url?: string | null;
  contato_presidente?: string | null;
  vice_presidente?: string | null;
  contato_vice_presidente?: string | null;
  email?: string | null;
  descricao?: string | null;
}
