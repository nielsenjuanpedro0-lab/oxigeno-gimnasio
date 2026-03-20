import { motion } from "framer-motion";
import { Dumbbell, Heart, Zap, Bike, Users, Leaf, Instagram, MapPin, Calendar, Clock, DollarSign, AlertTriangle } from "lucide-react";

const activities = [
  { icon: Dumbbell, title: "Sala de Fuerza", desc: "Peso libre y máquinas de última generación" },
  { icon: Heart, title: "Aeróbicos", desc: "Clases grupales de alta energía" },
  { icon: Bike, title: "Cardio", desc: "Zona completa de equipos cardiovasculares" },
  { icon: Users, title: "Clases Grupales", desc: "Spinning, zumba, body pump y más" },
  { icon: Leaf, title: "Yoga & Stretching", desc: "Flexibilidad, movilidad y recuperación" },
];

const featuredClasses = [
  {
    title: "Funcional 360",
    emoji: "🏋🏽‍♀️",
    description: "Entrenamiento grupal guiado",
    coach: "@poma_ocr_trail",
    instagram: "@funcional_trail_360",
    instagramUrl: "https://www.instagram.com/funcional_trail_360",
    location: "Gym Oxígeno – Sala de aeróbica",
    address: "Calle 58 y 75 – Toledo",
    days: "Lun. / Mié. / Vie.",
    hours: "8:00, 18:30 y 19:30 hs (17:00 hs desde mayo)",
    pricing: [
      { label: "2 x semana", price: "$45.000" },
      { label: "3 x semana", price: "$55.000" },
    ],
    limited: true,
  },
  {
    title: "G.A.P",
    emoji: "🏋🏽‍♀️",
    description: "Entrenamiento grupal femenino",
    coach: "@belunatural.fit",
    instagram: "@belunatural.fit",
    instagramUrl: "https://www.instagram.com/belunatural.fit",
    location: "Gym Oxígeno – Sala de aeróbica",
    address: "Calle 58 y 75 – Toledo",
    days: "Martes y Jueves",
    hours: "14:00 y 19:00 hs",
    pricing: [
      { label: "Cuota mensual", price: "$50.000" },
    ],
    limited: true,
  },
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

      {/* General activities grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
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

      {/* Featured classes */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="section-label mb-4">CLASES ESPECIALES</p>
        <h3 className="font-display text-4xl lg:text-5xl tracking-tight">
          ENTRENÁ CON <span className="text-gradient-amber">PROFES</span>
        </h3>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {featuredClasses.map((cls, i) => (
          <motion.div
            key={cls.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 transition-colors duration-500"
          >
            {/* Header */}
            <div className="bg-primary/10 px-6 py-4 border-b border-primary/20">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-2xl tracking-wider text-foreground">
                  {cls.emoji} {cls.title}
                </h4>
                {cls.limited && (
                  <span className="flex items-center gap-1 text-xs font-body font-semibold text-accent uppercase tracking-wider">
                    <AlertTriangle className="w-3 h-3" /> Cupos limitados
                  </span>
                )}
              </div>
              <p className="font-body text-sm text-muted-foreground mt-1">{cls.description}</p>
            </div>

            {/* Details */}
            <div className="px-6 py-5 space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="font-body text-sm text-foreground">{cls.days}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="font-body text-sm text-foreground">{cls.hours}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="font-body text-sm text-foreground block">{cls.location}</span>
                  <span className="font-body text-xs text-muted-foreground">{cls.address}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Instagram className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="font-body text-xs text-muted-foreground block">Profe: {cls.coach}</span>
                  <a
                    href={cls.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-primary hover:underline"
                  >
                    {cls.instagram}
                  </a>
                </div>
              </div>

              {/* Pricing */}
              <div className="pt-3 border-t border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">Cuota mensual</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {cls.pricing.map((p) => (
                    <div key={p.label} className="bg-secondary/50 rounded-lg px-4 py-2">
                      <span className="font-display text-lg text-primary">{p.price}</span>
                      <span className="font-body text-xs text-muted-foreground block">{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ActivitiesSection;
