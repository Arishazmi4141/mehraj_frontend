import HeroSection from "@/src/app/(public)/home/components/HeroSection";
import TheHouseSection from "@/src/app/(public)/home/components/TheHouseSection";
import CollectionsSection from "@/src/app/(public)/home/components/CollectionsSection";
import TrendingSection from "@/src/app/(public)/home/components/TrendingSection";
import AtelierSection from "@/src/app/(public)/home/components/AtelierSection";
import SalonSection from "@/src/app/(public)/home/components/SalonSection";
import CraftSection from "@/src/app/(public)/home/components/CraftSection";
import JournalSection from "@/src/app/(public)/home/components/JournalSection";
import ClientServicesSection from "@/src/app/(public)/home/components/ClientServicesSection";
import FloatingSidebarNav from "@/src/app/(public)/home/components/FloatingSidebarNav";

export default function HomePage() {
  return (
    <main className="bg-[#F6F2E9] min-h-screen">
      <FloatingSidebarNav />
      <HeroSection />
      <TheHouseSection />
      <CollectionsSection />
      <TrendingSection />
      <SalonSection />
      <CraftSection />
      <JournalSection />
      <ClientServicesSection />
    </main>
  );
}