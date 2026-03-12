import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Clock, ArrowRight, ChevronDown, ChevronUp, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./AuthModal";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  tip?: string;
}

interface Routine {
  title: string;
  difficulty: string;
  duration: string;
  tags: string[];
  exercises: Exercise[];
}

const routines: Routine[] = [
  {
    title: "Rutina de Fuerza",
    difficulty: "Principiante",
    duration: "45 min",
    tags: ["Pecho", "Espalda", "Piernas"],
    exercises: [
      { name: "Sentadilla con barra", sets: "4", reps: "8-10", rest: "90s", tip: "Rodillas alineadas con los pies" },
      { name: "Press de banca", sets: "4", reps: "8-10", rest: "90s" },
      { name: "Remo con barra", sets: "3", reps: "10-12", rest: "75s" },
      { name: "Press militar", sets: "3", reps: "10", rest: "60s" },
    ],
  },
  {
    title: "Rutina de Fuerza",
    difficulty: "Intermedio",
    duration: "60 min",
    tags: ["Full Body", "Compuestos"],
    exercises: [
      { name: "Peso muerto", sets: "5", reps: "5", rest: "120s", tip: "Mantener espalda neutra" },
      { name: "Sentadilla frontal", sets: "4", reps: "6-8", rest: "90s" },
      { name: "Press inclinado", sets: "4", reps: "8", rest: "90s" },
      { name: "Dominadas", sets: "4", reps: "8-10", rest: "75s" },
    ],
  },
  {
    title: "Rutina de Hipertrofia",
    difficulty: "Intermedio",
    duration: "60 min",
    tags: ["Volumen", "Músculo"],
    exercises: [
      { name: "Press banca plano", sets: "4", reps: "10-12", rest: "60s" },
      { name: "Aperturas con mancuernas", sets: "3", reps: "12-15", rest: "45s" },
      { name: "Curl de bíceps", sets: "4", reps: "12", rest: "45s" },
      { name: "Extensiones de tríceps", sets: "4", reps: "12", rest: "45s" },
    ],
  },
  {
    title: "Funcional Full Body",
    difficulty: "Avanzado",
    duration: "50 min",
    tags: ["Funcional", "HIIT"],
    exercises: [
      { name: "Burpees", sets: "4", reps: "15", rest: "30s" },
      { name: "Kettlebell swings", sets: "4", reps: "20", rest: "30s" },
      { name: "Box jumps", sets: "3", reps: "12", rest: "45s" },
      { name: "Battle ropes", sets: "4", reps: "30s", rest: "30s" },
    ],
  },
  {
    title: "Cardio & Resistencia",
    difficulty: "Principiante",
    duration: "45 min",
    tags: ["Cardio", "Resistencia"],
    exercises: [
      { name: "Cinta — intervalos", sets: "1", reps: "20 min", rest: "-" },
      { name: "Bicicleta estática", sets: "1", reps: "15 min", rest: "-" },
      { name: "Remo", sets: "1", reps: "10 min", rest: "-" },
    ],
  },
  {
    title: "Movilidad y Flexibilidad",
    difficulty: "Principiante",
    duration: "40 min",
    tags: ["Yoga", "Stretching"],
    exercises: [
      { name: "Saludo al sol", sets: "3", reps: "5 flujos", rest: "-" },
      { name: "Estiramiento de cadera", sets: "2", reps: "60s/lado", rest: "-" },
      { name: "Foam rolling", sets: "1", reps: "10 min", rest: "-" },
      { name: "Respiración profunda", sets: "1", reps: "5 min", rest: "-" },
    ],
  },
];

const diffColor = (d: string) => {
  if (d === "Principiante") return "bg-green-500/20 text-green-400";
  if (d === "Intermedio") return "bg-primary/20 text-primary";
  return "bg-accent/20 text-accent";
};

const RoutinesSection = () => {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <section id="rutinas" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-4">
            <Shield className="w-4 h-4 text-primary" />
            <span className="section-label !mb-0">ZONA DE MIEMBROS</span>
          </div>
          <h2 className="font-display text-5xl lg:text-6xl tracking-tight mt-4">
            ACCEDÉ A TUS <span className="text-gradient-amber">RUTINAS</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {routines.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative glass-card rounded-xl overflow-hidden border-t-2 border-t-primary/60"
            >
              {!user && (
                <div
                  className="absolute inset-0 z-10 backdrop-blur-md bg-background/60 flex flex-col items-center justify-center gap-3 cursor-pointer"
                  onClick={() => setAuthOpen(true)}
                >
                  <Lock className="w-8 h-8 text-primary" />
                  <p className="font-body text-sm text-muted-foreground text-center px-4">
                    Iniciá sesión para ver esta rutina
                  </p>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-body text-xs font-medium px-2.5 py-1 rounded-full ${diffColor(r.difficulty)}`}>
                    {r.difficulty}
                  </span>
                  <span className="flex items-center gap-1 font-body text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" /> {r.duration}
                  </span>
                </div>

                <h3 className="font-display text-2xl tracking-wide mb-3">{r.title}</h3>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {r.tags.map((t) => (
                    <span key={t} className="font-body text-xs text-primary/80 bg-primary/10 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>

                {user && (
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="flex items-center gap-1 font-body text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    {expanded === i ? "Ocultar" : "Ver rutina"}{" "}
                    {expanded === i ? <ChevronUp className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                )}
              </div>

              <AnimatePresence>
                {expanded === i && user && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-border"
                  >
                    <div className="p-6 space-y-3">
                      {r.exercises.map((ex, j) => (
                        <div key={j} className="bg-secondary/50 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-body text-sm font-medium text-foreground">{ex.name}</span>
                          </div>
                          <div className="flex gap-4 font-body text-xs text-muted-foreground">
                            <span>{ex.sets} series</span>
                            <span>{ex.reps} reps</span>
                            <span>Descanso: {ex.rest}</span>
                          </div>
                          {ex.tip && (
                            <p className="font-body text-xs text-primary/70 mt-1">💡 {ex.tip}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </section>
  );
};

export default RoutinesSection;
