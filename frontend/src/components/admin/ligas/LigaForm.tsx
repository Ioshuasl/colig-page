import type { FormEvent } from "react";
import { MediaUploader } from "../../shared/MediaUploader";

export interface LigaFormState {
  nome: string;
  sigla: string;
  presidente: string;
  ativo: boolean;
  logo_url: string;
  contato_presidente: string;
  vice_presidente: string;
  contato_vice_presidente: string;
  email: string;
  descricao: string;
}

interface LigaFormProps {
  formData: LigaFormState;
  isEditing: boolean;
  onChange: (next: LigaFormState) => void;
  onSubmit: (event: FormEvent) => void;
  onCancel: () => void;
}

export function LigaForm({
  formData,
  isEditing,
  onChange,
  onSubmit,
  onCancel,
}: LigaFormProps) {
  return (
    <form onSubmit={onSubmit} className="p-6 space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">
                Nome <span className="text-primary" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                required
                aria-required="true"
                value={formData.nome}
                onChange={(e) => onChange({ ...formData, nome: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">
                Sigla <span className="text-primary" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                required
                aria-required="true"
                value={formData.sigla}
                onChange={(e) => onChange({ ...formData, sigla: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1.5">
              Presidente <span className="text-primary" aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              required
              aria-required="true"
              value={formData.presidente}
              onChange={(e) => onChange({ ...formData, presidente: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <input
              id="liga-ativo"
              type="checkbox"
              checked={formData.ativo}
              onChange={(e) => onChange({ ...formData, ativo: e.target.checked })}
              className="h-4 w-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary/50"
            />
            <label htmlFor="liga-ativo" className="text-sm font-medium text-white/80 cursor-pointer">
              Liga ativa
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">Contato presidente</label>
              <input
                type="text"
                value={formData.contato_presidente}
                onChange={(e) => onChange({ ...formData, contato_presidente: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">Vice-presidente</label>
              <input
                type="text"
                value={formData.vice_presidente}
                onChange={(e) => onChange({ ...formData, vice_presidente: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">Contato vice-presidente</label>
              <input
                type="text"
                value={formData.contato_vice_presidente}
                onChange={(e) => onChange({ ...formData, contato_vice_presidente: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => onChange({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1.5">Descricao</label>
            <textarea
              value={formData.descricao}
              onChange={(e) => onChange({ ...formData, descricao: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary h-32 resize-none"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <MediaUploader
            media={formData.logo_url || ""}
            onMediaChange={(url) => onChange({ ...formData, logo_url: url })}
            acceptedFormats="image/png,image/jpeg,image/webp"
            folder="uploads/ligas"
            label="Logo da liga"
            className="h-full"
          />
        </div>
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
