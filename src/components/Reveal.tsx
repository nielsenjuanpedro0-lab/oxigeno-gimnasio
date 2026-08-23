import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Escalonado en segundos. Se usa con moderación: como mucho tres pasos. */
  delay?: number;
}

/**
 * Único patrón de entrada de la página.
 *
 * Antes había cuatro variantes distintas (fade-up, slide desde izquierda, slide desde
 * derecha, scale) repartidas en 17 elementos, cada una con su propio delay encadenado.
 * El resultado era una página que se movía sola de arriba a abajo.
 *
 * Con `prefers-reduced-motion` el contenido aparece directamente, sin desplazamiento.
 */
const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
  const reduced = useReducedMotion();

  // Con reduced-motion no hay animación de entrada: el contenido está desde el inicio.
  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
