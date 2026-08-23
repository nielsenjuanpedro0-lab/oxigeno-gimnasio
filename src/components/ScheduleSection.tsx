import Reveal from "./Reveal";

const schedule = [
  { day: "Lunes a viernes", hours: "07:00 — 21:30", open: true },
  { day: "Sábados", hours: "08:00 — 14:00", open: true },
  { day: "Domingos", hours: "Cerrado", open: false },
];

/**
 * Horarios como banda compacta.
 *
 * Antes ocupaba una sección entera con cabecera grande, igual que todas las demás.
 * Tres pares de dato no justifican esa altura: bajarla a una banda de una fila le da
 * a la página un cambio de respiración entre dos secciones altas, y los tres horarios
 * quedan comparables de un vistazo.
 */
const ScheduleSection = () => (
  <section id="horarios" className="border-y border-border bg-surface-2">
    <div className="container py-12 lg:py-16">
      <Reveal>
        <div className="grid gap-8 md:grid-cols-4 md:items-baseline md:gap-6">
          <p className="section-label text-primary">Horarios</p>

          {schedule.map((item) => (
            <div
              key={item.day}
              className="flex items-baseline justify-between gap-4 border-t border-border pt-4 md:block md:border-t-0 md:pt-0"
            >
              <span className="section-label text-muted-foreground">{item.day}</span>
              <span
                className={`data font-display block text-xl md:mt-2 md:text-2xl ${
                  item.open ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.hours}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export default ScheduleSection;
