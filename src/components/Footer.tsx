import { Flame, Instagram, MessageCircle } from "lucide-react";

const Footer = () => (
  <footer id="contacto" className="py-16 lg:py-24 border-t border-border">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
        {/* Logo & social */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-6 h-6 text-primary" />
            <span className="font-display text-2xl tracking-wider text-foreground">
              OXÍGENO <span className="text-primary">GYM</span>
            </span>
          </div>
          <p className="font-body text-sm text-muted-foreground mb-6">
            Fuerza, comunidad y resultados reales en Necochea.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/oxigeno.fitnessgym_"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/5492262000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-green-500 hover:border-green-500/50 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-display text-xl tracking-wider mb-4">LINKS</h4>
          <ul className="space-y-2">
            {["Inicio", "Nosotros", "Actividades", "Rutinas", "Membresías"].map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                  className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Address */}
        <div>
          <h4 className="font-display text-xl tracking-wider mb-4">CONTACTO</h4>
          <div className="font-body text-sm text-muted-foreground space-y-2">
            <p>Av 58 n° 3752</p>
            <p>Necochea, Argentina 7630</p>
            <a
              href="https://wa.me/5492262000000"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-primary transition-colors"
            >
              WhatsApp: +54 9 2262 000000
            </a>
            <a
              href="https://www.instagram.com/oxigeno.fitnessgym_"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-primary transition-colors"
            >
              @oxigeno.fitnessgym_
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-border text-center">
        <p className="font-body text-xs text-muted-foreground">
          © 2026 Gimnasio Oxígeno. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
