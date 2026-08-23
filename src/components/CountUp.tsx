import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  /** Valor final. El formato se aplica con Intl, para respetar el separador local. */
  value: number;
  className?: string;
  durationMs?: number;
}

/**
 * Conteo ascendente al entrar en pantalla.
 *
 * Se usa en una sola cifra de la página —la de socios—: aplicado a todos los números
 * se vuelve ruido. La curva es de desaceleración, así que el número frena al llegar
 * en vez de cortarse de golpe.
 *
 * El valor final se escribe en el DOM desde el primer frame para quien tenga
 * prefers-reduced-motion, y el elemento lleva el número real como texto accesible.
 */
const CountUp = ({ value, className = "", durationMs = 1600 }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const enPantalla = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [actual, setActual] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!enPantalla || reduced) return;

    let frame = 0;
    const inicio = performance.now();

    const tick = (ahora: number) => {
      const t = Math.min((ahora - inicio) / durationMs, 1);
      // easeOutExpo: arranca rápido y se asienta, en vez de avanzar parejo.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setActual(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [enPantalla, reduced, value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {new Intl.NumberFormat("es-AR").format(actual)}
    </span>
  );
};

export default CountUp;
