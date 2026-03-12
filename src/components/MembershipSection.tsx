import { motion } from "framer-motion";
import { Check, Star, MessageCircle } from "lucide-react";

const plans = [
  {
    name: "BÁSICO",
    price: "12.000",
    featured: false,
    features: [
      "Acceso sala de fuerza",
      "Zona de cardio",
      "Vestuarios y duchas",
      "Horario completo",
    ],
  },
  {
    name: "PRO",
    price: "18.000",
    featured: true,
    badge: "MÁS POPULAR",
    features: [
      "Todo lo del plan Básico",
      "Clases grupales ilimitadas",
      "Acceso Sport Club",
      "App de rutinas",
      "Evaluación mensual",
    ],
  },
  {
    name: "ELITE",
    price: "28.000",
    featured: false,
    features: [
      "Todo lo del plan Pro",
      "Entrenamiento personal 2x/sem",
      "Acceso Hype Fitness Showroom",
      "Nutricionista",
      "Prioridad en reservas",
      "Invitados gratis (2/mes)",
    ],
  },
];

const MembershipSection = () => (
  <section id="membresias" className="py-24 lg:py-32">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="section-label mb-4">MEMBRESÍAS</p>
        <h2 className="font-display text-5xl lg:text-6xl tracking-tight">
          ELEGÍ TU <span className="text-gradient-amber">PLAN</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`relative rounded-2xl p-8 flex flex-col ${
              plan.featured
                ? "glass-card border-primary/50 shadow-[0_0_40px_-10px_hsl(37_91%_55%/0.3)] scale-105"
                : "glass-card"
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-body text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3" /> {plan.badge}
              </div>
            )}

            <h3 className="font-display text-3xl tracking-wider mb-2">{plan.name}</h3>
            <div className="mb-6">
              <span className="font-display text-5xl text-primary">${plan.price}</span>
              <span className="font-body text-sm text-muted-foreground">/mes</span>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 font-body text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="https://wa.me/5492262000000"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-center font-body font-semibold py-3 rounded-full transition-all duration-300 ${
                plan.featured
                  ? "bg-accent text-accent-foreground hover:shadow-[0_0_25px_hsl(355_72%_56%/0.4)]"
                  : "border border-border hover:border-primary/50 text-foreground hover:bg-secondary"
              }`}
            >
              Elegir plan
            </a>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <a
          href="https://wa.me/5492262000000"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-body text-muted-foreground hover:text-foreground transition-colors"
        >
          <MessageCircle className="w-5 h-5 text-green-500" />
          ¿Tenés dudas? Contactanos por WhatsApp
        </a>
      </motion.div>
    </div>
  </section>
);

export default MembershipSection;
