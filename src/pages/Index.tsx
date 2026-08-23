import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import ScheduleSection from "@/components/ScheduleSection";
import RoutinesSection from "@/components/RoutinesSection";
import MembershipSection from "@/components/MembershipSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import PaymentModal from "@/components/PaymentModal";
import { PaymentProvider, usePayment } from "@/contexts/PaymentContext";

const IndexContent = () => {
  const { selectedPlan, closePayment } = usePayment();

  return (
    <main className="pb-20 lg:pb-0">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ActivitiesSection />
      <ScheduleSection />
      <GallerySection />
      <MembershipSection />
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
