import { motion } from "motion/react";
import { LigaManager } from "../../components/admin/ligas/LigaManager";

export function LigasPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <LigaManager />
    </motion.div>
  );
}
