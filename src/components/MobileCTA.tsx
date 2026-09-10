import { MessageCircle } from "lucide-react";
import { usePayment } from "@/contexts/PaymentContext";

const DEFAULT_PLAN = { name: "BLACK", price: "80.000", priceNum: 80000 };

const MobileCTA = () => {
  const { openPayment } = usePayment();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden p-3 pb-4 flex gap-2.5">
      <button
        onClick={() => openPayment(DEFAULT_PLAN)}
        className="flex-1 bg-foreground text-background font-body font-medium py-4 rounded-full text-[15px] shadow-[0_8px_32px_hsl(0_0%_0%/0.5)]"
      >
        Asociarme
      </button>
      <a
        href="https://wa.me/5492262664679"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 glass-card rounded-full flex items-center justify-center shrink-0 shadow-[0_8px_32px_hsl(0_0%_0%/0.5)]"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-5 h-5 text-foreground" strokeWidth={1.5} />
      </a>
    </div>
  );
};

export default MobileCTA;
