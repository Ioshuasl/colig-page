import { motion } from "motion/react";
import { UsersManager } from "../../components/admin/users/UsersManager";

export function UsersPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <UsersManager />
    </motion.div>
  );
}
