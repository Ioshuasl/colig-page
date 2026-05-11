import { motion } from "motion/react";
import { Edit2, Trash2 } from "lucide-react";
import type { Liga } from "../../../types";

interface LigaTableProps {
  ligas: Liga[];
  onEdit: (liga: Liga) => void;
  onDelete: (id: number) => void;
}

export function LigaTable({ ligas, onEdit, onDelete }: LigaTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-darkest/50 border border-white/10 rounded-2xl overflow-hidden"
    >
      <table className="w-full text-left text-sm">
        <thead className="bg-white/5 border-b border-white/10 text-white/60">
          <tr>
            <th className="px-6 py-4 font-medium">Liga</th>
            <th className="px-6 py-4 font-medium">Sigla</th>
            <th className="px-6 py-4 font-medium">Presidente</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium text-right">Acoes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {ligas.map((liga) => (
            <tr key={liga.id} className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      liga.logo_url ||
                      `https://picsum.photos/seed/liga-logo-${liga.id}/80/80`
                    }
                    alt={liga.nome}
                    className="w-8 h-8 rounded-lg object-cover border border-white/10 shrink-0"
                  />
                  <span className="font-medium text-white">{liga.nome}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-white/70 uppercase tracking-wide">{liga.sigla}</td>
              <td className="px-6 py-4 text-white/70">{liga.presidente}</td>
              <td className="px-6 py-4">
                <span
                  className={
                    liga.ativo
                      ? "inline-flex rounded-lg bg-emerald-500/15 text-emerald-400 px-2.5 py-1 text-xs font-medium"
                      : "inline-flex rounded-lg bg-white/10 text-white/50 px-2.5 py-1 text-xs font-medium"
                  }
                >
                  {liga.ativo ? "Ativa" : "Inativa"}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  type="button"
                  onClick={() => onEdit(liga)}
                  className="p-2 text-white/50 hover:text-primary transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(liga.id)}
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
