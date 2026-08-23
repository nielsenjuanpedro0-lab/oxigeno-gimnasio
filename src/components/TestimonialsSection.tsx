import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const testimonials = [
  {
    name: "Martín G.",
    quote:
      "Desde que entreno en Oxígeno cambió mi estilo de vida. La comunidad te empuja a dar el máximo.",
    rating: 5,
  },
  {
    name: "Lucía P.",
    quote: "Las clases grupales son increíbles. Nunca me aburrí de entrenar acá.",
    rating: 5,
  },
  {
    name: "Santiago R.",
    quote: "El mejor equipamiento de Necochea, lejos. Los profes son de otro nivel.",
    rating: 5,
  },
  {
    name: "Valentina M.",
    quote:
      "Arranqué sin saber nada y hoy entreno 5 veces por semana. Oxígeno es familia.",
    rating: 4,
  },
  {
    name: "Federico L.",
    quote:
      "La zona de fuerza es brutal. Tienen todo lo que necesitás para progresar de verdad.",
    rating: 5,
  },
];

/**
 * Testimonios como citas tipográficas.
 *
 * Se eliminó el carrusel automático: usaba un setInterval cada 30ms que empujaba
 * scrollLeft y competía con el gesto del dedo en mobile — al intentar leer, el
 * contenido se movía solo. Ahora es una grilla estática que se lee a su ritmo.
 *
 * La puntuación pasa de cinco íconos de estrella por testimonio (50 en total) a un
 * dato en mono.
 */
const TestimonialsSection = () => (
  <section className="py-24 lg:py-36">
    <div className="container">
      <SectionHeader label="Testimonios" title="LO QUE DICE LA COMUNIDAD" />

      <div className="mt-16 grid gap-x-16 gap-y-2 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i < 3 ? i * 0.06 : 0.18}>
            <figure className="border-t border-border py-8">
              <blockquote className="font-body text-[1.0625rem] leading-[1.65] text-foreground/85">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-baseline gap-4">
                <span className="font-body text-sm font-medium">{t.name}</span>
                <span className="data text-xs text-muted-foreground">{t.rating}/5</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
