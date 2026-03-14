import { motion } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";

const stats = [
  { value: "2,385", label: "Miembros" },
  { value: "Sala de", label: "Fuerza" },
  { value: "Actividades", label: "Aeróbicas" },
];

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Gimnasio Oxígeno interior" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
        <div className="absolute inset-0 grain-overlay" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 pt-20">
        <div className="max-w-4xl flex flex-col items-start">
          <motion.img
            src={logo}
            alt="Oxígeno Gym"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-28 sm:h-40 lg:h-56 w-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="font-body text-lg lg:text-xl text-muted-foreground max-w-xl mb-10"
          >
            Fuerza, comunidad y resultados reales. Tu mejor versión empieza aquí.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#membresias"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-[0_0_30px_hsl(355_72%_56%/0.4)] inline-flex items-center gap-2"
            >
              Comenzar ahora <span>→</span>
            </a>
            <a
              href="#instalaciones"
              className="border border-border hover:border-primary/50 text-foreground font-body font-medium px-8 py-4 rounded-full text-lg transition-all duration-300 inline-flex items-center gap-2 hover:bg-secondary"
            >
              <Play className="w-4 h-4 text-primary" /> Ver instalaciones
            </a>
          </motion.div>
        </div>

        {/* Floating stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16 lg:mt-24 flex flex-wrap gap-4 lg:gap-6"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-xl px-6 py-4 flex items-center gap-3"
            >
              <span className="font-display text-2xl text-primary">{stat.value}</span>
              <span className="font-body text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="w-6 h-6 text-primary/60" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
