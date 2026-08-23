import { motion, useReducedMotion } from "framer-motion";
import gymWall from "@/assets/gym-5.jpg";

/**
 * Franja de manifiesto.
 *
 * Rompe el ritmo: va a sangre completa, sin contenedor, con una sola línea de texto
 * grande sobre foto. Entre dos secciones de contenido denso funciona como respiro y
 * evita que la página sea ocho bloques con la misma estructura.
 *
 * El texto es la línea de la bio de Instagram del gimnasio.
 */
const StatementBand = () => {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={gymWall}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover grayscale"
          loading="lazy"
        />
        {/*
          Velo fuerte y desaturado: la foto acá es textura de fondo, no protagonista.
          Sin esto el ámbar del titular competía con los grises claros del equipamiento.
        */}
        <div className="absolute inset-0 bg-background/90" />
        <div className="absolute inset-0 grain-overlay" />
      </div>

      <div className="container relative py-24 lg:py-36">
        <motion.p
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center font-display text-[2rem] uppercase leading-[0.95] sm:text-5xl lg:text-[4rem]"
        >
          Somos más que un <span className="text-primary">gimnasio</span>
        </motion.p>
      </div>
    </section>
  );
};

export default StatementBand;
