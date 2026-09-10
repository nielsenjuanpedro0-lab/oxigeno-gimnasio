import { motion } from "framer-motion";
import { Leaf, Instagram, Clock, MapPin, MessageCircle } from "lucide-react";
import gymFloor from "@/assets/gym-2.jpg";
import cardioImg from "@/assets/gym-3.jpg";
import aerobicaImg from "@/assets/gallery-3.jpg";

const ease = [0.36, 0.6, 0, 1] as const;

const featuredClasses = [
  {
    title: "Funcional 360",
    subtitle: "Grupal guiado, de principio a fin",
    body: "Circuitos de cuerpo entero con carga progresiva. El profe arma el bloque del día y lo corrige en el momento.",
    coach: "@poma_ocr_trail",
    instagramHandle: "@funcional_trail_360",
    instagramUrl: "https://www.instagram.com/funcional_trail_360",
    days: "Lunes, miércoles y viernes",
    slots: ["08:00", "17:00", "18:30", "19:30"],
    slotsNote: "El turno de 17:00 arranca en mayo",
    wide: true,
  },
  {
    title: "G.A.P",
    subtitle: "Grupal femenino",
    body: "Trabajo localizado de glúteos, abdomen y piernas. Grupos chicos para que nadie entrene sin corrección.",
    coach: "@belunatural.fit",
    instagramHandle: "@belunatural.fit",
    instagramUrl: "https://www.instagram.com/belunatural.fit",
    days: "Martes y jueves",
    slots: ["14:00", "19:00"],
    slotsNote: null,
    wide: false,
  },
];

const WHATSAPP = "https://wa.me/5492262664679";

