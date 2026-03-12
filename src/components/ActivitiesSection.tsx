import { motion } from "framer-motion";
import { Dumbbell, Heart, Zap, Bike, Users, Leaf } from "lucide-react";

const activities = [
  { icon: Dumbbell, title: "Sala de Fuerza", desc: "Peso libre y máquinas de última generación" },
  { icon: Heart, title: "Aeróbicos", desc: "Clases grupales de alta energía" },
  { icon: Zap, title: "Funcional", desc: "Entrenamiento funcional y crossfit" },
  { icon: Bike, title: "Cardio", desc: "Zona completa de equipos cardiovasculares" },
  { icon: Users, title: "Clases Grupales", desc: "Spinning, zumba, body pump y más" },
  { icon: Leaf, title: "Yoga & Stretching", desc: "Flexibilidad, movilidad y recuperación" },
];

const ActivitiesSection = () => (
  <section id="actividades" className="py-24 lg:py-32 bg-secondary/30">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="section-label mb-4">ACTIVIDADES</p>
        <h2 className="font-display text-5xl lg:text-6xl tracking-tight">
          NUESTRAS <span className="text-gradient-amber">ACTIVIDADES</span>
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-hover rounded-xl p-8 group"
          >
            <a.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="font-display text-2xl tracking-wide mb-2">{a.title}</h3>
            <p className="font-body text-sm text-muted-foreground">{a.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ActivitiesSection;
