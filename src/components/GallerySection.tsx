import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import gym1 from "@/assets/gym-1.webp";
import gym1sm from "@/assets/gym-1@sm.webp";
import gym2 from "@/assets/gym-2.webp";
import gym2sm from "@/assets/gym-2@sm.webp";
import gym3 from "@/assets/gym-3.webp";
import gym3sm from "@/assets/gym-3@sm.webp";
import gym4 from "@/assets/gym-4.webp";
import gym4sm from "@/assets/gym-4@sm.webp";
import gym5 from "@/assets/gym-5.webp";
import gym5sm from "@/assets/gym-5@sm.webp";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const images = [
  { src: gym1, sm: gym1sm, alt: "Zona de mancuernas", span: "col-span-2 row-span-2" },
  { src: gym2, sm: gym2sm, alt: "Zona de peso libre", span: "" },
  { src: gym3, sm: gym3sm, alt: "Zona de spinning", span: "" },
  { src: gym4, sm: gym4sm, alt: "Entrada al gimnasio", span: "" },
  { src: gym5, sm: gym5sm, alt: "Sala de máquinas", span: "" },
];

const GallerySection = () => {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  // Escape cierra el lightbox: antes solo se cerraba haciendo clic en el fondo.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <section id="instalaciones" className="bg-surface-1 py-24 lg:py-36">
      <div className="container">
        <SectionHeader label="Instalaciones" title="NUESTRO ESPACIO" align="center" />
      </div>

      {/*
        El mosaico sale del contenedor y llega a los bordes de la pantalla. Es el único
        bloque de la página que lo hace, y ese contraste es justamente lo que evita que
        todas las secciones se lean iguales.
      */}
      <Reveal className="mt-14 lg:mt-16">
        <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-4 lg:gap-2">
          {images.map((img) => (
            <button
                key={img.alt}
                type="button"
                onClick={() => setLightbox(img)}
                aria-label={`Ampliar imagen: ${img.alt}`}
                className={`group relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1 ${img.span}`}
              >
                <img
                  src={img.src}
                  srcSet={`${img.sm} 700w, ${img.src} 1400w`}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  alt={img.alt}
                  width={1400}
                  height={788}
                  loading="lazy"
                  decoding="async"
                  className="h-full min-h-[160px] w-full object-cover transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-80 sm:min-h-[200px]"
                />
                <span className="section-label absolute bottom-3 left-3 text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {img.alt}
                </span>
            </button>
          ))}
        </div>
      </Reveal>

      <AnimatePresence>
        {lightbox && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.alt}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 p-4 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              aria-label="Cerrar imagen"
              className="absolute right-5 top-5 text-foreground hover:text-primary transition-colors"
            >
              <X className="h-7 w-7" />
            </button>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-h-[85vh] max-w-full object-contain"
            />
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
