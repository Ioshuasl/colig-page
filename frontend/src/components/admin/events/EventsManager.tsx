import { AnimatePresence, motion } from "motion/react";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { useData } from "../../../hooks/useData";
import type { Event } from "../../../types";
import { EventsForm, type EventFormState } from "./EventsForm";
import { EventsTable } from "./EventsTable";

const defaultEventForm: EventFormState = {
  title: "",
  date: "",
  category: "",
  status: "upcoming",
  description: "",
  image: "",
};

export function EventsManager() {
  const { events, addEvent, updateEvent, deleteEvent } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<EventFormState>(defaultEventForm);

  const openCreateModal = () => {
    setEditingEvent(null);
    setFormData(defaultEventForm);
    setIsModalOpen(true);
  };

  const openEditModal = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      category: event.category,
      status: event.status,
      description: event.description,
      image: event.image || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setFormData(defaultEventForm);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (editingEvent) {
      await updateEvent(editingEvent.id, formData);
    } else {
      await addEvent({
        ...formData,
        image: formData.image || "https://picsum.photos/seed/new-event/800/400",
      });
    }

    closeModal();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Eventos</h1>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-primary hover:bg-light-teal text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Adicionar
        </button>
      </div>

      <EventsTable
        events={events}
        onEdit={openEditModal}
        onDelete={(id) => void deleteEvent(id)}
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
                  {editingEvent ? "Editar" : "Adicionar"} Evento
                </h2>
                <button onClick={closeModal} className="text-white/50 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <EventsForm
                formData={formData}
                isEditing={Boolean(editingEvent)}
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
