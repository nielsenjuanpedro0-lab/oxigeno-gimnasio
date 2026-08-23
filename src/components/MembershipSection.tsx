import { MessageCircle } from "lucide-react";
import { usePayment } from "@/contexts/PaymentContext";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const plans = [
  {
    name: "CLASE",
    label: "Clase",
    price: "20.000",
    priceNum: 20000,
    unit: "por clase",
    featured: false,
    incluye: ["1 clase individual", "Acceso por el día", "Ideal para probar"],
  },
  {
    name: "SILVER",
    label: "Silver",
    price: "60.000",
    priceNum: 60000,
    unit: "por mes",
    featured: false,
    incluye: [
      "Acceso 3 veces por semana",
      "Rutina organizada y constante",
      "Ideal para mantener frecuencia",
    ],
  },
  {
    name: "BLACK",
    label: "Black",
    price: "70.000",
    priceNum: 70000,
    unit: "por mes",
    featured: true,
    incluye: [
      "Acceso libre diario",
      "Sin restricciones de horario",
      "Entrená cuando quieras",
      "Máxima flexibilidad",
    ],
  },
] as const;

const WHATSAPP_URL = "https://wa.me/5492262664679";

/**
 * Planes en bloques.
 *
 * La versión anterior era una tabla comparativa. La idea era poder comparar los planes
 * de un vistazo, pero con solo tres atributos la tabla quedaba casi toda vacía y se
 * leía como planilla de especificaciones: dos o tres palabras por celda en columnas de
 * 380 px. Un bloque por plan sostiene mejor el contenido y vende, que es lo que esta
 * sección tiene que hacer.
 *
 * El plan destacado se distingue por superficie y borde, no por escala: el truco de
 * agrandarlo un 5% desbordaba en mobile y se nota como truco.
 */
const MembershipSection = () => {
  const { openPayment } = usePayment();

  return (
    <section id="membresias" className="bg-surface-1 py-24 lg:py-36">
      <div className="container">
        <SectionHeader label="Membresías" title="ELEGÍ TU" accent="PLAN" />

        <div className="mt-16 grid gap-5 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08} className="h-full">
              <article
                className={`flex h-full flex-col border-t-2 p-8 transition-colors duration-500 lg:p-10 ${
                  plan.featured
                    ? "border-primary bg-surface-2"
                    : "border-border bg-background/40 hover:border-foreground/30"
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl uppercase leading-none">
                    {plan.name}
                  </h3>
                  {plan.featured && (
                    <span className="section-label text-primary">Más elegido</span>
                  )}
                </div>

                <p className="mt-7 flex items-baseline gap-2.5">
                  <span className="data font-display text-[3.25rem] leading-[0.85] text-primary">
                    ${plan.price}
                  </span>
                  <span className="font-body text-sm text-muted-foreground">
                    {plan.unit}
                  </span>
                </p>

                {/*
                  Lista separada por reglas finas en lugar de viñetas con tilde: el
                  check verde en círculo es el recurso más repetido de las páginas de
                  precios genéricas.
                */}
                <ul className="mt-9 flex-1 border-b border-border">
                  {plan.incluye.map((item) => (
                    <li
                      key={item}
                      className="border-t border-border py-3.5 font-body text-[0.9375rem] text-foreground/85"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() =>
                    openPayment({
                      name: plan.name,
                      price: plan.price,
                      priceNum: plan.priceNum,
                    })
                  }
                  className={`${
                    plan.featured ? "btn-primary" : "btn-secondary"
                  } btn-md mt-9 w-full`}
                >
                  Elegir {plan.label}
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span className="link-underline">¿Tenés dudas? Escribinos por WhatsApp</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default MembershipSection;
