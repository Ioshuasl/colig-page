import type { FormEvent } from "react";

export type UserFormState = {
  name: string;
  username: string;
  email: string;
  password: string;
};

interface UsersFormProps {
  formData: UserFormState;
  isEditing: boolean;
  onChange: (next: UserFormState) => void;
  onSubmit: (event: FormEvent) => void;
  onCancel: () => void;
}

export function UsersForm({
  formData,
  isEditing,
  onChange,
  onSubmit,
  onCancel,
}: UsersFormProps) {
  return (
    <form onSubmit={onSubmit} className="p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-white/80 mb-1.5">Nome</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => onChange({ ...formData, name: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-1.5">Username</label>
        <input
          type="text"
          required
          value={formData.username}
          onChange={(e) => onChange({ ...formData, username: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-1.5">Email</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => onChange({ ...formData, email: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-1.5">
          Senha {isEditing ? "(opcional)" : ""}
        </label>
        <input
          type="password"
          required={!isEditing}
          value={formData.password}
          onChange={(e) => onChange({ ...formData, password: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary"
        />
      </div>

      <div className="pt-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl text-sm font-medium bg-primary hover:bg-light-teal text-white transition-colors"
        >
          {isEditing ? "Salvar" : "Criar"}
        </button>
      </div>
    </form>
  );
}
