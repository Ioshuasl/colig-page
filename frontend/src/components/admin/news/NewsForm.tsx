import type { FormEvent } from "react";
import type { CreateNewsInput } from "../../../types";

export type NewsFormState = CreateNewsInput;

interface NewsFormProps {
  formData: NewsFormState;
  isEditing: boolean;
  onChange: (next: NewsFormState) => void;
  onSubmit: (event: FormEvent) => void;
  onCancel: () => void;
}

export function NewsForm({
  formData,
  isEditing,
  onChange,
  onSubmit,
  onCancel,
}: NewsFormProps) {
  return (
    <form onSubmit={onSubmit} className="p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-white/80 mb-1.5">Titulo</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => onChange({ ...formData, title: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-1.5">Data</label>
        <input
          type="date"
          required
          value={formData.date}
          onChange={(e) => onChange({ ...formData, date: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-1.5">Resumo</label>
        <textarea
          required
          value={formData.summary}
          onChange={(e) => onChange({ ...formData, summary: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary h-24 resize-none"
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
