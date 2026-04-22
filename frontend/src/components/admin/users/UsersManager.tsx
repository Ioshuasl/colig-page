import { AnimatePresence, motion } from "motion/react";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { userService } from "../../../services";
import type { CreateUserInput, UpdateUserInput, User } from "../../../types";
import { UsersForm, type UserFormState } from "./UsersForm";
import { UsersTable } from "./UsersTable";

const defaultUserForm: UserFormState = {
  name: "",
  username: "",
  email: "",
  password: "",
};

export function UsersManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormState>(defaultUserForm);

  const loadUsers = async () => {
    const response = await userService.findAll({ page: 1, limit: 100, sortBy: "createdAt" });
    setUsers(response.data);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await loadUsers();
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUsers();
  }, []);

  const openCreateModal = () => {
    setEditingUser(null);
    setFormData(defaultUserForm);
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      username: user.username,
      email: user.email,
      password: "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setFormData(defaultUserForm);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (editingUser) {
      const payload: UpdateUserInput = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
      };

      if (formData.password) {
        payload.password = formData.password;
      }

      const updatedUser = await userService.update(editingUser.id, payload);
      setUsers((prev) => prev.map((item) => (item.id === editingUser.id ? updatedUser : item)));
    } else {
      const payload: CreateUserInput = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      const createdUser = await userService.create(payload);
      setUsers((prev) => [createdUser, ...prev]);
    }

    closeModal();
  };

  const handleDelete = async (id: number) => {
    await userService.remove(id);
    setUsers((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-primary hover:bg-light-teal text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Adicionar
        </button>
      </div>

      <UsersTable
        users={users}
        isLoading={isLoading}
        onEdit={openEditModal}
        onDelete={(id) => void handleDelete(id)}
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
                  {editingUser ? "Editar" : "Adicionar"} Usuario
                </h2>
                <button onClick={closeModal} className="text-white/50 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <UsersForm
                formData={formData}
                isEditing={Boolean(editingUser)}
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
