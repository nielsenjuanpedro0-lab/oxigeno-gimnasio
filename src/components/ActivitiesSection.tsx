import { motion } from "framer-motion";
import { Dumbbell, Heart, Bike, Users, Leaf, Instagram, Calendar, Clock, MapPin } from "lucide-react";
import { usePayment } from "@/contexts/PaymentContext";

const activities = [
  { icon: Dumbbell, title: "Sala de Fuerza", desc: "Peso libre y máquinas de última generación" },
  { icon: Heart, title: "Aeróbicos", desc: "Clases grupales de alta energía" },
  { icon: Bike, title: "Cardio", desc: "Zona completa de equipos cardiovasculares" },
  { icon: Users, title: "Clases Grupales", desc: "Spinning, zumba, body pump y más" },
  { icon: Leaf, title: "Yoga & Stretching", desc: "Flexibilidad, movilidad y recuperación" },
];

const featuredClasses = [
  {
    title: "FUNCIONAL 360",
    subtitle: "Entrenamiento grupal guiado",
    coach: "Profe: @poma_ocr_trail",
    instagramHandle: "@funcional_trail_360",
    instagramUrl: "https://www.instagram.com/funcional_trail_360",
    days: "Lun · Mié · Vie",
    hours: "8:00 · 18:30 · 19:30 hs",
    hoursNote: "17:00 hs desde mayo",
    location: "Sala de aeróbica · Calle 58 y 75",
    pricing: [
      { label: "2x sem", price: "$45.000", priceNum: 45000 },
      { label: "3x sem", price: "$55.000", priceNum: 55000 },
    ],
  },
  {
    title: "G.A.P",
    subtitle: "Entrenamiento grupal femenino",
    coach: "Profe: @belunatural.fit",
    instagramHandle: "@belunatural.fit",
    instagramUrl: "https://www.instagram.com/belunatural.fit",
    days: "Mar · Jue",
    hours: "14:00 · 19:00 hs",
    hoursNote: null,
    location: "Sala de aeróbica · Calle 58 y 75",
    pricing: [
      { label: "Mensual", price: "$50.000", priceNum: 50000 },
    ],
  },
];

const ActivitiesSection = () => {
  const { openPayment } = usePayment();

  return (
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
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
          className="text-center mb-14"
        >
          <p className="section-label mb-4">CLASES ESPECIALES</p>
          <h3 className="font-display text-4xl lg:text-5xl tracking-tight">
            ENTRENÁ CON <span className="text-gradient-amber">PROFES</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {featuredClasses.map((cls, i) => (
            <motion.div
              key={cls.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="group relative"
            >
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

              <div className="glass-card rounded-2xl pt-8 pb-6 px-7 hover:border-primary/20 border border-border/30 transition-all duration-500">
                <div className="flex items-baseline justify-between mb-1">
                  <h4 className="font-display text-3xl tracking-wider text-foreground">
                    {cls.title}
                  </h4>
                  <span className="font-body text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
                    Cupos limitados
                  </span>
                </div>
                <p className="font-body text-sm text-muted-foreground mb-6">{cls.subtitle}</p>

                <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-primary/70" />
                    <span className="font-body text-xs text-foreground/80">{cls.days}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-primary/70" />
                    <span className="font-body text-xs text-foreground/80">{cls.hours}</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-primary/70 shrink-0" />
                    <span className="font-body text-xs text-foreground/80">{cls.location}</span>
                  </div>
                </div>

                {cls.hoursNote && (
                  <p className="font-body text-[11px] text-muted-foreground/70 italic mb-5">
                    * {cls.hoursNote}
                  </p>
                )}

                {/* Pricing pills as buttons */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  {cls.pricing.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => openPayment({
                        name: `${cls.title} (${p.label})`,
                        price: p.price.replace("$", ""),
                        priceNum: p.priceNum,
                      })}
                      className="flex items-baseline gap-1.5 bg-primary/5 border border-primary/10 rounded-full px-4 py-1.5 hover:bg-primary/15 hover:border-primary/30 transition-all duration-300 cursor-pointer"
                    >
                      <span className="font-display text-lg text-primary leading-none">{p.price}</span>
                      <span className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">{p.label}</span>
                    </button>
                  ))}
                </div>

                {/* Inscribite button */}
                <button
                  onClick={() => openPayment({
                    name: `${cls.title} (${cls.pricing[cls.pricing.length - 1].label})`,
                    price: cls.pricing[cls.pricing.length - 1].price.replace("$", ""),
                    priceNum: cls.pricing[cls.pricing.length - 1].priceNum,
                  })}
                  className="w-full bg-accent/10 border border-accent/20 text-accent font-body font-semibold text-sm py-2.5 rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-300 mb-4"
                >
                  Inscribirme →
                </button>

                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                  <span className="font-body text-xs text-muted-foreground">{cls.coach}</span>
                  <a
                    href={cls.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-body text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    {cls.instagramHandle}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
