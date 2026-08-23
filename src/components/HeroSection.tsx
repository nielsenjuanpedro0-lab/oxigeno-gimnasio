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
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-14 pt-28 lg:pb-20"
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
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/88 to-background/45" />
        {/* Scrim lateral: garantiza contraste del titular, alineado a la izquierda. */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/65 to-transparent lg:via-background/45" />
        <div className="absolute inset-0 grain-overlay" />
      </div>

      <div className="container relative">
        <motion.p {...rise(0.15)} className="section-label text-primary mb-6">
          Gimnasio Oxígeno · Necochea
        </motion.p>

        {/*
          La línea de marca, con la palabra final en ámbar sólido — el recurso que
          usa el gimnasio en sus piezas. El problema del diseño original no era el
          énfasis en color sino que iba en degradé y centrado en cada sección.
          A 10rem desbordaba en pantallas angostas; 5.5rem sostiene sin gritar.
        */}
        <motion.h1
          {...rise(0.25)}
          className="max-w-4xl font-display text-[3rem] uppercase leading-[0.92] sm:text-7xl lg:text-[5.5rem]"
        >
          Más que un <span className="text-primary">gimnasio</span>
        </motion.h1>

        <motion.p
          {...rise(0.35)}
          className="font-body text-[1.0625rem] text-muted-foreground mt-7 max-w-md leading-relaxed"
        >
          Fuerza, comunidad y resultados reales. Tu mejor versión empieza acá.
        </motion.p>

        <motion.div {...rise(0.45)} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#membresias" className="btn-primary btn-lg">
            Ver membresías
          </a>
          <a href="#instalaciones" className="btn-secondary btn-lg">
            Conocer el gimnasio
          </a>
        </motion.div>

        {/* Datos duros en fila, separados por reglas. */}
        <motion.dl
          {...rise(0.6)}
          className="mt-16 grid grid-cols-1 border-t border-border/70 sm:grid-cols-3 lg:mt-20"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-border/70 py-5 sm:border-b-0 sm:border-r sm:border-border/70 sm:pr-6 sm:last:border-r-0 sm:[&:not(:first-child)]:pl-8"
            >
              <dt className="data font-display text-2xl text-foreground leading-none">
                {stat.value}
              </dt>
              <dd className="section-label text-muted-foreground mt-2.5 !tracking-[0.14em]">{stat.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
};

export default HeroSection;
