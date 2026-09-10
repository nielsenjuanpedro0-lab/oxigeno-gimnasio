import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Loader2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  UserPlus,
  RotateCw,
  Pencil,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  loadSocio,
  saveSocio,
  savePending,
  validateSocio,
  planUnit,
  type PlanInfo,
  type SocioData,
} from "@/lib/membership";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  plan: PlanInfo | null;
}

const ease = [0.36, 0.6, 0, 1] as const;

const EMPTY: SocioData = { full_name: "", email: "", phone: "", dni: "" };

type Step = "choose" | "form" | "confirm";

const PaymentModal = ({ open, onClose, plan }: PaymentModalProps) => {
  const [step, setStep] = useState<Step>("choose");
  const [isRenewal, setIsRenewal] = useState(false);
  const [data, setData] = useState<SocioData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof SocioData, string>>>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const saved = useMemo(() => (open ? loadSocio() : null), [open]);

  // Al abrir: si ya conocemos al socio, arranca en confirmar y no le pedimos los datos de nuevo
  useEffect(() => {
    if (!open) return;
    setErrors({});
    setFormError("");
    setLoading(false);
    if (saved) {
      setData(saved);
      setIsRenewal(true);
      setStep("confirm");
    } else {
      setData(EMPTY);
      setIsRenewal(false);
      setStep("choose");
    }
  }, [open, saved]);

  if (!plan) return null;

  const set = (k: keyof SocioData, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateSocio(data, !isRenewal);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setStep("confirm");
  };

  const startPayment = async () => {
    setFormError("");
    setLoading(true);

    // Quien renueva puede no haber dejado email; Mercado Pago igual necesita uno
    const email = data.email.trim() || `dni${data.dni.replace(/\D/g, "")}@oxigeno.local`;
    const payload = {
      full_name: data.full_name.trim(),
      email,
      phone: data.phone.trim(),
      dni: data.dni.replace(/\D/g, ""),
      plan: plan.name,
      plan_price: plan.priceNum,
    };

    try {
      const { data: res, error } = await supabase.functions.invoke("create-payment", {
        body: payload,
      });

      if (error) throw new Error(error.message);
      const checkoutUrl = res?.init_point ?? res?.sandbox_init_point;
      if (!checkoutUrl) throw new Error(res?.error || "No pudimos abrir el checkout");

      // Se guarda antes del salto: al volver de Mercado Pago armamos el alta con esto
      saveSocio({
        full_name: payload.full_name,
        email: data.email.trim(),
        phone: payload.phone,
        dni: payload.dni,
      });
      savePending({
        ...payload,
        email: data.email.trim(),
        member_id: res?.member_id,
        is_renewal: isRenewal,
        ts: Date.now(),
      });

      window.location.href = checkoutUrl;
    } catch (err: unknown) {
      // El detalle técnico va a la consola; al socio le mostramos una salida
      console.error("create-payment falló:", err);
      setFormError(
        "No pudimos abrir el checkout. Probá de nuevo en un minuto o escribinos por WhatsApp y lo resolvemos a mano.",
      );
      setLoading(false);
    }
  };

  const inputClass = (k: keyof SocioData) =>
    `w-full bg-surface-2 rounded-2xl px-4 py-3.5 text-foreground font-body text-[15px] placeholder:text-muted-foreground/70 focus:outline-none transition-all duration-300 ${
      errors[k]
        ? "shadow-[inset_0_0_0_1px_hsl(var(--destructive))]"
        : "shadow-[inset_0_0_0_1px_hsl(0_0%_100%/0.07)] focus:shadow-[inset_0_0_0_1px_hsl(var(--primary))]"
    }`;

  const field = (
    k: keyof SocioData,
    label: string,
    placeholder: string,
    type = "text",
    inputMode?: "text" | "email" | "tel" | "numeric",
  ) => (
    <div>
      <label className="font-body text-[13px] text-muted-foreground mb-2 block">
        {label}
      </label>
      <input
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        value={data[k]}
        onChange={(e) => set(k, e.target.value)}
        className={inputClass(k)}
      />
      {errors[k] && (
        <p className="font-body text-[13px] text-destructive mt-1.5">{errors[k]}</p>
      )}
    </div>
  );

  const planLabel = plan.name.charAt(0) + plan.name.slice(1).toLowerCase();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease }}
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-background/85 backdrop-blur-xl sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease }}
            className="glass-card rounded-t-4xl sm:rounded-4xl w-full max-w-lg relative max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 sm:px-8 pt-7 pb-5">
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-surface-3/70 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>

              <p className="section-label mb-3">
                {isRenewal ? "Renovación" : "Nueva membresía"}
              </p>
              <div className="flex items-baseline gap-3 flex-wrap pr-10">
                <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight">
                  Plan {planLabel}
                </h3>
                <span className="font-display text-xl font-medium text-primary tnum">
                  ${plan.price}
                  <span className="font-body text-[13px] text-muted-foreground ml-1">
                    / {planUnit(plan.name)}
                  </span>
                </span>
              </div>
            </div>

            <div className="px-6 sm:px-8 pb-8">
              {/* Sin AnimatePresence anidado: dentro del overlay ya animado, el
                  exit del paso saliente no completaba y el nuevo nunca montaba.
                  La key remonta el bloque y la animación de entrada alcanza. */}
              <div>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease }}
                >
                  {/* Paso 1 — sólo para quien no quedó guardado */}
                  {step === "choose" && (
                    <div className="space-y-3">
                    <button
                      onClick={() => {
                        setIsRenewal(false);
                        setStep("form");
                      }}
                      className="w-full surface-hover rounded-3xl p-5 flex items-center gap-4 text-left"
                    >
                      <span className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                        <UserPlus className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      </span>
                      <span className="flex-1">
                        <span className="block font-body font-medium text-foreground">
                          Es mi primera vez
                        </span>
                        <span className="block font-body text-[13px] text-muted-foreground mt-0.5">
                          Cargás tus datos una sola vez
                        </span>
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </button>

                    <button
                      onClick={() => {
                        setIsRenewal(true);
                        setStep("form");
                      }}
                      className="w-full surface-hover rounded-3xl p-5 flex items-center gap-4 text-left"
                    >
                      <span className="w-11 h-11 rounded-2xl bg-surface-3 flex items-center justify-center shrink-0">
                        <RotateCw className="w-5 h-5 text-foreground/70" strokeWidth={1.5} />
                      </span>
                      <span className="flex-1">
                        <span className="block font-body font-medium text-foreground">
                          Ya soy socio
                        </span>
                        <span className="block font-body text-[13px] text-muted-foreground mt-0.5">
                          Con tu nombre y DNI alcanza
                        </span>
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </button>
                    </div>
                  )}

                  {/* Paso 2 — datos */}
                  {step === "form" && (
                    <form onSubmit={submitForm} className="space-y-4">
                    {field("full_name", "Nombre y apellido", "Juan Pérez")}
                    {field("dni", "DNI", "30123456", "text", "numeric")}

                    {!isRenewal && (
                      <>
                        {field("email", "Email", "juan@email.com", "email", "email")}
                        {field("phone", "Teléfono (opcional)", "2262 66-4679", "tel", "tel")}
                      </>
                    )}

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(saved ? "confirm" : "choose")}
                        className="w-12 h-[52px] rounded-full bg-surface-3/70 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300 shrink-0"
                        aria-label="Volver"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-foreground text-background font-body font-medium py-3.5 rounded-full transition-all duration-500 ease-fluid hover:bg-primary hover:text-primary-foreground"
                      >
                        Continuar
                      </button>
                    </div>
                    </form>
                  )}

                  {/* Paso 3 — confirmar y pagar */}
                  {step === "confirm" && (
                    <div className="space-y-5">
                    <div className="bg-surface-2 rounded-3xl p-5">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <p className="font-body text-[13px] text-muted-foreground">
                          {saved ? "Tus datos guardados" : "Revisá que esté bien"}
                        </p>
                        <button
                          onClick={() => setStep("form")}
                          className="flex items-center gap-1.5 font-body text-[13px] text-foreground/70 hover:text-foreground transition-colors duration-300 shrink-0"
                        >
                          <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                          Editar
                        </button>
                      </div>

                      <dl className="space-y-2.5">
                        {([
                          ["Nombre", data.full_name],
                          ["DNI", data.dni],
                          ...(data.email ? [["Email", data.email]] : []),
                          ...(data.phone ? [["Teléfono", data.phone]] : []),
                        ] as [string, string][]).map(([k, v]) => (
                          <div key={k} className="flex justify-between gap-4 font-body text-[15px]">
                            <dt className="text-muted-foreground shrink-0">{k}</dt>
                            <dd className="text-foreground text-right break-words min-w-0">{v}</dd>
                          </div>
                        ))}
                        <div className="pt-2.5 mt-1 border-t border-border/60 flex justify-between gap-4 font-body text-[15px]">
                          <dt className="text-muted-foreground">Total</dt>
                          <dd className="text-foreground font-medium tnum">
                            ${plan.price} / {planUnit(plan.name)}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {formError && (
                      <p className="font-body text-[15px] text-destructive bg-destructive/10 rounded-2xl px-4 py-3 leading-relaxed">
                        {formError}
                      </p>
                    )}

                    <button
                      onClick={startPayment}
                      disabled={loading}
                      className="group w-full bg-primary text-primary-foreground font-body font-medium py-4 rounded-full transition-all duration-500 ease-fluid hover:bg-foreground hover:text-background disabled:opacity-60 disabled:cursor-wait flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Abriendo Mercado Pago…
                        </>
                      ) : (
                        <>
                          Pagar con Mercado Pago
                          <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-fluid group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <p className="flex items-start gap-2 font-body text-[13px] text-muted-foreground leading-relaxed">
                      <ShieldCheck className="w-4 h-4 mt-px shrink-0" strokeWidth={1.5} />
                      Te llevamos al checkout de Mercado Pago. Cuando vuelvas, te
                      damos el mensaje listo para que el gimnasio active tu
                      membresía.
                    </p>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
