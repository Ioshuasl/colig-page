import { motion } from "motion/react";
import { Edit2, Trash2 } from "lucide-react";
import type { User } from "../../../types";

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export function UsersTable({ users, isLoading, onEdit, onDelete }: UsersTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-darkest/50 border border-white/10 rounded-2xl overflow-hidden"
    >
      <table className="w-full text-left text-sm">
        <thead className="bg-white/5 border-b border-white/10 text-white/60">
          <tr>
            <th className="px-6 py-4 font-medium">Nome</th>
            <th className="px-6 py-4 font-medium">Username</th>
            <th className="px-6 py-4 font-medium">Email</th>
            <th className="px-6 py-4 font-medium text-right">Acoes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {isLoading && (
            <tr>
              <td className="px-6 py-6 text-white/60" colSpan={4}>
                Carregando usuarios...
              </td>
            </tr>
          )}

          {!isLoading &&
            users.map((user) => (
              <tr key={user.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-medium">{user.name}</td>
                <td className="px-6 py-4 text-white/70">{user.username}</td>
                <td className="px-6 py-4 text-white/70">{user.email}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-2 text-white/50 hover:text-primary transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="p-2 text-white/50 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </motion.div>
  );
}
