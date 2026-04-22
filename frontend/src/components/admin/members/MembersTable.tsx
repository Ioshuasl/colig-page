import { motion } from "motion/react";
import { Edit2, Trash2 } from "lucide-react";
import type { Member } from "../../../types";

interface MembersTableProps {
  members: Member[];
  onEdit: (member: Member) => void;
  onDelete: (id: number) => void;
}

export function MembersTable({ members, onEdit, onDelete }: MembersTableProps) {
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
            <th className="px-6 py-4 font-medium">Cargo</th>
            <th className="px-6 py-4 font-medium text-right">Acoes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {members.map((member) => (
            <tr key={member.id} className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4 flex items-center gap-3">
                <img
                  src={member.image || "https://picsum.photos/seed/default-member/400/400"}
                  alt={member.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                {member.name}
              </td>
              <td className="px-6 py-4 text-white/70">{member.role}</td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onEdit(member)}
                  className="p-2 text-white/50 hover:text-primary transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(member.id)}
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
