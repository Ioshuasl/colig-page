import { AnimatePresence, motion } from "motion/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { useAuth } from "../hooks/useAuth";

export function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-bg-deep flex flex-col md:flex-row">
      <AdminSidebar onLogout={handleLogout} />

      <main className="flex-1 p-8 md:p-12 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="max-w-5xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
