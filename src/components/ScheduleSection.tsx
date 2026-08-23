import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const schedule = [
  { day: "Lunes a viernes", hours: "07:00 — 21:30", open: true },
  { day: "Sábados", hours: "08:00 — 14:00", open: true },
  { day: "Domingos", hours: "Cerrado", open: false },
];

/**
 * Horarios como tabla real.
 *
 * Antes eran tres tarjetas apiladas. Tres filas de dos columnas con la misma
 * estructura son una tabla, y como tabla se comparan de un vistazo.
 */
const ScheduleSection = () => (
  <section id="horarios" className="py-24 lg:py-36">
    <div className="container">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <SectionHeader
          label="Horarios"
          title="Horario corrido"
          description="Vení a entrenar en el horario que mejor te quede."
          className="lg:col-span-5"
        />

        <Reveal className="lg:col-span-7">
          <table className="w-full border-collapse">
            <caption className="sr-only">Horarios de atención del gimnasio</caption>
            <tbody>
              {schedule.map((item) => (
                <tr key={item.day} className="border-t border-border">
                  <th
                    scope="row"
                    className="py-6 text-left font-display text-lg font-medium sm:text-xl"
                  >
                    {item.day}
                  </th>
                  <td
                    className={`py-6 text-right data text-base sm:text-lg ${
                      item.open ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.hours}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </div>
  </section>
);

export default ScheduleSection;
