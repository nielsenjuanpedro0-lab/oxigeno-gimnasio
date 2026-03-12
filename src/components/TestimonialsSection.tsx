import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Martín G.", quote: "Desde que entreno en Oxígeno cambió mi estilo de vida. La comunidad te empuja a dar el máximo.", rating: 5 },
  { name: "Lucía P.", quote: "Las clases grupales son increíbles. Nunca me aburrí de entrenar acá.", rating: 5 },
  { name: "Santiago R.", quote: "El mejor equipamiento de Necochea, lejos. Los profes son de otro nivel.", rating: 5 },
  { name: "Valentina M.", quote: "Arranqué sin saber nada y hoy entreno 5 veces por semana. Oxígeno es familia.", rating: 4 },
  { name: "Federico L.", quote: "La zona de fuerza es brutal. Tienen todo lo que necesitás para progresar de verdad.", rating: 5 },
];

const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const interval = setInterval(() => {
      if (!paused) {
        el.scrollLeft += 1;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
          el.scrollLeft = 0;
        }
      }
    }, 30);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">TESTIMONIOS</p>
          <h2 className="font-display text-5xl lg:text-6xl tracking-tight">
            LO QUE DICE NUESTRA <span className="text-gradient-amber">COMUNIDAD</span>
          </h2>
        </motion.div>
      </div>

      <div
        ref={scrollRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-4 lg:px-8 pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {[...testimonials, ...testimonials].map((t, i) => (
          <div
            key={i}
            className="glass-card rounded-xl p-8 min-w-[320px] max-w-[380px] shrink-0"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  className={`w-4 h-4 ${j < t.rating ? "text-primary fill-primary" : "text-muted-foreground"}`}
                />
              ))}
            </div>
            <p className="font-body text-muted-foreground mb-6 leading-relaxed">"{t.quote}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-display text-primary text-lg">
                {t.name[0]}
              </div>
              <span className="font-body font-medium text-foreground">{t.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
