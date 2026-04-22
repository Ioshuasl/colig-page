import { Calendar, Newspaper, ShieldUser, Users } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useData } from "../hooks/useData";

const quickLinks = [
  {
    title: "Membros",
    description: "Gerencie os representantes da diretoria.",
    to: "/admin/members",
    icon: Users,
  },
  {
    title: "Eventos",
    description: "Organize eventos e mantenha o calendario atualizado.",
    to: "/admin/events",
    icon: Calendar,
  },
  {
    title: "Noticias",
    description: "Publique comunicados e atualizacoes institucionais.",
    to: "/admin/news",
    icon: Newspaper,
  },
  {
    title: "Usuarios",
    description: "Controle acessos administrativos da plataforma.",
    to: "/admin/users",
    icon: ShieldUser,
  },
];

export function AdminDashboard() {
  const { members, events, news } = useData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
        <p className="text-white/60">
          Utilize os modulos abaixo para gerenciar o conteudo da landing page.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-darkest/50 border border-white/10 rounded-2xl p-6"
        >
          <p className="text-white/60 text-sm">Membros cadastrados</p>
          <p className="text-3xl font-bold mt-2">{members.length}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-darkest/50 border border-white/10 rounded-2xl p-6"
        >
          <p className="text-white/60 text-sm">Eventos cadastrados</p>
          <p className="text-3xl font-bold mt-2">{events.length}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-darkest/50 border border-white/10 rounded-2xl p-6"
        >
          <p className="text-white/60 text-sm">Noticias publicadas</p>
          <p className="text-3xl font-bold mt-2">{news.length}</p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {quickLinks.map(({ title, description, to, icon: Icon }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + index * 0.04 }}
          >
            <Link
              to={to}
              className="block bg-darkest/50 border border-white/10 rounded-2xl p-6 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <h2 className="font-semibold text-lg">{title}</h2>
              </div>
              <p className="text-white/60 text-sm">{description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
