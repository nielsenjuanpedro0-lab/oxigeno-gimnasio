import { Instagram, MessageCircle, ArrowUpRight } from "lucide-react";
import logo from "@/assets/logo.png";

const links = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Actividades", href: "#actividades" },
  { label: "Horarios", href: "#horarios" },
  { label: "Planes", href: "#membresias" },
  { label: "La app", href: "#rutinas" },
];

const Footer = () => (
  <footer id="contacto" className="pt-20 lg:pt-28 pb-28 lg:pb-12">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="surface rounded-4xl lg:rounded-6xl p-8 lg:p-14">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-5">
            <img src={logo} alt="Oxígeno Gym" className="h-11 w-auto mb-6" />
            <p className="font-body text-[15px] text-muted-foreground leading-relaxed max-w-xs mb-8">
              Sala de fuerza, cardio y aeróbica en Necochea. Abierto de corrido,
              de lunes a sábado.
            </p>
            <div className="flex gap-2.5">
              <a
                href="https://www.instagram.com/oxigeno.fitnessgym_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-surface-3/60 flex items-center justify-center text-foreground/70 hover:bg-foreground hover:text-background transition-all duration-500 ease-fluid"
                aria-label="Instagram"
              >
                <Instagram className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </a>
              <a
                href="https://wa.me/5492262664679"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-surface-3/60 flex items-center justify-center text-foreground/70 hover:bg-foreground hover:text-background transition-all duration-500 ease-fluid"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-body text-[13px] text-muted-foreground mb-5">Secciones</h4>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-body text-[15px] text-foreground/75 hover:text-foreground transition-colors duration-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-body text-[13px] text-muted-foreground mb-5">Dónde estamos</h4>
            <div className="font-body text-[15px] text-foreground/75 space-y-3">
              <p className="leading-relaxed">
                Av. 58 n° 3752 (58 y 75)
                <br />
                Dentro del Supermercado Toledo
                <br />
                Necochea, Buenos Aires (7630)
              </p>
              <a
                href="https://wa.me/5492262664679"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-foreground transition-colors duration-300 tnum"
              >
                +54 9 2262 66-4679
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
              <a
                href="https://www.instagram.com/oxigeno.fitnessgym_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-foreground transition-colors duration-300"
              >
                @oxigeno.fitnessgym_
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-16 pt-7 border-t border-border/60 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="font-body text-[13px] text-muted-foreground">
            © 2026 Gimnasio Oxígeno
          </p>
          <p className="font-body text-[13px] text-muted-foreground">
            Los precios pueden actualizarse; consultanos por WhatsApp antes de abonar.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
