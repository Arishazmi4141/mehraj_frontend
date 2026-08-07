import HeroSection from "@/src/app/(public)/home/components/HeroSection";
import TheHouseSection from "@/src/app/(public)/home/components/TheHouseSection";
import CollectionsSection from "@/src/app/(public)/home/components/CollectionsSection";
import AtelierSection from "@/src/app/(public)/home/components/AtelierSection";
import SalonSection from "@/src/app/(public)/home/components/SalonSection";
import CraftSection from "@/src/app/(public)/home/components/CraftSection";
import JournalSection from "@/src/app/(public)/home/components/JournalSection";
import ClientServicesSection from "@/src/app/(public)/home/components/ClientServicesSection";

export default function HomePage() {
  return (
    <main className="bg-[#F6F2E9] min-h-screen">
      <HeroSection />
      <TheHouseSection />
      <CollectionsSection />
      <AtelierSection />
      <SalonSection />
      <CraftSection />
      <JournalSection />
      <ClientServicesSection />
    </main>
  );
}