import { Instagram, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

const WHATSAPP_URL = "https://wa.me/5492262664679";
const INSTAGRAM_URL = "https://www.instagram.com/oxigeno.fitnessgym_";

const navegacion = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Actividades", href: "#actividades" },
  { label: "Horarios", href: "#horarios" },
  { label: "Membresías", href: "#membresias" },
  { label: "Convenios", href: "#convenios" },
];

const horarios = [
  ["Lunes a viernes", "07:00 — 21:30"],
  ["Sábados", "08:00 — 14:00"],
  ["Domingos", "Cerrado"],
];

/**
 * Pie de página.
 *
 * Antes encabezaba con un ícono genérico de llama y el nombre en texto, teniendo el
 * gimnasio un logotipo propio: usar un pictograma de librería donde va la marca es de
 * las cosas que más abaratan una página.
 *
 * Suma los horarios, que es lo que más se busca en el pie de un gimnasio, y ordena
 * todo en una grilla de cuatro columnas en vez de tres bloques sueltos.
 */
const Footer = () => (
  <footer id="contacto" className="border-t border-border bg-surface-1 pt-20 lg:pt-28">
    <div className="container">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <img
            src={logo}
            alt="Gimnasio Oxígeno"
            width={160}
            height={56}
            className="h-14 w-auto"
            loading="lazy"
          />
          <p className="mt-6 max-w-xs font-body text-sm leading-relaxed text-muted-foreground">
            Fuerza, comunidad y resultados reales en Necochea.
          </p>

          <div className="mt-8 flex gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Gimnasio Oxígeno"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Instagram className="h-[18px] w-[18px]" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Gimnasio Oxígeno"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <MessageCircle className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>

        <nav className="lg:col-span-3" aria-label="Navegación del pie">
          <h2 className="section-label text-primary">Navegación</h2>
          <ul className="mt-6 space-y-3.5">
            {navegacion.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <h2 className="section-label text-primary">Horarios</h2>
          <dl className="mt-6 space-y-3.5">
            {horarios.map(([dia, hora]) => (
              <div key={dia}>
                <dt className="font-body text-sm text-muted-foreground">{dia}</dt>
                <dd className="data mt-0.5 font-body text-sm text-foreground/85">{hora}</dd>
              </div>
            ))}
          </dl>
        </div>

        <address className="not-italic lg:col-span-3">
          <h2 className="section-label text-primary">Contacto</h2>
          <div className="mt-6 space-y-3.5 font-body text-sm text-muted-foreground">
            <p className="text-foreground/85">
              Av. 58 n° 3752
              <br />
              Necochea, Buenos Aires (7630)
            </p>
            <p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="link-underline">
                +54 9 2262 66-4679
              </a>
            </p>
            <p>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="link-underline">
                @oxigeno.fitnessgym_
              </a>
            </p>
          </div>
        </address>
      </div>

      <div className="mt-16 flex flex-col gap-3 border-t border-border py-8 sm:flex-row sm:items-center sm:justify-between lg:mt-20">
        <p className="font-body text-xs text-muted-foreground">
          © 2026 Gimnasio Oxígeno
        </p>
        <p className="font-body text-xs text-muted-foreground">
          Av. 58 n° 3752, Necochea, Buenos Aires
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
