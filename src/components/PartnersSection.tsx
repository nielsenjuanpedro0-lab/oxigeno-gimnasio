import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

/**
 * Sport Club y Hype Fitness.
 *
 * Ambos están destacados en el Instagram del gimnasio pero no figuraban en la web.
 * El acuerdo con Sport Club es un argumento de venta concreto —hay socios que ya
 * pueden entrenar sin pagar de nuevo y no lo saben— y merecía sección propia.
 *
 * Estructura de dos paneles enfrentados: distinta a cualquier otra sección de la
 * página, que es el punto.
 */
const partners = [
  {
    name: "Sport Club",
    kicker: "Convenio",
    body: "Si sos socio de Sport Club con membresía Plus, Total o Corporativa, entrenás en Oxígeno sin cargo adicional.",
    handle: "@sportcluboficial",
    url: "https://www.instagram.com/sportcluboficial",
    cta: "Consultar convenio",
  },
  {
    name: "Hype Fitness",
    kicker: "Showroom",
    body: "El showroom de Hype Fitness funciona dentro del gimnasio.",
    handle: "@hypefitness.arg",
    url: "https://www.instagram.com/hypefitness.arg",
    cta: "Ver el showroom",
  },
];

const PartnersSection = () => (
  <section id="convenios" className="bg-surface-2 py-24 lg:py-36">
    <div className="container">
      <SectionHeader
        label="Con nosotros"
        title="CONVENIOS Y"
        accent="SHOWROOM"
        align="center"
      />

      <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
        {partners.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <div className="flex h-full flex-col bg-background p-8 lg:p-12">
              <p className="section-label text-primary">{p.kicker}</p>

              <h3 className="mt-5 font-display text-[2rem] uppercase leading-none sm:text-4xl">
                {p.name}
              </h3>

              <p className="mt-5 flex-1 font-body text-[0.9375rem] leading-relaxed text-muted-foreground">
                {p.body}
              </p>

              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary btn-md mt-8 self-start"
              >
                {p.cta}
              </a>

              <p className="mt-5 font-body text-sm text-muted-foreground">{p.handle}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default PartnersSection;
