import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const facts = [
  { value: "14:30 hs", label: "abierto por día" },
  { value: "3 salas", label: "fuerza · cardio · aeróbica" },
  { value: "Lun a Sáb", label: "sin cortes al mediodía" },
];

const ease = [0.36, 0.6, 0, 1] as const;

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.16]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden"
    >
      {/* Imagen a sangre completa */}
      <div className="absolute inset-0">
        <motion.img
          src={heroBg}
          alt="Sala de entrenamiento de Gimnasio Oxígeno"
          style={{ y: imgY, scale: imgScale }}
          className="absolute inset-0 w-full h-[115%] object-cover object-[60%_center] sm:object-center"
          loading="eager"
        />
        {/* Legibilidad: sombra sólo donde hay texto, la foto respira en el resto */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/75 via-background/10 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background/70 to-transparent" />
        <div className="absolute inset-0 grain-overlay" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative container mx-auto px-4 lg:px-8 pb-12 lg:pb-16 pt-32"
      >
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="section-label mb-5 flex items-center gap-2.5 text-foreground/70"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Gimnasio Oxígeno · Necochea
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.08 }}
            className="font-display text-[2.75rem] sm:text-6xl lg:text-[5.5rem] font-medium leading-[1.02] tracking-[-0.035em] mb-6 [text-shadow:0_2px_40px_hsl(0_0%_0%/0.5)]"
          >
            Abierto cuando
            <br />
            <span className="text-foreground/65">podés entrenar.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="font-body text-lg lg:text-xl text-foreground/80 max-w-lg leading-relaxed mb-9 [text-shadow:0_1px_20px_hsl(0_0%_0%/0.7)]"
          >
            De 7 de la mañana a 9 y media de la noche, de corrido. Vos elegís
            el horario; nosotros ya estamos adentro.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 mb-10 lg:mb-14"
          >
            <a
              href="#membresias"
              className="group bg-foreground text-background font-body font-medium px-7 py-3.5 rounded-full text-[15px] transition-all duration-500 ease-fluid hover:bg-primary hover:text-primary-foreground inline-flex items-center gap-2"
            >
              Ver planes y precios
              <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-fluid group-hover:translate-x-1" />
            </a>
            <a
              href="#instalaciones"
              className="glass-card-hover font-body font-medium px-7 py-3.5 rounded-full text-[15px] text-foreground"
            >
              Recorrer el lugar
            </a>
          </motion.div>
        </div>

        <div className="flex flex-wrap gap-2.5 lg:gap-3">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.5 + i * 0.09 }}
              className="glass-card rounded-full pl-4 pr-5 py-2.5 flex items-baseline gap-2.5"
            >
              <span className="font-display text-base font-medium text-foreground tnum">
                {fact.value}
              </span>
              <span className="font-body text-[13px] text-foreground/60">
                {fact.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
