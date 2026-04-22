import { AnimatePresence, motion } from "motion/react";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { useData } from "../../../hooks/useData";
import type { Member } from "../../../types";
import { MembersForm, type MemberFormState } from "./MembersForm";
import { MembersTable } from "./MembersTable";

const defaultMemberForm: MemberFormState = {
  name: "",
  role: "",
  description: "",
  image: "",
};

export function MembersManager() {
  const { members, addMember, updateMember, deleteMember } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState<MemberFormState>(defaultMemberForm);

  const openCreateModal = () => {
    setEditingMember(null);
    setFormData(defaultMemberForm);
    setIsModalOpen(true);
  };

  const openEditModal = (member: Member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      description: member.description || "",
      image: member.image || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
    setFormData(defaultMemberForm);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (editingMember) {
      await updateMember(editingMember.id, formData);
    } else {
      await addMember({
        ...formData,
        image: formData.image || "https://picsum.photos/seed/new-member/400/400",
      });
    }

    closeModal();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Membros</h1>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-primary hover:bg-light-teal text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Adicionar
        </button>
      </div>

      <MembersTable
        members={members}
        onEdit={openEditModal}
        onDelete={(id) => void deleteMember(id)}
      />

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
                  {editingMember ? "Editar" : "Adicionar"} Membro
                </h2>
                <button onClick={closeModal} className="text-white/50 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <MembersForm
                formData={formData}
                isEditing={Boolean(editingMember)}
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
