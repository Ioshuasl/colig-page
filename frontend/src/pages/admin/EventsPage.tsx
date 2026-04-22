import { motion } from "motion/react";
import { EventsManager } from "../../components/admin/events/EventsManager";

export function EventsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <EventsManager />
    </motion.div>
  );
}
