import { m, useReducedMotion } from "framer-motion";

interface RevealTextProps {
  children: string;
  /** Palabra final resaltada, para no perder el énfasis de marca al partir el texto. */
  accent?: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  delay?: number;
  /** "view" anima al entrar en pantalla; "mount", apenas se monta (hero). */
  trigger?: "view" | "mount";
}

/**
 * Revelado de titular palabra por palabra.
 *
 * Cada palabra sube desde detrás de una máscara. El ojo sigue la lectura de izquierda a
 * derecha en vez de recibir el bloque entero de golpe.
 *
 * El disparador va en el contenedor, no en cada palabra, y las palabras heredan el
 * estado por variantes. Ponerlo en la palabra no funciona: arranca desplazada fuera de
 * su máscara con overflow oculto, y el observador de intersección respeta el recorte de
 * los ancestros — la palabra se escondía del observador que tenía que revelarla, así que
 * el titular nunca aparecía.
 *
 * Solo anima transform, así que corre en el compositor y no fuerza recálculo de layout.
 * Con prefers-reduced-motion devuelve el texto plano, sin envoltorios ni animación.
 */
const RevealText = ({
  children,
  accent,
  as = "h2",
  className = "",
  delay = 0,
  trigger = "view",
}: RevealTextProps) => {
  const reduced = useReducedMotion();
  const Tag = as;

  const palabras = children.split(" ");
  const todas = accent ? [...palabras, accent] : palabras;
  const indiceAccent = accent ? todas.length - 1 : -1;
  const textoCompleto = accent ? `${children} ${accent}` : children;

  if (reduced) {
    return (
      <Tag className={className}>
        {children}
        {accent && (
          <>
            {" "}
            <span className="text-primary">{accent}</span>
          </>
        )}
      </Tag>
    );
  }

  const contenedor = {
    oculto: {},
    visible: { transition: { staggerChildren: 0.055, delayChildren: delay } },
  };

  const palabra = {
    oculto: { y: "110%" },
    visible: {
      y: 0,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  /*
   * aria-label lleva el texto completo y las palabras van como contenido real:
   * duplicarlo en un span sr-only más otro aria-hidden hacía que un rastreador
   * leyera el titular dos veces.
   */
  return (
    <Tag className={className} aria-label={textoCompleto}>
      <m.span
        variants={contenedor}
        initial="oculto"
        {...(trigger === "mount"
          ? { animate: "visible" }
          : { whileInView: "visible", viewport: { once: true, margin: "-60px" } })}
      >
        {todas.map((p, i) => (
          <span
            key={`${p}-${i}`}
            // La máscara recorta la palabra mientras sube: sin overflow oculto el
            // desplazamiento se ve como un salto en vez de una aparición.
            className="inline-block overflow-hidden align-bottom"
          >
            <m.span
              variants={palabra}
              className={`inline-block ${i === indiceAccent ? "text-primary" : ""}`}
            >
              {p}
            </m.span>
            {i < todas.length - 1 && "\u00A0"}
          </span>
        ))}
      </m.span>
    </Tag>
  );
};

export default RevealText;
