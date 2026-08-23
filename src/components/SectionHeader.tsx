import Reveal from "./Reveal";

interface SectionHeaderProps {
  /** Número de orden editorial: "01", "02"… El único ámbar de la cabecera. */
  index: string;
  label: string;
  title: string;
  /** Segunda línea del titular. Se rompe a propósito, como en un titular de revista. */
  titleSecondLine?: string;
  description?: string;
  className?: string;
}

/**
 * Cabecera de sección editorial.
 *
 * Reemplaza el bloque "eyebrow centrado + H2 centrado con degradé ámbar" que estaba
 * repetido en nueve secciones. Va alineada a la izquierda, numerada, y la regla corre
 * hasta el borde del contenedor para dar el corte horizontal de una página impresa.
 */
const SectionHeader = ({
  index,
  label,
  title,
  titleSecondLine,
  description,
  className = "",
}: SectionHeaderProps) => (
  <Reveal className={className}>
    <div className="flex items-center gap-4 mb-5">
      <span className="data text-primary text-xs font-bold">{index}</span>
      <span className="section-label">{label}</span>
      <span className="flex-1 h-px bg-border" />
    </div>

    <h2 className="font-display text-[2.75rem] leading-[0.9] tracking-[0.01em] sm:text-6xl lg:text-7xl">
      {title}
      {titleSecondLine && (
        <>
          <br />
          <span className="text-muted-foreground">{titleSecondLine}</span>
        </>
      )}
    </h2>

    {description && (
      <p className="font-body text-muted-foreground mt-5 max-w-xl leading-relaxed">
        {description}
      </p>
    )}
  </Reveal>
);

export default SectionHeader;
