import { motion } from "motion/react";
import { MembersManager } from "../../components/admin/members/MembersManager";

export function MembersPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <MembersManager />
    </motion.div>
  );
}
