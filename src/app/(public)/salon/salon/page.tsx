import SalonHero from "./components/SalonHero";
import DesignFromScratch from "./components/DesignFromScratch";
import SalonProcess from "./components/SalonProcess";
import SalonConsultants from "./components/SalonConsultants";
import SalonTestimonials from "./components/SalonTestimonials";
import SalonFAQ from "./components/SalonFAQ";
import SalonClosingCTA from "./components/SalonClosingCTA";

export default function SalonPage() {
  return (
    <main className="min-h-screen bg-[#F1EADC]">
      <SalonHero />
      <DesignFromScratch />
      <SalonProcess />
      <SalonConsultants />
      <SalonTestimonials />
      <SalonFAQ />
      <SalonClosingCTA />
    </main>
  );
}