import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import gym1 from "@/assets/gym-1.jpg";
import gym2 from "@/assets/gym-2.jpg";
import gym3 from "@/assets/gym-3.jpg";
import gym4 from "@/assets/gym-4.jpg";
import gym5 from "@/assets/gym-5.jpg";
import wide from "@/assets/gallery-4.jpg";
import tall1 from "@/assets/gallery-1.jpg";
import tall2 from "@/assets/gallery-2.jpg";

const ease = [0.36, 0.6, 0, 1] as const;

// Cada fila comparte proporción para que el mosaico cierre parejo
const images = [
  { src: wide, alt: "El piso del gimnasio", span: "lg:col-span-6", ratio: "aspect-[16/7]" },
  { src: gym1, alt: "Zona de mancuernas", span: "lg:col-span-3", ratio: "aspect-[4/3]" },
  { src: gym2, alt: "Zona de peso libre", span: "lg:col-span-3", ratio: "aspect-[4/3]" },
  { src: tall1, alt: "Banco y discos", span: "lg:col-span-2", ratio: "aspect-[3/4]" },
  { src: gym3, alt: "Sala de spinning", span: "lg:col-span-2", ratio: "aspect-[3/4]" },
  { src: tall2, alt: "Máquinas guiadas", span: "lg:col-span-2", ratio: "aspect-[3/4]" },
  { src: gym4, alt: "Entrada al gimnasio", span: "lg:col-span-3", ratio: "aspect-[4/3]" },
  { src: gym5, alt: "Sala de máquinas", span: "lg:col-span-3", ratio: "aspect-[4/3]" },
];

const GallerySection = () => {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="instalaciones" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="max-w-2xl mb-12 lg:mb-16"
        >
          <p className="section-label mb-4">El lugar</p>
          <h2 className="font-display text-4xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.05]">
            Así se ve un martes cualquiera
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-3 lg:gap-4">
          {images.map((img, i) => (
            <motion.button
              key={img.alt}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease, delay: (i % 3) * 0.07 }}
              className={`relative rounded-4xl lg:rounded-5xl overflow-hidden group ${img.span} ${img.ratio}`}
              onClick={() => setLightbox(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-fluid group-hover:scale-[1.05]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-fluid" />
              <span className="absolute bottom-5 left-5 font-body text-[13px] text-foreground translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-fluid">
                {img.alt}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 w-11 h-11 rounded-full glass-card flex items-center justify-center text-foreground"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              src={lightbox}
              alt=""
              className="max-w-full max-h-[85vh] rounded-4xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
