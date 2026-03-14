import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  plan: { name: string; price: string; priceNum: number } | null;
}

const GYM_WHATSAPP = "5492262000000"; // Número del gimnasio

const PaymentModal = ({ open, onClose, plan }: PaymentModalProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan) return;
    setError("");

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      // 1. Register user account
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: window.location.origin,
        },
      });

      if (signUpError) throw new Error(signUpError.message);

      // 2. Create payment preference
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

      // 3. Send WhatsApp notification to gym
      const msg = encodeURIComponent(
        `🏋️ *Nuevo cliente registrado*\n\n` +
        `👤 *Nombre:* ${fullName}\n` +
        `📧 *Email:* ${email}\n` +
        `📱 *Teléfono:* ${phone || "No proporcionado"}\n` +
        `🪪 *DNI:* ${dni}\n` +
        `📋 *Plan:* ${plan.name}\n` +
        `💰 *Precio:* $${plan.price}/mes\n\n` +
        `El cliente fue redirigido a MercadoPago para completar el pago.`
      );
      window.open(`https://api.whatsapp.com/send?phone=${GYM_WHATSAPP}&text=${msg}`, "_blank");

      // 4. Redirect to MercadoPago checkout
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

  const inputClass =
    "w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors";

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
            className="glass-card rounded-xl p-8 w-full max-w-md relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display text-3xl tracking-wider mb-1">SUSCRIBITE</h3>
            <p className="font-body text-muted-foreground mb-6">
              Plan <span className="text-primary font-semibold">{plan.name}</span> — ${plan.price}
              {plan.name === "CLASE" ? "/clase" : "/mes"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Datos personales</label>
                <div className="space-y-3">
                  <input type="text" placeholder="Nombre completo" value={fullName} onChange={(e) => setFullName(e.target.value)} required className={inputClass} />
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
                  <input type="tel" placeholder="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
                  <input type="text" placeholder="DNI" value={dni} onChange={(e) => setDni(e.target.value)} required className={inputClass} />
                </div>
              </div>

              <div>
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Crear cuenta</label>
                <div className="space-y-3">
                  <input type="password" placeholder="Contraseña (mín. 6 caracteres)" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className={inputClass} />
                  <input type="password" placeholder="Confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className={inputClass} />
                </div>
              </div>

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
                  "Registrarme y Pagar"
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
