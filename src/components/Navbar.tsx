import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePayment } from "@/contexts/PaymentContext";
import logo from "@/assets/logo.png";

const ease = [0.36, 0.6, 0, 1] as const;

const navLinks = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Actividades", href: "#actividades" },
  { label: "Horarios", href: "#horarios" },
  { label: "Planes", href: "#membresias" },
  { label: "Contacto", href: "#contacto" },
];

const DEFAULT_PLAN = { name: "BLACK", price: "80.000", priceNum: 80000 };

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openPayment } = usePayment();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 pt-3 lg:pt-5 px-4 lg:px-8">
        <div
          className={`container mx-auto flex items-center justify-between rounded-full transition-all duration-700 ease-fluid ${
            scrolled
              ? "glass-card h-14 lg:h-16 px-4 lg:px-5"
              : "h-14 lg:h-16 px-0 lg:px-1"
          }`}
        >
          <a href="#inicio" className="flex items-center shrink-0">
            <img src={logo} alt="Oxígeno Gym" className="h-9 lg:h-11 w-auto" />
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-[15px] text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-full transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => openPayment(DEFAULT_PLAN)}
              className="bg-foreground text-background font-body font-medium text-[15px] px-5 py-2.5 rounded-full transition-all duration-500 ease-fluid hover:bg-primary hover:text-primary-foreground"
            >
              Asociarme
            </button>
          </div>

          <button
            className="lg:hidden w-10 h-10 -mr-2 flex items-center justify-center text-foreground"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="fixed inset-0 z-[100] bg-background/97 backdrop-blur-2xl flex flex-col justify-center px-8"
          >
            <button
              className="absolute top-6 right-6 w-11 h-11 rounded-full surface flex items-center justify-center text-foreground"
              onClick={() => setMobileOpen(false)}
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease, delay: 0.05 + i * 0.06 }}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-4xl font-medium tracking-[-0.03em] text-foreground py-2.5"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.4 }}
              className="flex flex-col gap-3 mt-12"
            >
              <button
                onClick={() => {
                  openPayment(DEFAULT_PLAN);
                  setMobileOpen(false);
                }}
                className="bg-foreground text-background font-body font-medium py-4 rounded-full"
              >
                Asociarme
              </button>
              <a
                href="https://wa.me/5492262664679"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="surface font-body text-foreground py-4 rounded-full text-center"
              >
                Escribirnos por WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
