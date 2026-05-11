import { AnimatePresence, motion } from "motion/react";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { useData } from "../../../hooks/useData";
import type { CreateLigaInput, Liga, UpdateLigaInput } from "../../../types";
import { LigaForm, type LigaFormState } from "./LigaForm";
import { LigaTable } from "./LigaTable";

const defaultLigaForm: LigaFormState = {
  nome: "",
  sigla: "",
  presidente: "",
  ativo: true,
  logo_url: "",
  contato_presidente: "",
  vice_presidente: "",
  contato_vice_presidente: "",
  email: "",
  descricao: "",
};

function trimOrUndefined(value: string): string | undefined {
  const t = value.trim();
  return t === "" ? undefined : t;
}

function formToCreatePayload(form: LigaFormState): CreateLigaInput {
  return {
    nome: form.nome.trim(),
    sigla: form.sigla.trim(),
    presidente: form.presidente.trim(),
    ativo: form.ativo,
    logo_url: trimOrUndefined(form.logo_url),
    contato_presidente: trimOrUndefined(form.contato_presidente),
    vice_presidente: trimOrUndefined(form.vice_presidente),
    contato_vice_presidente: trimOrUndefined(form.contato_vice_presidente),
    email: trimOrUndefined(form.email),
    descricao: trimOrUndefined(form.descricao),
  };
}

function formToUpdatePayload(form: LigaFormState): UpdateLigaInput {
  return formToCreatePayload(form);
}

export function LigaManager() {
  const { ligas, addLiga, updateLiga, deleteLiga } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLiga, setEditingLiga] = useState<Liga | null>(null);
  const [formData, setFormData] = useState<LigaFormState>(defaultLigaForm);

  const openCreateModal = () => {
    setEditingLiga(null);
    setFormData(defaultLigaForm);
    setIsModalOpen(true);
  };

  const openEditModal = (liga: Liga) => {
    setEditingLiga(liga);
    setFormData({
      nome: liga.nome,
      sigla: liga.sigla,
      presidente: liga.presidente,
      ativo: liga.ativo,
      logo_url: liga.logo_url || "",
      contato_presidente: liga.contato_presidente || "",
      vice_presidente: liga.vice_presidente || "",
      contato_vice_presidente: liga.contato_vice_presidente || "",
      email: liga.email || "",
      descricao: liga.descricao || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLiga(null);
    setFormData(defaultLigaForm);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (editingLiga) {
      await updateLiga(editingLiga.id, formToUpdatePayload(formData));
    } else {
      await addLiga(formToCreatePayload(formData));
    }

    closeModal();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Ligas academicas</h1>
        <button
          type="button"
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-primary hover:bg-light-teal text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Adicionar
        </button>
      </div>

      <LigaTable ligas={ligas} onEdit={openEditModal} onDelete={(id) => void deleteLiga(id)} />

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-darkest border border-white/10 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-bold">
                  {editingLiga ? "Editar" : "Adicionar"} Liga
                </h2>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <LigaForm
                formData={formData}
                isEditing={Boolean(editingLiga)}
                onChange={setFormData}
                onSubmit={handleSubmit}
                onCancel={closeModal}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
