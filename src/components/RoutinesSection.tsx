import { motion } from "framer-motion";
import { Smartphone, Dumbbell, Bell } from "lucide-react";

const RoutinesSection = () => {
  return (
    <section id="rutinas" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-4">
            <Dumbbell className="w-4 h-4 text-primary" />
            <span className="section-label !mb-0">PRÓXIMAMENTE</span>
          </div>
          <h2 className="font-display text-5xl lg:text-6xl tracking-tight mt-4 mb-6">
            TUS <span className="text-gradient-amber">RUTINAS</span> EN TU CELULAR
          </h2>
          <p className="font-body text-muted-foreground text-lg mb-10 leading-relaxed">
            Estamos desarrollando la <span className="text-foreground font-medium">app oficial de Oxígeno Gym</span>. 
            Vas a poder acceder a rutinas personalizadas, seguir tu progreso y mucho más, todo desde tu celular.
          </p>

          <div className="glass-card rounded-2xl p-8 lg:p-10 border border-primary/20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Smartphone className="w-7 h-7 text-primary" />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {[
                { title: "Rutinas personalizadas", desc: "Planes adaptados a tus objetivos" },
                { title: "Seguimiento de progreso", desc: "Registrá tu evolución día a día" },
                { title: "Turnos y reservas", desc: "Reservá tu lugar desde la app" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="text-center"
                >
                  <h4 className="font-display text-sm tracking-wider mb-1">{item.title}</h4>
                  <p className="font-body text-xs text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-5 py-2.5">
              <Bell className="w-4 h-4 text-accent" />
              <span className="font-body text-sm text-accent font-medium">App en desarrollo — ¡Muy pronto!</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RoutinesSection;
