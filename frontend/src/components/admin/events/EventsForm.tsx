import type { FormEvent } from "react";
import type { CreateEventInput, EventStatus } from "../../../types";
import { MediaUploader } from "../../shared/MediaUploader";

export type EventFormState = CreateEventInput;

interface EventsFormProps {
  formData: EventFormState;
  isEditing: boolean;
  onChange: (next: EventFormState) => void;
  onSubmit: (event: FormEvent) => void;
  onCancel: () => void;
}

export function EventsForm({
  formData,
  isEditing,
  onChange,
  onSubmit,
  onCancel,
}: EventsFormProps) {
  return (
    <form onSubmit={onSubmit} className="p-6 space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
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

          <div className="grid grid-cols-2 gap-4">
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
              <label className="block text-sm font-medium text-white/80 mb-1.5">Status</label>
              <select
                value={formData.status}
                onChange={(e) => onChange({ ...formData, status: e.target.value as EventStatus })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary"
              >
                <option value="upcoming">Proximo</option>
                <option value="past">Realizado</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1.5">Categoria</label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => onChange({ ...formData, category: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1.5">Descricao</label>
            <textarea
              required
              value={formData.description}
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
            folder="uploads/events"
            label="Imagem do evento"
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
