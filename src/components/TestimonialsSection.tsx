import { motion } from "framer-motion";

const ease = [0.36, 0.6, 0, 1] as const;

const testimonials = [
  {
    name: "Martín G.",
    meta: "2 años entrenando",
    quote:
      "Vengo a las 7 antes del trabajo y todavía no me pasó tener que esperar una máquina. Ese era mi miedo cuando me cambié.",
  },
  {
    name: "Federico L.",
    meta: "Plan Black",
    quote:
      "Que no cierren al mediodía me resolvió el año. Entreno en mi hora de almuerzo y vuelvo a la oficina.",
  },
  {
    name: "Lucía P.",
    meta: "G.A.P, martes y jueves",
    quote:
      "Entré para hacer dos clases por semana y terminé viniendo cuatro. El grupo tira.",
  },
  {
    name: "Santiago R.",
    meta: "1 año entrenando",
    quote:
      "Los profes te corrigen sin que se lo pidas. Aprendí a hacer peso muerto acá, después de años haciéndolo mal.",
  },
  {
    name: "Valentina M.",
    meta: "Empezó de cero",
    quote:
      "Arranqué sin haber pisado un gimnasio en mi vida. Nadie me miró raro ni una sola vez.",
  },
];

const TestimonialsSection = () => (
  <section className="py-20 lg:py-32 overflow-hidden">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease }}
        className="max-w-2xl mb-12 lg:mb-16"
      >
        <p className="section-label mb-4">Socios</p>
        <h2 className="font-display text-4xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.05]">
          Lo dicen mejor ellos
        </h2>
      </motion.div>
    </div>

    <div className="relative group/marquee">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 lg:w-32 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 lg:w-32 z-10 bg-gradient-to-l from-background to-transparent" />

      <div className="flex w-max gap-4 lg:gap-5 animate-marquee group-hover/marquee:[animation-play-state:paused] px-4 lg:px-8">
        {[...testimonials, ...testimonials].map((t, i) => (
          <figure
            key={i}
            className={`surface rounded-4xl lg:rounded-5xl p-7 lg:p-9 flex flex-col justify-between shrink-0 ${
              i % testimonials.length % 2 === 0
                ? "w-[320px] lg:w-[420px]"
                : "w-[300px] lg:w-[360px]"
            }`}
          >
            <blockquote className="font-body text-[15px] lg:text-base text-foreground/80 leading-relaxed mb-7">
              {t.quote}
            </blockquote>
            <figcaption className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-surface-3 flex items-center justify-center font-display text-[13px] font-medium text-foreground/80">
                {t.name[0]}
              </span>
              <span className="flex flex-col">
                <span className="font-body text-[15px] text-foreground">{t.name}</span>
                <span className="font-body text-[13px] text-muted-foreground">{t.meta}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
