import Reveal from "./Reveal";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
}

/**
 * Cabecera de sección.
 *
 * Sin numeración: el "01 / 02.1" de la versión anterior leía como documento técnico.
 * Queda una etiqueta discreta, una regla fina y el titular en caja baja con tracking
 * negativo. El titular es notablemente más chico que antes — en una página premium el
 * peso lo da el espacio alrededor del texto, no el cuerpo de la tipografía.
 */
const SectionHeader = ({ label, title, description, className = "" }: SectionHeaderProps) => (
  <Reveal className={className}>
    <div className="flex items-center gap-5 mb-8">
      <span className="section-label text-muted-foreground shrink-0">{label}</span>
      <span className="flex-1 h-px bg-border" />
    </div>

    <h2 className="font-display text-[1.75rem] font-medium leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
      {title}
    </h2>

    {description && (
      <p className="font-body text-[0.9375rem] text-muted-foreground mt-5 max-w-lg leading-relaxed">
        {description}
      </p>
    )}
  </Reveal>
);

export default SectionHeader;
