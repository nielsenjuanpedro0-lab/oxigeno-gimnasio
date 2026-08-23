import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatementBand from "@/components/StatementBand";
import ActivitiesSection from "@/components/ActivitiesSection";
import ScheduleSection from "@/components/ScheduleSection";
import GallerySection from "@/components/GallerySection";
import MembershipSection from "@/components/MembershipSection";
import PartnersSection from "@/components/PartnersSection";
import RoutinesSection from "@/components/RoutinesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import PaymentModal from "@/components/PaymentModal";
import { PaymentProvider, usePayment } from "@/contexts/PaymentContext";

/**
 * Orden de la página.
 *
 * Está pensado como alternancia, no como lista: entre dos secciones altas y contenidas
 * siempre cae una franja baja o a sangre completa. De arriba a abajo el ritmo es
 * alto → alto → franja → alto → banda → a sangre → alto → alto → franja → alto.
 */
const IndexContent = () => {
  const { selectedPlan, closePayment } = usePayment();

  return (
    <main className="pb-20 lg:pb-0">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <StatementBand />
      <ActivitiesSection />
      <ScheduleSection />
      <GallerySection />
      <MembershipSection />
      <PartnersSection />
      <RoutinesSection />
      <TestimonialsSection />
      <Footer />
      <MobileCTA />
      <PaymentModal
        open={!!selectedPlan}
        onClose={closePayment}
        plan={selectedPlan}
      />
    </main>
  );
};

const Index = () => (
  <PaymentProvider>
    <IndexContent />
  </PaymentProvider>
);

export default Index;
