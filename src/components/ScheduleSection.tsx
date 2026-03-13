import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";

const schedule = [
  { day: "Lunes a Viernes", hours: "7:00 — 21:30 hs", open: true },
  { day: "Sábados", hours: "8:00 — 14:00 hs", open: true },
  { day: "Domingos", hours: "Cerrado", open: false },
];

const ScheduleSection = () => (
  <section id="horarios" className="py-24 lg:py-32 bg-secondary/30">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="section-label mb-4">HORARIOS</p>
        <h2 className="font-display text-5xl lg:text-6xl tracking-tight">
          HORARIO <span className="text-gradient-amber">CORRIDO</span>
        </h2>
        <p className="font-body text-muted-foreground mt-4 max-w-md mx-auto">
          Vení a entrenar en el horario que mejor te quede. ¡Te esperamos! 💪
        </p>
      </motion.div>

      <div className="max-w-lg mx-auto space-y-4">
        {schedule.map((item, i) => (
          <motion.div
            key={item.day}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card rounded-xl p-6 flex items-center justify-between ${
              !item.open ? "opacity-60" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary shrink-0" />
              <span className="font-display text-xl tracking-wider">{item.day}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className={`font-body text-sm ${item.open ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                {item.hours}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ScheduleSection;