const ActivitiesSection = () => (
  <section id="actividades" className="py-20 lg:py-32">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease }}
        className="max-w-2xl mb-12 lg:mb-16"
      >
        <p className="section-label mb-4">Qué hay adentro</p>
        <h2 className="font-display text-4xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.05]">
          Cuatro zonas, un mismo acceso
        </h2>
      </motion.div>

      {/* Bento: cada tarjeta con su propio formato */}
      <div className="grid lg:grid-cols-6 gap-4 lg:gap-5">
        {/* Formato imagen — pieza ancla */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease }}
          className="lg:col-span-4 relative rounded-4xl lg:rounded-5xl overflow-hidden min-h-[300px] lg:min-h-[380px] group"
        >
          <img
            src={gymFloor}
            alt="Sala de fuerza de Gimnasio Oxígeno"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-fluid group-hover:scale-[1.04]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="relative h-full flex flex-col justify-end p-7 lg:p-9">
            <h3 className="font-display text-2xl lg:text-3xl font-medium tracking-tight mb-2">
              Sala de fuerza
            </h3>
            <p className="font-body text-[15px] text-foreground/70 max-w-md leading-relaxed">
              Peso libre, racks y máquinas guiadas. Es la zona más grande del
              piso y la que más usamos.
            </p>
          </div>
        </motion.div>

        {/* Formato imagen vertical */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease, delay: 0.08 }}
          className="lg:col-span-2 relative rounded-4xl lg:rounded-5xl overflow-hidden min-h-[300px] lg:min-h-[460px] group"
        >
          <img
            src={cardioImg}
            alt="Zona de cardio de Gimnasio Oxígeno"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-fluid group-hover:scale-[1.04]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />
          <div className="relative h-full flex flex-col justify-end p-7 lg:p-9">
            <h3 className="font-display text-2xl lg:text-3xl font-medium tracking-tight mb-2">
              Cardio
            </h3>
            <p className="font-body text-[15px] text-foreground/70 leading-relaxed">
              Cintas, elípticos y bicicletas. Incluido en todos los planes, sin
              turno previo.
            </p>
          </div>
        </motion.div>

        {/* Formato mixto — imagen arriba, chips abajo */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease, delay: 0.12 }}
          className="lg:col-span-4 surface-hover rounded-4xl lg:rounded-5xl overflow-hidden flex flex-col group"
        >
          <div className="relative h-52 lg:h-64 overflow-hidden shrink-0">
            <img
              src={aerobicaImg}
              alt="Sala de aeróbica de Gimnasio Oxígeno"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-fluid group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-1 via-transparent to-transparent" />
          </div>

          <div className="p-7 lg:p-9">
            <h3 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-2.5">
              Sala de aeróbica
            </h3>
            <p className="font-body text-[15px] text-foreground/60 leading-relaxed mb-6">
              Espacio propio, separado del ruido de la sala de fuerza. Acá pasan
              todas las clases grupales.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Funcional 360", "G.A.P", "Spinning", "Zumba", "Body pump"].map((c) => (
                <span
                  key={c}
                  className="font-body text-[13px] text-foreground/80 bg-surface-3/60 rounded-full px-3.5 py-1.5"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Formato mínimo — icono + texto */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease, delay: 0.16 }}
          className="lg:col-span-2 surface-hover rounded-4xl lg:rounded-5xl p-7 lg:p-9 flex flex-col justify-between gap-8"
        >
          <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-2.5">
              Movilidad y elongación
            </h3>
            <p className="font-body text-[15px] text-foreground/60 leading-relaxed">
              Trabajo de flexibilidad y recuperación para meter entre bloques
              de fuerza o cerrar la semana.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Clases con profe */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease }}
        className="max-w-2xl mt-24 lg:mt-32 mb-10 lg:mb-14"
      >
        <p className="section-label mb-4">Clases con profe</p>
        <h2 className="font-display text-4xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.05]">
          Alguien mirando cómo entrenás
        </h2>
        <p className="font-body text-muted-foreground mt-5 text-lg leading-relaxed">
          Grupos con cupo limitado, para que la corrección sea real y no un
          consejo al pasar.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-4 lg:gap-5">
        {featuredClasses.map((cls, i) => (
          <motion.div
            key={cls.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, ease, delay: i * 0.1 }}
            className={`surface-hover rounded-4xl lg:rounded-5xl p-7 lg:p-9 flex flex-col ${
              cls.wide ? "lg:col-span-3" : "lg:col-span-2"
            }`}
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h3 className="font-display text-2xl lg:text-3xl font-medium tracking-tight">
                  {cls.title}
                </h3>
                <p className="font-body text-[15px] text-muted-foreground mt-1.5">
                  {cls.subtitle}
                </p>
              </div>
              <span className="shrink-0 font-body text-[11px] uppercase tracking-[0.14em] text-accent bg-accent/10 rounded-full px-3 py-1.5">
                Cupo limitado
              </span>
            </div>

            <p className="font-body text-[15px] text-foreground/65 leading-relaxed mb-7">
              {cls.body}
            </p>

            <div className="space-y-4 mb-7 flex-1">
              <div>
                <p className="font-body text-[13px] text-muted-foreground mb-2.5">
                  {cls.days}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cls.slots.map((s) => (
                    <span
                      key={s}
                      className="font-body text-[13px] text-foreground/85 bg-surface-3/60 rounded-full px-3.5 py-1.5 tnum inline-flex items-center gap-1.5"
                    >
                      <Clock className="w-3 h-3 text-primary" strokeWidth={2} />
                      {s}
                    </span>
                  ))}
                </div>
                {cls.slotsNote && (
                  <p className="font-body text-[13px] text-muted-foreground/70 mt-3">
                    {cls.slotsNote}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 font-body text-[13px] text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                Sala de aeróbica · 58 y 75, dentro de Supermercado Toledo
              </div>
            </div>

            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full font-body font-medium text-[15px] py-3.5 rounded-full text-foreground transition-all duration-500 ease-fluid bg-surface-3/70 hover:bg-foreground hover:text-background inline-flex items-center justify-center gap-2 mb-5"
            >
              <MessageCircle className="w-4 h-4" />
              Consultar precio y cupo
            </a>

            <div className="flex items-center justify-between pt-5 border-t border-border/60">
              <span className="font-body text-[13px] text-muted-foreground">
                Profe {cls.coach}
              </span>
              <a
                href={cls.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-body text-[13px] text-foreground/70 hover:text-primary transition-colors duration-300"
              >
                <Instagram className="w-3.5 h-3.5" strokeWidth={1.5} />
                {cls.instagramHandle}
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ActivitiesSection;
