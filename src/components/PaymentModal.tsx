import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, User, Mail, Phone, CreditCard, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  plan: { name: string; price: string; priceNum: number } | null;
}

const GYM_WHATSAPP = "5492262000000";

const PaymentModal = ({ open, onClose, plan }: PaymentModalProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setStep(1);
    setFullName("");
    setEmail("");
    setPhone("");
    setDni("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!fullName.trim() || !email.trim() || !dni.trim()) {
      setError("Completá todos los campos obligatorios");
      return;
    }
    setStep(2);
  };

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
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: window.location.origin,
        },
      });

      if (signUpError) throw new Error(signUpError.message);

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

  const inputWrapperClass = "relative group";
  const iconClass = "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors";
  const inputClass =
    "w-full bg-secondary/50 border border-border/60 rounded-xl pl-10 pr-4 py-3.5 text-foreground font-body text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary focus:bg-secondary/80 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)] transition-all duration-200";

  return (
    <AnimatePresence>
      {open && plan && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card rounded-2xl w-full max-w-md relative max-h-[90vh] overflow-y-auto border border-border/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative px-7 pt-7 pb-5 border-b border-border/30">
              <button onClick={handleClose} className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-secondary/80">
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-2xl tracking-wider leading-none">INSCRIPCIÓN</h3>
                  <p className="font-body text-xs text-muted-foreground mt-0.5">Paso {step} de 2</p>
                </div>
              </div>

              {/* Plan badge */}
              <div className="flex items-center gap-2 bg-primary/5 border border-primary/15 rounded-lg px-3.5 py-2.5">
                <span className="font-body text-sm text-muted-foreground">Plan seleccionado:</span>
                <span className="font-display text-sm text-primary tracking-wider">{plan.name}</span>
                <span className="ml-auto font-body text-sm font-semibold text-foreground">
                  ${plan.price}{plan.name === "CLASE" ? "/clase" : "/mes"}
                </span>
              </div>

              {/* Progress bar */}
              <div className="flex gap-1.5 mt-4">
                <div className="h-1 flex-1 rounded-full bg-primary transition-all duration-500" />
                <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${step === 2 ? "bg-primary" : "bg-border/50"}`} />
              </div>
            </div>

            {/* Body */}
            <div className="px-7 py-6">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.form
                    key="step1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleStep1}
                    className="space-y-4"
                  >
                    <div>
                      <label className="font-body text-xs font-medium text-foreground/80 uppercase tracking-widest mb-3 block">
                        Datos personales
                      </label>
                      <div className="space-y-3">
                        <div className={inputWrapperClass}>
                          <User className={iconClass} />
                          <input type="text" placeholder="Nombre completo *" value={fullName} onChange={(e) => setFullName(e.target.value)} required className={inputClass} />
                        </div>
                        <div className={inputWrapperClass}>
                          <Mail className={iconClass} />
                          <input type="email" placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
                        </div>
                        <div className={inputWrapperClass}>
                          <Phone className={iconClass} />
                          <input type="tel" placeholder="Teléfono (opcional)" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
                        </div>
                        <div className={inputWrapperClass}>
                          <CreditCard className={iconClass} />
                          <input type="text" placeholder="DNI *" value={dni} onChange={(e) => setDni(e.target.value)} required className={inputClass} />
                        </div>
                      </div>
                    </div>

                    {error && (
                      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-destructive text-sm font-body bg-destructive/10 rounded-lg px-3 py-2">
                        {error}
                      </motion.p>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground font-body font-semibold py-3.5 rounded-xl hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)] active:scale-[0.98] transition-all duration-300 text-sm"
                    >
                      Continuar →
                    </button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="step2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="font-body text-xs font-medium text-foreground/80 uppercase tracking-widest mb-3 block">
                        Creá tu cuenta
                      </label>
                      <div className="space-y-3">
                        <div className={inputWrapperClass}>
                          <Lock className={iconClass} />
                          <input type="password" placeholder="Contraseña (mín. 6 caracteres)" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className={inputClass} />
                        </div>
                        <div className={inputWrapperClass}>
                          <ShieldCheck className={iconClass} />
                          <input type="password" placeholder="Confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className={inputClass} />
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-secondary/40 rounded-xl p-4 space-y-1.5">
                      <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2">Resumen</p>
                      <div className="flex justify-between font-body text-sm">
                        <span className="text-muted-foreground">Nombre</span>
                        <span className="text-foreground font-medium">{fullName}</span>
                      </div>
                      <div className="flex justify-between font-body text-sm">
                        <span className="text-muted-foreground">Email</span>
                        <span className="text-foreground font-medium">{email}</span>
                      </div>
                      <div className="flex justify-between font-body text-sm">
                        <span className="text-muted-foreground">Plan</span>
                        <span className="text-primary font-semibold">{plan.name} — ${plan.price}</span>
                      </div>
                    </div>

                    {error && (
                      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-destructive text-sm font-body bg-destructive/10 rounded-lg px-3 py-2">
                        {error}
                      </motion.p>
                    )}

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => { setStep(1); setError(""); }}
                        className="px-5 py-3.5 rounded-xl border border-border/60 text-muted-foreground font-body text-sm hover:bg-secondary/60 active:scale-[0.98] transition-all duration-200"
                      >
                        ← Atrás
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-primary text-primary-foreground font-body font-semibold py-3.5 rounded-xl hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Procesando...
                          </>
                        ) : (
                          "Confirmar y Pagar"
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-muted-foreground/70 text-center font-body">
                      🔒 Serás redirigido a MercadoPago para completar el pago de forma segura.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
