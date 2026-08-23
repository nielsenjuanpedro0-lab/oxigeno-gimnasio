import { motion, useReducedMotion } from "framer-motion";
import heroBg from "@/assets/hero-bg-clean.jpg";

const stats = [
  { value: "2.385", label: "Miembros activos" },
  { value: "07—21:30", label: "Lunes a viernes" },
  { value: "58 y 75", label: "Necochea" },
];

const HeroSection = () => {
  const reduced = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 lg:pb-24"
    >
      <div className="absolute inset-0">
        {/*
          hero-bg.jpg original es un flyer de Instagram con el logo y un claim
          quemados en la imagen, que competían con el titular. Se usa un recorte de
          la banda central, que es foto limpia.
        */}
        <img
          src={heroBg}
          alt="Interior del Gimnasio Oxígeno"
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
        {/* Scrim vertical: asienta el bloque de texto sobre la foto. */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/30" />
        {/* Scrim lateral: garantiza contraste del titular, que va alineado a la izquierda. */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent lg:via-background/40" />
        <div className="absolute inset-0 grain-overlay" />
      </div>

      <div className="container relative">
        <motion.p {...rise(0.1)} className="section-label mb-6">
          Gimnasio Oxígeno — Necochea
        </motion.p>

        <motion.h1
          {...rise(0.2)}
          className="font-display text-[3.25rem] leading-[0.86] tracking-[0.01em] sm:text-8xl lg:text-[8.5rem] xl:text-[10rem]"
        >
          MÁS QUE
          <br />
          UN GIMNASIO
        </motion.h1>

        <motion.p
          {...rise(0.3)}
          className="font-body text-lg text-muted-foreground mt-7 max-w-md leading-relaxed"
        >
          Fuerza, comunidad y resultados reales. Tu mejor versión empieza acá.
        </motion.p>

        <motion.div {...rise(0.4)} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#membresias" className="btn-primary btn-lg">
            Ver membresías
          </a>
          <a href="#instalaciones" className="btn-secondary btn-lg">
            Conocer el gimnasio
          </a>
        </motion.div>

        {/* Datos duros en fila, separados por reglas. Antes eran píldoras de vidrio. */}
        <motion.dl
          {...rise(0.55)}
          className="mt-16 grid grid-cols-1 border-t border-border sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-border py-5 sm:border-b-0 sm:border-r sm:pr-6 sm:last:border-r-0 sm:[&:not(:first-child)]:pl-6"
            >
              <dt className="data text-2xl text-primary leading-none">{stat.value}</dt>
              <dd className="section-label mt-2">{stat.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
};

export default HeroSection;
