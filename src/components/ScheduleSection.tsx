import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ease = [0.36, 0.6, 0, 1] as const;

const schedule = [
  { day: "Lunes a viernes", hours: "07:00 — 21:30", days: [1, 2, 3, 4, 5], open: 420, close: 1290 },
  { day: "Sábados", hours: "08:00 — 14:00", days: [6], open: 480, close: 840 },
  { day: "Domingos", hours: "Cerrado", days: [0], open: null, close: null },
];

const getStatus = (now: Date) => {
  const minutes = now.getHours() * 60 + now.getMinutes();
  const today = schedule.find((s) => s.days.includes(now.getDay()));
  if (!today?.open || !today.close) return { open: false, label: "Cerrado hoy", detail: "Volvemos el lunes a las 07:00" };
  if (minutes < today.open) {
    return { open: false, label: "Cerrado", detail: `Abrimos hoy a las ${today.hours.slice(0, 5)}` };
  }
  if (minutes >= today.close) {
    return { open: false, label: "Cerrado", detail: "Ya cerramos por hoy" };
  }
  const left = today.close - minutes;
  const h = Math.floor(left / 60);
  const m = left % 60;
  return {
    open: true,
    label: "Abierto ahora",
    detail: h > 0 ? `Quedan ${h} h ${m} min de sala` : `Cierra en ${m} min`,
  };
};

const ScheduleSection = () => {
  const [status, setStatus] = useState(() => getStatus(new Date()));

  useEffect(() => {
    const id = setInterval(() => setStatus(getStatus(new Date())), 60_000);
    return () => clearInterval(id);
  }, []);

  const todayIndex = schedule.findIndex((s) => s.days.includes(new Date().getDay()));

  return (
    <section id="horarios" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="max-w-2xl mb-12 lg:mb-16"
        >
          <p className="section-label mb-4">Horarios</p>
          <h2 className="font-display text-4xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.05]">
            Corrido, en serio
          </h2>
          <p className="font-body text-muted-foreground mt-5 text-lg leading-relaxed">
            No cerramos al mediodía. Si tu único hueco es a las 13:40, la sala
            está abierta igual.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-4 lg:gap-5">
          {/* Estado en vivo */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, ease }}
            className="lg:col-span-2 rounded-4xl lg:rounded-5xl p-7 lg:p-9 flex flex-col justify-between min-h-[220px]"
            style={{
              background: status.open
                ? "linear-gradient(150deg, hsl(37 91% 55% / 0.12), hsl(0 0% 7%) 60%)"
                : "hsl(var(--surface-1))",
              boxShadow: status.open
                ? "inset 0 0 0 1px hsl(37 91% 55% / 0.22)"
                : "inset 0 0 0 1px hsl(0 0% 100% / 0.05)",
            }}
          >
            <span className="inline-flex items-center gap-2.5 font-body text-[13px] text-muted-foreground">
              <span className="relative flex h-2 w-2">
                {status.open && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                )}
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${
                    status.open ? "bg-primary" : "bg-muted-foreground"
                  }`}
                />
              </span>
              Estado
            </span>

            <div>
              <p className="font-display text-3xl lg:text-4xl font-medium tracking-[-0.03em] mb-2">
                {status.label}
              </p>
              <p className="font-body text-[15px] text-muted-foreground">
                {status.detail}
              </p>
            </div>
          </motion.div>

          {/* Tabla de horarios */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, ease, delay: 0.1 }}
            className="lg:col-span-3 surface rounded-4xl lg:rounded-5xl p-3 lg:p-4"
          >
            {schedule.map((item, i) => {
              const isToday = i === todayIndex;
              return (
                <div
                  key={item.day}
                  className={`flex items-center justify-between px-5 lg:px-6 py-5 lg:py-6 rounded-4xl transition-colors duration-500 ease-fluid ${
                    isToday ? "bg-surface-3/50" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-body text-[15px] lg:text-base ${
                        item.open ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {item.day}
                    </span>
                    {isToday && (
                      <span className="font-body text-[11px] uppercase tracking-[0.14em] text-primary bg-primary/10 rounded-full px-2.5 py-1">
                        Hoy
                      </span>
                    )}
                  </div>
                  <span
                    className={`font-body text-[15px] lg:text-base tnum ${
                      item.open ? "text-foreground/80" : "text-muted-foreground/60"
                    }`}
                  >
                    {item.hours}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
