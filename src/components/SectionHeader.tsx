import Reveal from "./Reveal";

interface SectionHeaderProps {
  label: string;
  title: string;
  /**
   * Palabra final resaltada en ámbar. Es el recurso de las piezas del gimnasio en
   * Instagram, pero se usa con cuentagotas: si aparece en cada titular deja de ser
   * énfasis y se vuelve plantilla. Reservado para el hero y las secciones que venden.
   */
  accent?: string;
  description?: string;
  /** Centrada se usa en una o dos secciones, para quebrar el eje izquierdo dominante. */
  align?: "left" | "center";
  className?: string;
}

/**
 * Cabecera de sección.
 *
 * Etiqueta en ámbar y condensada, regla al ancho, y titular en Archivo pesada en
 * mayúsculas. Sin numeración: el "01 / 02.1" leía documento técnico.
 *
 * Lo que hacía ver generada la versión original no era el color de marca sobre una
 * palabra, sino el degradé de ámbar a amarillo sobre el texto y la repetición del
 * mismo bloque centrado en nueve secciones seguidas.
 */
const SectionHeader = ({
  label,
  title,
  accent,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) => {
  const centered = align === "center";

  return (
    <Reveal className={className}>
      <div className={`flex items-center gap-5 mb-6 ${centered ? "justify-center" : ""}`}>
        {centered && <span className="h-px w-12 bg-border" />}
        <span className="section-label text-primary shrink-0">{label}</span>
        <span className={`h-px bg-border ${centered ? "w-12" : "flex-1"}`} />
      </div>

      <h2
        className={`font-display text-[2.25rem] uppercase leading-[0.95] sm:text-5xl lg:text-[3.5rem] ${
          centered ? "text-center" : ""
        }`}
      >
        {title}
        {accent && <> <span className="text-primary">{accent}</span></>}
      </h2>

      {description && (
        <p
          className={`font-body text-[0.9375rem] text-muted-foreground mt-6 max-w-lg leading-relaxed ${
            centered ? "mx-auto text-center" : ""
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
};

export default SectionHeader;
