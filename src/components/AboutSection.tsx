import { motion } from "framer-motion";
import gymFloor from "@/assets/gym-floor.jpg";

const ease = [0.36, 0.6, 0, 1] as const;

const points = [
  {
    n: "01",
    title: "Equipamiento que acompaña",
    desc: "Peso libre y máquinas guiadas que cubren desde la primera rutina hasta la carga alta. No te vas a quedar sin progresión.",
  },
  {
    n: "02",
    title: "Comunidad Sport Club",
    desc: "Las mismas caras a la misma hora, semana tras semana. Entrenar acompañado sostiene la constancia mejor que cualquier plan.",
  },
  {
    n: "03",
    title: "Showroom Hype Fitness",
    desc: "La sala funciona como showroom de la marca: las máquinas que se exhiben son las mismas sobre las que entrenás.",
  },
  {
    n: "04",
    title: "Dentro del Supermercado Toledo",
    desc: "Av. 58 n° 3752, Necochea. Entrenás donde ya venías: una parada menos en el día.",
  },
];

const AboutSection = () => (
  <section id="nosotros" className="py-20 lg:py-32">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="lg:col-span-5 lg:sticky lg:top-32"
        >
          <p className="section-label mb-4">Nosotros</p>
          <h2 className="font-display text-4xl lg:text-[3.25rem] font-medium tracking-[-0.03em] leading-[1.05] mb-6">
            Un espacio pensado en serio
          </h2>
          <p className="font-body text-muted-foreground text-lg leading-relaxed">
            El equipamiento, los horarios y hasta dónde está el gimnasio: cada
            decisión está tomada para sacar fricción entre tu día y el
            entrenamiento.
          </p>
        </motion.div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3 lg:gap-4">
          {points.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease, delay: (i % 2) * 0.08 }}
              className="surface-hover rounded-4xl p-7 lg:p-8 flex flex-col"
            >
              <span className="font-display text-[13px] text-primary tnum mb-5">
                {p.n}
              </span>
              <h3 className="font-display text-lg lg:text-xl font-medium tracking-tight mb-2.5">
                {p.title}
              </h3>
              <p className="font-body text-[15px] text-foreground/60 leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Franja panorámica: aporta imagen sin competir con las tarjetas */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease }}
        className="relative rounded-4xl lg:rounded-6xl overflow-hidden aspect-[16/9] lg:aspect-[21/8] mt-4 lg:mt-16 group"
      >
        <img
          src={gymFloor}
          alt="Piso principal de Gimnasio Oxígeno"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-fluid group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
