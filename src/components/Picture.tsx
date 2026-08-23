import { useState } from "react";

interface PictureProps {
  /** WebP grande, para desktop y pantallas de alta densidad. */
  src: string;
  /** WebP chico, para mobile. */
  srcSmall: string;
  alt: string;
  /** Dimensiones intrínsecas: sin ellas el navegador no reserva el espacio y la página salta. */
  width: number;
  height: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

/**
 * Imagen con srcset, dimensiones explícitas y aparición suave.
 *
 * Tres cosas que la versión anterior no hacía:
 *
 * 1. Servía el JPEG completo a cualquier viewport. Un celular descargaba 640 KB para
 *    pintarlos en 350 px de ancho.
 * 2. No declaraba width/height, así que el navegador no reservaba espacio y el
 *    contenido saltaba al cargar cada foto.
 * 3. Las imágenes aparecían de golpe. Ahora entran con un fundido corto sobre el
 *    fondo, que además disimula la carga progresiva.
 */
const Picture = ({
  src,
  srcSmall,
  alt,
  width,
  height,
  sizes = "100vw",
  className = "",
  priority = false,
}: PictureProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      srcSet={`${srcSmall} 700w, ${src} 1400w`}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      // Prioridad alta solo en la imagen del hero: es el Largest Contentful Paint.
      //
      // Va en minúsculas y por spread porque React 18 no reconoce `fetchPriority` en
      // camelCase: lo deja pasar sin traducir y avisa por consola. React 19 sí lo
      // acepta; hasta entonces, el nombre del atributo tal cual lo define el HTML.
      {...({ fetchpriority: priority ? "high" : "auto" } as Record<string, string>)}
      decoding={priority ? "sync" : "async"}
      onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-700 ease-out ${
        loaded || priority ? "opacity-100" : "opacity-0"
      }`}
    />
  );
};

export default Picture;
