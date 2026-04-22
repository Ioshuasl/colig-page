import { AnimatePresence, motion } from "motion/react";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { useData } from "../../../hooks/useData";
import type { CreateNewsInput, News } from "../../../types";
import { NewsForm, type NewsFormState } from "./NewsForm";
import { NewsTable } from "./NewsTable";

const defaultNewsForm: NewsFormState = {
  title: "",
  date: "",
  summary: "",
};

export function NewsManager() {
  const { news, addNews, updateNews, deleteNews } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [formData, setFormData] = useState<NewsFormState>(defaultNewsForm);

  const openCreateModal = () => {
    setEditingNews(null);
    setFormData(defaultNewsForm);
    setIsModalOpen(true);
  };

  const openEditModal = (item: News) => {
    setEditingNews(item);
    setFormData({
      title: item.title,
      date: item.date,
      summary: item.summary,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNews(null);
    setFormData(defaultNewsForm);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (editingNews) {
      await updateNews(editingNews.id, formData);
    } else {
      await addNews(formData);
    }

    closeModal();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Noticias</h1>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-primary hover:bg-light-teal text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Adicionar
        </button>
      </div>

      <NewsTable
        news={news}
        onEdit={openEditModal}
        onDelete={(id) => void deleteNews(id)}
      />

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-darkest border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-bold">
                  {editingNews ? "Editar" : "Adicionar"} Noticia
                </h2>
                <button onClick={closeModal} className="text-white/50 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <NewsForm
                formData={formData}
                isEditing={Boolean(editingNews)}
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
