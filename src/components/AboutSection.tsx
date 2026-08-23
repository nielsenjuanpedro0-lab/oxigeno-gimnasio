import gymFloor from "@/assets/gym-floor.jpg";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const features = [
  {
    title: "Equipamiento de primer nivel",
    desc: "Máquinas y peso libre de última generación",
  },
  {
    title: "Comunidad Sport Club",
    desc: "Un espacio donde la motivación es colectiva",
  },
  {
    title: "Showroom Hype Fitness",
    desc: "La zona más intensa de entrenamiento",
  },
  {
    title: "Necochea, Av. 58 n° 3752",
    desc: "Tu gimnasio premium en la costa argentina",
  },
];

const AboutSection = () => (
  <section id="nosotros" className="bg-surface-1 py-20 lg:py-28">
    <div className="container">
      <SectionHeader
        index="01"
        label="¿Por qué Oxígeno?"
        title="SOMOS MÁS QUE"
        titleSecondLine="UN GIMNASIO"
        description="En Oxígeno el entrenamiento va más allá del cuerpo. Armamos un ambiente donde la energía, la comunidad y los resultados se encuentran."
        className="max-w-3xl"
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10] lg:aspect-[4/3]">
            <img
              src={gymFloor}
              alt="Sala de entrenamiento del Gimnasio Oxígeno"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-5">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i < 3 ? i * 0.06 : 0.18}>
              <div className="flex items-baseline gap-5 border-t border-border py-5">
                <span className="data text-xs text-primary shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-body font-semibold text-foreground mb-1">
                    {f.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
