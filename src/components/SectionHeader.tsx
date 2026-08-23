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
  className = "",
}: SectionHeaderProps) => (
  <Reveal className={className}>
    <div className="flex items-center gap-5 mb-6">
      <span className="section-label text-primary shrink-0">{label}</span>
      <span className="flex-1 h-px bg-border" />
    </div>

    <h2 className="font-display text-[2.25rem] uppercase leading-[0.95] sm:text-5xl lg:text-[3.5rem]">
      {title}
      {accent && <> <span className="text-primary">{accent}</span></>}
    </h2>

    {description && (
      <p className="font-body text-[0.9375rem] text-muted-foreground mt-6 max-w-lg leading-relaxed">
        {description}
      </p>
    )}
  </Reveal>
);

export default SectionHeader;
