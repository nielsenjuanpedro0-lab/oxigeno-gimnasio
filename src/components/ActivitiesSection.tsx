import { Instagram } from "lucide-react";
import { usePayment } from "@/contexts/PaymentContext";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const activities = [
  { title: "Sala de fuerza", desc: "Peso libre y máquinas de última generación" },
  { title: "Aeróbicos", desc: "Clases grupales de alta energía" },
  { title: "Cardio", desc: "Zona completa de equipos cardiovasculares" },
  { title: "Clases grupales", desc: "Spinning, zumba, body pump y más" },
  { title: "Yoga & stretching", desc: "Flexibilidad, movilidad y recuperación" },
];

const featuredClasses = [
  {
    title: "FUNCIONAL 360",
    subtitle: "Entrenamiento grupal guiado",
    coach: "@poma_ocr_trail",
    instagramHandle: "@funcional_trail_360",
    instagramUrl: "https://www.instagram.com/funcional_trail_360",
    days: "Lun · Mié · Vie",
    hours: "8:00 · 18:30 · 19:30",
    hoursNote: "17:00 hs desde mayo",
    location: "Sala de aeróbica · Calle 58 y 75",
    pricing: [
      { label: "2x semana", price: "$45.000", priceNum: 45000 },
      { label: "3x semana", price: "$55.000", priceNum: 55000 },
    ],
  },
  {
    title: "G.A.P",
    subtitle: "Entrenamiento grupal femenino",
    coach: "@belunatural.fit",
    instagramHandle: "@belunatural.fit",
    instagramUrl: "https://www.instagram.com/belunatural.fit",
    days: "Mar · Jue",
    hours: "14:00 · 19:00",
    hoursNote: null,
    location: "Sala de aeróbica · Calle 58 y 75",
    pricing: [{ label: "Mensual", price: "$50.000", priceNum: 50000 }],
  },
];

/** Fila de dato: etiqueta fija a la izquierda, valor en mono para que alineen entre clases. */
const DataRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex gap-4 py-2.5 border-t border-border">
    <dt className="section-label w-20 shrink-0 pt-0.5">{label}</dt>
    <dd className="data text-sm text-foreground/90">{value}</dd>
  </div>
);

const ActivitiesSection = () => {
  const { openPayment } = usePayment();

  return (
    <section id="actividades" className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          index="02"
          label="Actividades"
          title="TODO LO QUE"
          titleSecondLine="PODÉS ENTRENAR"
        />

        {/* Índice de actividades: sin cajas, sin íconos. La numeración da el orden. */}
        <div className="mt-14 grid gap-x-16 md:grid-cols-2">
          {activities.map((a, i) => (
            <Reveal key={a.title} delay={i < 3 ? i * 0.06 : 0.18}>
              <div className="flex items-baseline gap-5 border-t border-border py-6">
                <span className="data text-xs text-primary shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl tracking-wide leading-none mb-1.5">
                    {a.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {a.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Clases con profe */}
        <div className="mt-24 lg:mt-32">
          <SectionHeader
            index="02.1"
            label="Clases especiales"
            title="ENTRENÁ"
            titleSecondLine="CON PROFES"
          />

          <div className="mt-14 space-y-14 lg:space-y-20">
            {featuredClasses.map((cls, i) => (
              <Reveal key={cls.title} delay={i * 0.08}>
                <article className="grid gap-8 border-t-2 border-foreground/80 pt-7 lg:grid-cols-12 lg:gap-12">
                  {/* Identidad */}
                  <div className="lg:col-span-5">
                    {/* El aviso va de kicker sobre el título: pegado a lo que califica. */}
                    <p className="data text-[10px] uppercase tracking-[0.18em] text-signal mb-2">
                      Cupos limitados
                    </p>
                    <h3 className="font-display text-4xl leading-none tracking-wide sm:text-5xl">
                      {cls.title}
                    </h3>
                    <p className="font-body text-muted-foreground mt-3">{cls.subtitle}</p>

                    <a
                      href={cls.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-6 font-body text-sm text-foreground/70 hover:text-foreground transition-colors"
                    >
                      <Instagram className="w-4 h-4" aria-hidden="true" />
                      <span className="link-underline">{cls.instagramHandle}</span>
                    </a>
                  </div>

                  {/* Datos */}
                  <dl className="lg:col-span-4">
                    <DataRow label="Días" value={cls.days} />
                    <DataRow label="Horarios" value={cls.hours} />
                    <DataRow label="Lugar" value={cls.location} />
                    <DataRow label="Profe" value={cls.coach} />
                    {cls.hoursNote && (
                      <p className="font-body text-xs text-muted-foreground/70 pt-3">
                        * {cls.hoursNote}
                      </p>
                    )}
                  </dl>

                  {/* Inscripción: cada opción de precio es su propio CTA. */}
                  <div className="lg:col-span-3">
                    <p className="section-label mb-3">Inscribirme</p>
                    <div className="space-y-2">
                      {cls.pricing.map((p, pi) => {
                        const isPrimary = pi === cls.pricing.length - 1;
                        return (
                          <button
                            key={p.label}
                            onClick={() =>
                              openPayment({
                                name: `${cls.title} (${p.label})`,
                                price: p.price.replace("$", ""),
                                priceNum: p.priceNum,
                              })
                            }
                            className={`${
                              isPrimary ? "btn-primary" : "btn-secondary"
                            } btn-md w-full justify-between`}
                          >
                            <span className="normal-case tracking-normal font-body font-medium">
                              {p.label}
                            </span>
                            <span className="data font-bold text-sm">{p.price}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
