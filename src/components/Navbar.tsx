import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { usePayment } from "@/contexts/PaymentContext";
import AuthModal from "./AuthModal";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Actividades", href: "#actividades" },
  { label: "Horarios", href: "#horarios" },
  { label: "Membresías", href: "#membresias" },
  { label: "Contacto", href: "#contacto" },
];

const DEFAULT_PLAN = { name: "BLACK", price: "70.000", priceNum: 70000 };

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, logout } = useAuth();
  const { openPayment } = usePayment();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 lg:h-20">
          <a href="#inicio" className="flex items-center">
            <img src={logo} alt="Oxígeno Gym" className="h-10 lg:h-14 w-auto" />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{user.name}</span>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Cerrar sesión
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Ingresar
              </button>
            )}
            <button
              onClick={() => openPayment(DEFAULT_PLAN)}
              className="btn-primary btn-sm"
            >
              Únete ahora
            </button>
          </div>

          <button
            className="lg:hidden text-foreground"
            aria-label="Abrir menú"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-5 right-5 text-foreground"
              aria-label="Cerrar menú"
              onClick={() => setMobileOpen(false)}
            >
              <X className="w-7 h-7" />
            </button>
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-3xl font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <button
                onClick={() => { openPayment(DEFAULT_PLAN); setMobileOpen(false); }}
                className="btn-primary btn-md mt-4"
              >
                Únete ahora
              </button>
              {user ? (
                <button
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="text-muted-foreground hover:text-primary transition-colors font-body"
                >
                  Cerrar sesión ({user.name})
                </button>
              ) : (
                <button
                  onClick={() => { setAuthOpen(true); setMobileOpen(false); }}
                  className="text-primary font-body text-lg"
                >
                  Ingresar
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Navbar;
