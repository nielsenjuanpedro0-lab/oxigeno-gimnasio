import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Clock, AlertCircle, MessageCircle, Copy } from "lucide-react";
import {
  loadPending,
  clearPending,
  buildWhatsAppMessage,
  whatsAppLink,
  GYM_WHATSAPP,
  type PendingPayment,
} from "@/lib/membership";

const ease = [0.36, 0.6, 0, 1] as const;

type Result = "success" | "pending" | "failure";

interface ReturnState {
  result: Result;
  paymentId: string | null;
  pending: PendingPayment | null;
}

const COPY: Record<Result, { title: string; body: string }> = {
  success: {
    title: "Pago acreditado",
    body: "Mandanos el mensaje de acá abajo y activamos tu membresía. Ya viene con todos tus datos cargados.",
  },
  pending: {
    title: "Pago en proceso",
    body: "Mercado Pago todavía no lo confirmó. Puede tardar unos minutos. Avisanos y lo seguimos de cerca.",
  },
  failure: {
    title: "El pago no se completó",
    body: "No se descontó nada de tu cuenta. Podés intentar de nuevo o escribirnos y lo resolvemos.",
  },
};

const PaymentReturn = () => {
  const [state, setState] = useState<ReturnState | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const flag = params.get("payment");
    if (!flag) return;

    // Mercado Pago define el resultado real; el back_url es sólo la puerta de entrada
    const mpStatus = params.get("status") || params.get("collection_status");
    const result: Result =
      mpStatus === "approved" || flag === "success"
        ? "success"
        : mpStatus === "pending" || mpStatus === "in_process" || flag === "pending"
          ? "pending"
          : "failure";

    setState({
      result,
      paymentId: params.get("payment_id") || params.get("collection_id"),
      pending: loadPending(),
    });

    // Dejar la URL limpia para que un refresh no vuelva a disparar esta pantalla
    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  const close = () => {
    if (state?.result === "success") clearPending();
    setState(null);
  };

  if (!state) return null;

  const { result, paymentId, pending } = state;
  const copy = COPY[result];
  const message = pending ? buildWhatsAppMessage(pending, paymentId) : null;

  const handleCopy = () => {
    if (!message) return;
    navigator.clipboard.writeText(message).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      },
      () => setCopied(false),
    );
  };

  const Icon = result === "success" ? Check : result === "pending" ? Clock : AlertCircle;
  const tone =
    result === "success"
      ? { bg: "bg-primary/12", fg: "text-primary" }
      : result === "pending"
        ? { bg: "bg-surface-3", fg: "text-foreground/70" }
        : { bg: "bg-destructive/12", fg: "text-destructive" };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease }}
        className="fixed inset-0 z-[210] flex items-end sm:items-center justify-center bg-background/85 backdrop-blur-xl sm:p-4"
        onClick={close}
      >
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease }}
          className="glass-card rounded-t-4xl sm:rounded-4xl w-full max-w-lg relative max-h-[92vh] overflow-y-auto p-6 sm:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={close}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-surface-3/70 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>

          <div className={`w-12 h-12 rounded-2xl ${tone.bg} flex items-center justify-center mb-5`}>
            <Icon className={`w-6 h-6 ${tone.fg}`} strokeWidth={1.75} />
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight mb-2.5 pr-10">
            {copy.title}
          </h3>
          <p className="font-body text-[15px] text-muted-foreground leading-relaxed mb-6">
            {copy.body}
          </p>

          {pending && result !== "failure" && (
            <div className="bg-surface-2 rounded-3xl p-5 mb-5">
              <p className="font-body text-[13px] text-muted-foreground mb-3">
                Lo que le llega al gimnasio
              </p>
              <pre className="font-body text-[13px] text-foreground/80 leading-relaxed whitespace-pre-wrap break-words">
                {message}
              </pre>
            </div>
          )}

          <div className="space-y-3">
            {message ? (
              <a
                href={whatsAppLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => result === "success" && clearPending()}
                className="w-full bg-primary text-primary-foreground font-body font-medium py-4 rounded-full transition-all duration-500 ease-fluid hover:bg-foreground hover:text-background flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Enviar por WhatsApp
              </a>
            ) : (
              <a
                href={`https://wa.me/${GYM_WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-primary text-primary-foreground font-body font-medium py-4 rounded-full transition-all duration-500 ease-fluid hover:bg-foreground hover:text-background flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Escribirnos por WhatsApp
              </a>
            )}

            {message && (
              <button
                onClick={handleCopy}
                className="w-full font-body font-medium py-3.5 rounded-full text-foreground bg-surface-3/70 transition-all duration-500 ease-fluid hover:bg-surface-3 flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copiado" : "Copiar el mensaje"}
              </button>
            )}

            <button
              onClick={close}
              className="w-full font-body py-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {result === "failure" ? "Volver a los planes" : "Cerrar"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentReturn;
