import Reveal from "./Reveal";

const capabilities = ["Rutinas personalizadas", "Seguimiento de progreso", "Turnos y reservas"];

/**
 * Aviso de la app, como franja fina.
 *
 * Es un anuncio de algo que todavía no se puede usar: no merece la misma altura que
 * membresías o actividades. Reducirla a una franja de una línea corrige la jerarquía
 * y aporta otro cambio de ritmo en el scroll.
 */
const RoutinesSection = () => (
  <section id="rutinas" className="border-y border-border">
    <div className="container py-10 lg:py-12">
      <Reveal>
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-5">
            <p className="section-label text-primary shrink-0">Próximamente</p>
            <p className="font-display text-xl uppercase leading-tight sm:text-2xl">
              La app de Oxígeno, en desarrollo
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {capabilities.map((c) => (
              <li key={c} className="font-body text-sm text-muted-foreground">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  </section>
);

export default RoutinesSection;
