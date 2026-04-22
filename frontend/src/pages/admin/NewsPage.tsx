import { motion } from "motion/react";
import { NewsManager } from "../../components/admin/news/NewsManager";

export function NewsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <NewsManager />
    </motion.div>
  );
}
