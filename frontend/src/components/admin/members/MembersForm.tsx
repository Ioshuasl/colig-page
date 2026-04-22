import type { FormEvent } from "react";
import type { CreateMemberInput } from "../../../types";
import { MediaUploader } from "../../shared/MediaUploader";

export type MemberFormState = CreateMemberInput;

interface MembersFormProps {
  formData: MemberFormState;
  isEditing: boolean;
  onChange: (next: MemberFormState) => void;
  onSubmit: (event: FormEvent) => void;
  onCancel: () => void;
}

export function MembersForm({
  formData,
  isEditing,
  onChange,
  onSubmit,
  onCancel,
}: MembersFormProps) {
  return (
    <form onSubmit={onSubmit} className="p-6 space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
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
            <label className="block text-sm font-medium text-white/80 mb-1.5">Cargo</label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => onChange({ ...formData, role: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1.5">Descricao</label>
            <textarea
              value={formData.description || ""}
              onChange={(e) => onChange({ ...formData, description: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary h-32 resize-none"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <MediaUploader
            media={formData.image || ""}
            onMediaChange={(url) => onChange({ ...formData, image: url })}
            acceptedFormats="image/png,image/jpeg,image/webp"
            folder="uploads/members"
            label="Foto do membro"
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
