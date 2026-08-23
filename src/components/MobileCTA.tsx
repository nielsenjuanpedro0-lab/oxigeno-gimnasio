import { MessageCircle } from "lucide-react";
import { usePayment } from "@/contexts/PaymentContext";

const DEFAULT_PLAN = { name: "BLACK", price: "70.000", priceNum: 70000 };
const WHATSAPP_URL = "https://wa.me/5492262664679";

const MobileCTA = () => {
  const { openPayment } = usePayment();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex gap-2 border-t border-border bg-background/95 p-3 backdrop-blur-md lg:hidden">
      <button
        onClick={() => openPayment(DEFAULT_PLAN)}
        className="btn-primary btn-md flex-1"
      >
        Asociarme
      </button>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribinos por WhatsApp"
        className="btn-secondary btn-md w-12 shrink-0 px-0"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
      </a>
    </div>
  );
};

export default MobileCTA;
