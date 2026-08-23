import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { X, Loader2, User, Mail, Phone, CreditCard, Copy, CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  plan: { name: string; price: string; priceNum: number } | null;
}

const GYM_WHATSAPP = "5492262664679";

// Mock transfer data — replace with real data
const TRANSFER_DATA = {
  alias: "OXIGENO.GYM.MP",
  cvu: "0000003100012345678901",
  titular: "Oxígeno Gym",
};

const PaymentModal = ({ open, onClose, plan }: PaymentModalProps) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dni, setDni] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const resetForm = () => {
    setStep(1);
    setFullName("");
    setEmail("");
    setPhone("");
    setDni("");
    setError("");
    setCopied(null);
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

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan) return;
    setError("");
    setLoading(true);

    try {
      // Save member in DB
      const { error: dbError } = await supabase
        .from("members")
        .insert({
          full_name: fullName,
          email,
          phone,
          dni,
          plan: plan.name,
          plan_price: plan.priceNum,
          payment_status: "pending",
        });

      if (dbError) throw new Error(dbError.message);

      setStep(3);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al registrar";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `🏋️ *Nuevo inscripto — Oxígeno Gym*\n\n` +
      `👤 *Nombre:* ${fullName}\n` +
      `📧 *Email:* ${email}\n` +
      `📱 *Teléfono:* ${phone || "No proporcionado"}\n` +
      `🪪 *DNI:* ${dni}\n` +
      `📋 *Plan:* ${plan?.name}\n` +
      `💰 *Precio:* $${plan?.price}\n\n` +
      `💳 Adjunto comprobante de transferencia.`
    );
    window.open(`https://wa.me/${GYM_WHATSAPP}?text=${msg}`, "_blank");
  };

  const inputWrapperClass = "relative group";
  const iconClass = "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors";
  const inputClass =
    "w-full bg-secondary/50 border border-border/60 rounded-xl pl-10 pr-4 py-3.5 text-foreground font-body text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary focus:bg-secondary/80 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)] transition-all duration-200";

  const totalSteps = 3;

  return (
    <AnimatePresence>
      {open && plan && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <m.div
            initial={{ y: 20, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-surface-2 rounded-sm w-full max-w-md relative max-h-[90vh] overflow-y-auto border border-border"
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
                  <p className="font-body text-xs text-muted-foreground mt-0.5">Paso {step} de {totalSteps}</p>
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
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${s <= step ? "bg-primary" : "bg-border/50"}`} />
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="px-7 py-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <m.form
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
                      <m.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-destructive text-sm font-body bg-destructive/10 rounded-lg px-3 py-2">
                        {error}
                      </m.p>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground font-body font-semibold py-3.5 rounded-xl hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)] active:scale-[0.98] transition-all duration-300 text-sm"
                    >
                      Continuar →
                    </button>
                  </m.form>
                )}

                {step === 2 && (
                  <m.form
                    key="step2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleStep2}
                    className="space-y-4"
                  >
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
                        <span className="text-muted-foreground">DNI</span>
                        <span className="text-foreground font-medium">{dni}</span>
                      </div>
                      <div className="flex justify-between font-body text-sm">
                        <span className="text-muted-foreground">Plan</span>
                        <span className="text-primary font-semibold">{plan.name} — ${plan.price}</span>
                      </div>
                    </div>

                    {error && (
                      <m.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-destructive text-sm font-body bg-destructive/10 rounded-lg px-3 py-2">
                        {error}
                      </m.p>
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
                            <Loader2 className="w-4 h-4 animate-spin" /> Registrando...
                          </>
                        ) : (
                          "Confirmar registro"
                        )}
                      </button>
                    </div>
                  </m.form>
                )}

                {step === 3 && (
                  <m.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-3">
                        <CheckCircle2 className="w-7 h-7 text-green-500" />
                      </div>
                      <h4 className="font-display text-xl tracking-wider mb-1">¡REGISTRO EXITOSO!</h4>
                      <p className="font-body text-sm text-muted-foreground">
                        Ahora realizá la transferencia y envianos el comprobante
                      </p>
                    </div>

                    {/* Transfer details */}
                    <div className="bg-secondary/50 border border-border/50 rounded-xl p-5 space-y-4">
                      <p className="font-body text-xs font-medium text-foreground/80 uppercase tracking-widest">
                        Datos para transferir
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-body text-xs text-muted-foreground">Alias</p>
                            <p className="font-body text-sm font-semibold text-foreground">{TRANSFER_DATA.alias}</p>
                          </div>
                          <button
                            onClick={() => handleCopy(TRANSFER_DATA.alias, "alias")}
                            className="flex items-center gap-1.5 text-xs font-body text-primary hover:text-primary/80 bg-primary/10 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            {copied === "alias" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            {copied === "alias" ? "Copiado" : "Copiar"}
                          </button>
                        </div>

                        <div className="border-t border-border/30" />

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-body text-xs text-muted-foreground">CVU</p>
                            <p className="font-body text-sm font-semibold text-foreground break-all">{TRANSFER_DATA.cvu}</p>
                          </div>
                          <button
                            onClick={() => handleCopy(TRANSFER_DATA.cvu, "cvu")}
                            className="flex items-center gap-1.5 text-xs font-body text-primary hover:text-primary/80 bg-primary/10 px-3 py-1.5 rounded-lg transition-colors shrink-0 ml-3"
                          >
                            {copied === "cvu" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            {copied === "cvu" ? "Copiado" : "Copiar"}
                          </button>
                        </div>

                        <div className="border-t border-border/30" />

                        <div>
                          <p className="font-body text-xs text-muted-foreground">Titular</p>
                          <p className="font-body text-sm font-semibold text-foreground">{TRANSFER_DATA.titular}</p>
                        </div>

                        <div className="border-t border-border/30" />

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-body text-xs text-muted-foreground">Monto a transferir</p>
                            <p className="font-display text-lg text-primary">${plan.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp CTA */}
                    <button
                      onClick={handleWhatsApp}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-body font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all duration-300 text-sm"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Enviar comprobante por WhatsApp
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <p className="text-xs text-muted-foreground/70 text-center font-body">
                      Una vez confirmado el pago, te habilitamos el acceso al gym 💪
                    </p>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
