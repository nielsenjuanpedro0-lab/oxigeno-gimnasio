import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { usePayment } from "@/contexts/PaymentContext";

const ease = [0.36, 0.6, 0, 1] as const;

const BLACK = { name: "BLACK", price: "80.000", priceNum: 80000 };
const SILVER = { name: "SILVER", price: "70.000", priceNum: 70000 };
const CLASE = { name: "CLASE", price: "20.000", priceNum: 20000 };

const MembershipSection = () => {
  const { openPayment } = usePayment();

  return (
    <section id="membresias" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="max-w-2xl mb-12 lg:mb-16"
        >
          <p className="section-label mb-4">Planes</p>
          <h2 className="font-display text-4xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.05]">
            Tres formas de entrar
          </h2>
          <p className="font-body text-muted-foreground mt-5 text-lg leading-relaxed">
            Sin matrícula, sin permanencia mínima. Elegís, entrenás y si un mes
            no te sirve, no lo pagás.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-4 lg:gap-5">
          {/* BLACK — panel destacado, formato ancho */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-3 relative rounded-4xl lg:rounded-5xl p-7 lg:p-10 flex flex-col overflow-hidden"
            style={{
              background:
                "linear-gradient(150deg, hsl(37 91% 55% / 0.11), hsl(0 0% 7%) 55%)",
              boxShadow: "inset 0 0 0 1px hsl(37 91% 55% / 0.22)",
            }}
          >
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <h3 className="font-display text-2xl lg:text-3xl font-medium tracking-tight">
                  Black
                </h3>
                <p className="font-body text-[15px] text-muted-foreground mt-1.5">
                  Acceso libre, todos los días
                </p>
              </div>
              <span className="shrink-0 font-body text-[11px] uppercase tracking-[0.14em] text-primary bg-primary/10 rounded-full px-3 py-1.5">
                El más elegido
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="font-display text-5xl lg:text-7xl font-medium tracking-[-0.04em] tnum">
                $80.000
              </span>
              <span className="font-body text-base text-muted-foreground">/ mes</span>
            </div>

            <ul className="space-y-3 mb-9 flex-1">
              {[
                "Entrás las veces que quieras, cualquier día hábil",
                "Sala de fuerza, cardio y aeróbica incluidas",
                "Sin franjas horarias restringidas",
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 font-body text-[15px] text-foreground/75"
                >
                  <span className="mt-[9px] h-1 w-1 rounded-full bg-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => openPayment(BLACK)}
              className="group w-full bg-primary text-primary-foreground font-body font-medium text-[15px] py-4 rounded-full transition-all duration-500 ease-fluid hover:bg-foreground hover:text-background inline-flex items-center justify-center gap-2"
            >
              Empezar con Black
              <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-fluid group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* SILVER — card vertical sobria */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="lg:col-span-2 surface-hover rounded-4xl lg:rounded-5xl p-7 lg:p-9 flex flex-col"
          >
            <h3 className="font-display text-2xl lg:text-3xl font-medium tracking-tight">
              Silver
            </h3>
            <p className="font-body text-[15px] text-muted-foreground mt-1.5 mb-8">
              Tres días por semana
            </p>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.04em] tnum">
                $70.000
              </span>
              <span className="font-body text-sm text-muted-foreground">/ mes</span>
            </div>

            <p className="font-body text-[15px] text-foreground/70 leading-relaxed mb-9 flex-1">
              Para el que ya tiene la rutina armada y sabe qué días entrena.
              Mismo acceso a todas las salas, tres veces por semana.
            </p>

            <button
              onClick={() => openPayment(SILVER)}
              className="w-full font-body font-medium text-[15px] py-4 rounded-full text-foreground transition-all duration-500 ease-fluid bg-surface-3/70 hover:bg-foreground hover:text-background"
            >
              Elegir Silver
            </button>
          </motion.div>

          {/* CLASE — barra horizontal, formato distinto a propósito */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease, delay: 0.18 }}
            className="lg:col-span-5 surface-hover rounded-4xl px-7 py-6 lg:px-10 lg:py-7 flex flex-col sm:flex-row sm:items-center gap-6 justify-between"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
              <h3 className="font-display text-xl lg:text-2xl font-medium tracking-tight whitespace-nowrap">
                Pase suelto
              </h3>
              <p className="font-body text-[15px] text-muted-foreground">
                Una sesión, sin plan ni compromiso. Ideal para probar el lugar.
              </p>
            </div>

            <div className="flex items-center gap-6 shrink-0">
              <span className="font-display text-3xl lg:text-4xl font-medium tracking-[-0.04em] tnum">
                $20.000
              </span>
              <button
                onClick={() => openPayment(CLASE)}
                className="font-body font-medium text-[15px] px-7 py-3.5 rounded-full text-foreground transition-all duration-500 ease-fluid bg-surface-3/70 hover:bg-foreground hover:text-background whitespace-nowrap"
              >
                Comprar clase
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mt-10"
        >
          <a
            href="https://wa.me/5492262664679"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-body text-[15px] text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <MessageCircle className="w-[18px] h-[18px]" />
            ¿No sabés cuál te conviene? Escribinos y lo vemos juntos
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipSection;
