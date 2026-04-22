import { motion } from "motion/react";
import { Edit2, Trash2 } from "lucide-react";
import type { News } from "../../../types";

interface NewsTableProps {
  news: News[];
  onEdit: (item: News) => void;
  onDelete: (id: number) => void;
}

export function NewsTable({ news, onEdit, onDelete }: NewsTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-darkest/50 border border-white/10 rounded-2xl overflow-hidden"
    >
      <table className="w-full text-left text-sm">
        <thead className="bg-white/5 border-b border-white/10 text-white/60">
          <tr>
            <th className="px-6 py-4 font-medium">Titulo</th>
            <th className="px-6 py-4 font-medium">Data</th>
            <th className="px-6 py-4 font-medium text-right">Acoes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {news.map((item) => (
            <tr key={item.id} className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4 font-medium">{item.title}</td>
              <td className="px-6 py-4 text-white/70">
                {new Date(item.date).toLocaleDateString("pt-BR")}
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 text-white/50 hover:text-primary transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
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
