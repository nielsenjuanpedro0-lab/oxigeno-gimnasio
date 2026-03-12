import { MessageCircle } from "lucide-react";

const MobileCTA = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-md border-t border-border p-3 flex gap-3">
    <a
      href="https://wa.me/5492262000000"
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 bg-accent text-accent-foreground font-body font-bold text-center py-3 rounded-full text-sm"
    >
      ÚNETE AHORA
    </a>
    <a
      href="https://wa.me/5492262000000"
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 bg-green-600 rounded-full flex items-center justify-center shrink-0"
    >
      <MessageCircle className="w-5 h-5 text-foreground" />
    </a>
  </div>
);

export default MobileCTA;
