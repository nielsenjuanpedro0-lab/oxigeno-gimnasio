import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";

const ease = [0.36, 0.6, 0, 1] as const;

const features = [
  { title: "Tu rutina del día", desc: "Series, repeticiones y cargas, sin la libreta arruinada en el bolso." },
  { title: "Progreso registrado", desc: "Cuánto levantabas en marzo y cuánto levantás hoy, en un solo lugar." },
  { title: "Reserva de cupo", desc: "Guardás tu lugar en las grupales antes de salir de casa." },
];

const RoutinesSection = () => (
  <section id="rutinas" className="py-20 lg:py-32">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease }}
        className="relative rounded-4xl lg:rounded-6xl overflow-hidden p-8 lg:p-16"
        style={{
          background: "linear-gradient(155deg, hsl(0 0% 11%), hsl(0 0% 5%) 70%)",
          boxShadow: "inset 0 0 0 1px hsl(0 0% 100% / 0.07)",
        }}
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2.5 font-body text-[13px] text-muted-foreground mb-6">
              <span className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </span>
              En desarrollo
            </span>

            <h2 className="font-display text-4xl lg:text-[3.25rem] font-medium tracking-[-0.03em] leading-[1.05] mb-5">
              La rutina, en el bolsillo
            </h2>
            <p className="font-body text-muted-foreground text-lg leading-relaxed">
              Estamos armando la app de Oxígeno. Nada de esto está disponible
              todavía: cuando lo esté, te avisamos por acá y por Instagram.
            </p>
          </div>

          <div className="space-y-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, ease, delay: 0.1 + i * 0.09 }}
                className="rounded-4xl px-6 py-5 bg-background/40"
                style={{ boxShadow: "inset 0 0 0 1px hsl(0 0% 100% / 0.05)" }}
              >
                <h3 className="font-display text-base lg:text-lg font-medium tracking-tight mb-1.5">
                  {f.title}
                </h3>
                <p className="font-body text-[15px] text-foreground/55 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default RoutinesSection;
