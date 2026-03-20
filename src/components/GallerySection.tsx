import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Expand } from "lucide-react";
import gym1 from "@/assets/gym-1.jpg";
import gym2 from "@/assets/gym-2.jpg";
import gym3 from "@/assets/gym-3.jpg";
import gym4 from "@/assets/gym-4.jpg";
import gym5 from "@/assets/gym-5.jpg";

const images = [
  { src: gym1, alt: "Zona de mancuernas", span: "col-span-2 row-span-2" },
  { src: gym2, alt: "Zona de peso libre", span: "" },
  { src: gym3, alt: "Zona de spinning", span: "" },
  { src: gym4, alt: "Entrada al gimnasio", span: "" },
  { src: gym5, alt: "Sala de máquinas", span: "" },
];

const GallerySection = () => {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="instalaciones" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">INSTALACIONES</p>
          <h2 className="font-display text-5xl lg:text-6xl tracking-tight">
            NUESTRO <span className="text-gradient-amber">ESPACIO</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative rounded-xl overflow-hidden group cursor-pointer ${img.span}`}
              onClick={() => setLightbox(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover min-h-[200px] group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/50 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 font-body text-sm text-foreground">
                  <Expand className="w-5 h-5" /> VER MÁS
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 text-foreground hover:text-primary">
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={lightbox}
              alt="Gallery"
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
