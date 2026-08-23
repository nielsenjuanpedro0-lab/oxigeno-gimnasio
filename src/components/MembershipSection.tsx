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
    acceso: "1 clase individual",
    vigencia: "Por el día",
    idealPara: "Probar el gimnasio",
  },
  {
    name: "SILVER",
    label: "Silver",
    price: "60.000",
    priceNum: 60000,
    unit: "por mes",
    featured: false,
    acceso: "3 veces por semana",
    vigencia: "Mensual",
    idealPara: "Mantener frecuencia",
  },
  {
    name: "BLACK",
    label: "Black",
    price: "70.000",
    priceNum: 70000,
    unit: "por mes",
    featured: true,
    acceso: "Libre, sin restricción horaria",
    vigencia: "Mensual",
    idealPara: "Máxima flexibilidad",
  },
] as const;

const rows = [
  { label: "Acceso", key: "acceso" },
  { label: "Vigencia", key: "vigencia" },
  { label: "Ideal para", key: "idealPara" },
] as const;

const WHATSAPP_URL = "https://wa.me/5492262664679";

/**
 * Membresías como tabla comparativa.
 *
 * Antes eran tres tarjetas flotantes, cada una con su propia lista de beneficios en
 * distinto orden — imposible comparar dos planes sin releer las tres. Con una fila por
 * atributo, la comparación es horizontal y directa.
 *
 * En mobile la tabla colapsa a bloques apilados: una tabla de cuatro columnas no entra
 * en 360px sin scroll horizontal.
 */
const MembershipSection = () => {
  const { openPayment } = usePayment();

  const buy = (plan: (typeof plans)[number]) =>
    openPayment({ name: plan.name, price: plan.price, priceNum: plan.priceNum });

  return (
    <section id="membresias" className="bg-surface-1 py-24 lg:py-36">
      <div className="container">
        <SectionHeader label="Membresías" title="ELEGÍ TU" accent="PLAN" />

        {/* Desktop: comparación horizontal */}
        <Reveal className="mt-16 hidden lg:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Comparación de planes de membresía del Gimnasio Oxígeno
            </caption>
            <thead>
              <tr>
                <td className="w-40" />
                {plans.map((plan) => (
                  <th
                    key={plan.name}
                    scope="col"
                    className={`border-t px-6 pb-7 pt-6 align-top ${
                      plan.featured ? "border-primary" : "border-border"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-2xl uppercase leading-none">
                        {plan.name}
                      </span>
                      {plan.featured && (
                        <span className="section-label text-primary">Más elegido</span>
                      )}
                    </div>
                    <p className="mt-5 flex items-baseline gap-2">
                      <span className="data font-display text-[2.25rem] text-primary leading-none">
                        ${plan.price}
                      </span>
                      <span className="font-body text-[0.8125rem] text-muted-foreground">
                        {plan.unit}
                      </span>
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className="border-t border-border">
                  <th scope="row" className="section-label text-muted-foreground py-5 pr-6 align-top">
                    {row.label}
                  </th>
                  {plans.map((plan) => (
                    <td
                      key={plan.name}
                      className="px-6 py-5 align-top font-body text-sm text-foreground/90"
                    >
                      {plan[row.key]}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-border">
                <td />
                {plans.map((plan) => (
                  <td key={plan.name} className="px-6 pt-6 align-top">
                    <button
                      onClick={() => buy(plan)}
                      className={`${
                        plan.featured ? "btn-primary" : "btn-secondary"
                      } btn-md w-full`}
                    >
                      Elegir {plan.label}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Reveal>

        {/* Mobile: un bloque por plan */}
        <div className="mt-12 space-y-10 lg:hidden">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.06}>
              <div
                className={`border-t pt-6 ${
                  plan.featured ? "border-primary" : "border-border"
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl uppercase leading-none">{plan.name}</h3>
                  {plan.featured && (
                    <span className="section-label text-primary">Más elegido</span>
                  )}
                </div>

                <p className="mt-4 flex items-baseline gap-2">
                  <span className="data font-display text-[2.25rem] text-primary leading-none">
                    ${plan.price}
                  </span>
                  <span className="font-body text-[0.8125rem] text-muted-foreground">
                    {plan.unit}
                  </span>
                </p>

                <dl className="mt-5">
                  {rows.map((row) => (
                    <div key={row.key} className="flex gap-4 border-t border-border py-3">
                      <dt className="section-label text-muted-foreground w-24 shrink-0 pt-0.5">{row.label}</dt>
                      <dd className="font-body text-sm text-foreground/90">
                        {plan[row.key]}
                      </dd>
                    </div>
                  ))}
                </dl>

                <button
                  onClick={() => buy(plan)}
                  className={`${
                    plan.featured ? "btn-primary" : "btn-secondary"
                  } btn-md mt-5 w-full`}
                >
                  Elegir {plan.label}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span className="link-underline">¿Tenés dudas? Escribinos por WhatsApp</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default MembershipSection;
