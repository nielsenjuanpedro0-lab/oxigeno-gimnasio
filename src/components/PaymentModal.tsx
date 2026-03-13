import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  plan: { name: string; price: string; priceNum: number } | null;
}

const PaymentModal = ({ open, onClose, plan }: PaymentModalProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dni, setDni] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan) return;
    setError("");
    setLoading(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "create-payment",
        {
          body: {
            full_name: fullName,
            email,
            phone,
            dni,
            plan: plan.name,
            plan_price: plan.priceNum,
          },
        }
      );

      if (fnError) throw new Error(fnError.message);
      if (data?.error) throw new Error(data.error);

      // Redirect to MercadoPago checkout (sandbox for test mode)
      const checkoutUrl = data.sandbox_init_point || data.init_point;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error("No se pudo generar el link de pago");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al procesar el pago";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && plan && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-card rounded-xl p-8 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display text-3xl tracking-wider mb-1">SUSCRIBITE</h3>
            <p className="font-body text-muted-foreground mb-6">
              Plan <span className="text-primary font-semibold">{plan.name}</span> — ${plan.price}/mes
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="text"
                placeholder="DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                required
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />

              {error && <p className="text-accent text-sm font-body">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground font-body font-semibold py-3 rounded-lg hover:shadow-[0_0_25px_hsl(37_91%_55%/0.4)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Procesando...
                  </>
                ) : (
                  "Pagar con MercadoPago"
                )}
              </button>

              <p className="text-xs text-muted-foreground text-center font-body">
                Serás redirigido a MercadoPago para completar el pago de forma segura.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
