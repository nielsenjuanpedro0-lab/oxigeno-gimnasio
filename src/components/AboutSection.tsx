import { motion } from "framer-motion";
import { Dumbbell, Users, Flame, MapPin } from "lucide-react";
import gymFloor from "@/assets/gym-floor.jpg";

const features = [
  { icon: Dumbbell, title: "Equipamiento de primer nivel", desc: "Máquinas y peso libre de última generación" },
  { icon: Users, title: "Comunidad Sport Club", desc: "Un espacio donde la motivación es colectiva" },
  { icon: Flame, title: "Showroom Hype Fitness", desc: "La zona más intensa de entrenamiento" },
  { icon: MapPin, title: "Necochea, Av 58 n° 3752", desc: "Tu gimnasio premium en la costa argentina" },
];

const AboutSection = () => (
  <section id="nosotros" className="py-24 lg:py-32">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-[600px]"
        >
          <img src={gymFloor} alt="Instalaciones Gimnasio Oxígeno" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-label mb-4">¿POR QUÉ OXÍGENO?</p>
          <h2 className="font-display text-5xl lg:text-6xl tracking-tight mb-8">
            SOMOS MÁS QUE
            <br />
            <span className="text-gradient-amber">UN GIMNASIO</span>
          </h2>
          <p className="font-body text-muted-foreground mb-10 text-lg leading-relaxed">
            En Oxígeno creemos que el entrenamiento va más allá del cuerpo. Creamos un ambiente donde
            la energía, la comunidad y los resultados se encuentran.
          </p>

          <div className="space-y-6">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4 border-l-2 border-primary/40 pl-5 hover:border-primary transition-colors duration-300">
                <f.icon className="w-6 h-6 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-body font-semibold text-foreground mb-1">{f.title}</h3>
                  <p className="font-body text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
