import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import ScheduleSection from "@/components/ScheduleSection";
import RoutinesSection from "@/components/RoutinesSection";
import MembershipSection from "@/components/MembershipSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GallerySection from "@/components/GallerySection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";

const Index = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ActivitiesSection />
      <ScheduleSection />
      <MembershipSection />
      <RoutinesSection />
      <TestimonialsSection />
      <GallerySection />
      <CTABanner />
      <Footer />
      <MobileCTA />
    </main>
  );
};

export default Index;
