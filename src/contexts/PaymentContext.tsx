import { createContext, useContext, useState, ReactNode } from "react";
import type { PlanInfo } from "@/lib/membership";

interface PaymentContextType {
  selectedPlan: PlanInfo | null;
  openPayment: (plan: PlanInfo) => void;
  closePayment: () => void;
}

const PaymentContext = createContext<PaymentContextType | null>(null);

export const usePayment = () => {
  const ctx = useContext(PaymentContext);
  if (!ctx) throw new Error("usePayment must be used within PaymentProvider");
  return ctx;
};

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanInfo | null>(null);

  return (
    <PaymentContext.Provider
      value={{
        selectedPlan,
        openPayment: (plan) => setSelectedPlan(plan),
        closePayment: () => setSelectedPlan(null),
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
