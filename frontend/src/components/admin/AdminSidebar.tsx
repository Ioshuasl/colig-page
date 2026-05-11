import { Calendar, GraduationCap, LayoutDashboard, LogOut, Newspaper, ShieldUser, Users } from "lucide-react";
import { motion } from "motion/react";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";
import logoColig from "../../assets/logo_colig.png";

interface AdminSidebarProps {
  onLogout: () => Promise<void>;
}

const links = [
  { to: "/admin", label: "Visao geral", icon: LayoutDashboard },
  { to: "/admin/members", label: "Membros", icon: Users },
  { to: "/admin/events", label: "Eventos", icon: Calendar },
  { to: "/admin/news", label: "Noticias", icon: Newspaper },
  { to: "/admin/ligas", label: "Ligas", icon: GraduationCap },
  { to: "/admin/users", label: "Usuarios", icon: ShieldUser },
];

export function AdminSidebar({ onLogout }: AdminSidebarProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full md:w-64 bg-darkest border-r border-white/10 p-6 flex flex-col"
    >
      <div className="flex items-center gap-2 mb-12">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-primary/30 bg-black/50 ring-1 ring-primary/20">
          <img
            src={logoColig}
            alt=""
            className="h-6 w-6 object-contain"
            decoding="async"
          />
        </div>
        <span className="font-bold tracking-tight">Admin COLIG</span>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/20 text-primary"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => void onLogout()}
        className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl text-sm font-medium transition-colors mt-auto"
      >
        <LogOut className="w-4 h-4" /> Sair
      </button>
    </motion.aside>
  );
}
