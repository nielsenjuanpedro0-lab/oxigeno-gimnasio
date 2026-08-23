import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const capabilities = [
  { title: "Rutinas personalizadas", desc: "Planes adaptados a tus objetivos" },
  { title: "Seguimiento de progreso", desc: "Registrá tu evolución día a día" },
  { title: "Turnos y reservas", desc: "Reservá tu lugar desde la app" },
];

/**
 * Anuncio de la app.
 *
 * Antes era una tarjeta que contenía tres tarjetas más chicas adentro. Al no ser algo
 * que se pueda usar todavía, no necesita ningún contenedor: alcanza con el aviso y la
 * lista de lo que va a traer.
 */
const RoutinesSection = () => (
  <section id="rutinas" className="py-24 lg:py-36">
    <div className="container">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <SectionHeader
          label="Próximamente"
          title="TUS RUTINAS EN TU CELULAR"
          description="Estamos desarrollando la app oficial de Oxígeno. Vas a poder acceder a rutinas personalizadas, seguir tu progreso y reservar turnos desde el celular."
          className="lg:col-span-5"
        />

        <div className="lg:col-span-7">
          {capabilities.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="flex items-baseline gap-5 border-t border-border py-5">
                <span className="data text-xs text-muted-foreground/60 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-body font-medium text-foreground mb-1.5">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <p className="section-label mt-8 text-signal">En desarrollo</p>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export default RoutinesSection;
