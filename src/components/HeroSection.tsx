import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/hero-bg-clean.webp";
import heroBgSm from "@/assets/hero-bg-clean@sm.webp";
import Picture from "./Picture";
import RevealText from "./RevealText";
import CountUp from "./CountUp";

const stats = [
  { count: 2385, label: "Miembros activos" },
  { value: "07—21:30", label: "Lunes a viernes" },
  { value: "58 y 75", label: "Necochea" },
];

const HeroSection = () => {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  /*
   * Paralaje: la foto se desplaza menos que el scroll y se oscurece al salir. Da
   * sensación de profundidad sin mover nada del contenido, y como solo interpola
   * transform y opacity corre en el compositor.
   */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fotoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fotoEscala = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contenidoY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contenidoOpacidad = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const rise = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-14 pt-28 lg:pb-20"
    >
      <m.div
        className="absolute inset-0"
        style={reduced ? undefined : { y: fotoY, scale: fotoEscala }}
      >
        {/*
          hero-bg.jpg original es un flyer de Instagram con el logo y un claim
          quemados en la imagen, que competían con el titular. Se usa un recorte de
          la banda central, que es foto limpia.
        */}
        <Picture
          src={heroBg}
          srcSmall={heroBgSm}
          alt="Interior del Gimnasio Oxígeno en Necochea"
          width={1440}
          height={1026}
          sizes="100vw"
          priority
          className="h-full w-full object-cover object-center"
        />
        {/* Scrim vertical: asienta el bloque de texto sobre la foto. */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/45" />
        {/* Scrim lateral: garantiza contraste del titular, alineado a la izquierda. */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/65 to-transparent lg:via-background/45" />
        <div className="absolute inset-0 grain-overlay" />
      </m.div>

      <m.div
        className="container relative"
        style={reduced ? undefined : { y: contenidoY, opacity: contenidoOpacidad }}
      >
        <m.p {...rise(0.15)} className="section-label text-primary mb-6">
          Gimnasio Oxígeno · Necochea
        </m.p>

        {/*
          La línea de marca, con la palabra final en ámbar sólido — el recurso que
          usa el gimnasio en sus piezas. El problema del diseño original no era el
          énfasis en color sino que iba en degradé y centrado en cada sección.
          A 10rem desbordaba en pantallas angostas; 5.5rem sostiene sin gritar.
        */}
        <RevealText
          as="h1"
          accent="gimnasio"
          trigger="mount"
          delay={0.2}
          className="max-w-4xl font-display text-[3rem] uppercase leading-[0.92] sm:text-7xl lg:text-[5.5rem]"
        >
          Más que un
        </RevealText>

        <m.p
          {...rise(0.35)}
          className="font-body text-[1.0625rem] text-muted-foreground mt-7 max-w-md leading-relaxed"
        >
          Fuerza, comunidad y resultados reales. Tu mejor versión empieza acá.
        </m.p>

        <m.div {...rise(0.45)} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#membresias" className="btn-primary btn-lg">
            Ver membresías
          </a>
          <a href="#instalaciones" className="btn-secondary btn-lg">
            Conocer el gimnasio
          </a>
        </m.div>

        {/* Datos duros en fila, separados por reglas. */}
        <m.dl
          {...rise(0.6)}
          className="mt-16 grid grid-cols-1 border-t border-border/70 sm:grid-cols-3 lg:mt-20"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-border/70 py-5 sm:border-b-0 sm:border-r sm:border-border/70 sm:pr-6 sm:last:border-r-0 sm:[&:not(:first-child)]:pl-8"
            >
              <dt className="data font-display text-2xl text-foreground leading-none">
                {stat.count ? <CountUp value={stat.count} /> : stat.value}
              </dt>
              <dd className="section-label text-muted-foreground mt-2.5 !tracking-[0.14em]">{stat.label}</dd>
            </div>
          ))}
        </m.dl>
      </m.div>
    </section>
  );
};

export default HeroSection;
