import HeroSection from "./components/HeroSection";
import TheHouseSection from "./components/TheHouseSection";
import CollectionsSection from "./components/CollectionsSection";
import AtelierSection from "./components/AtelierSection";
import SalonSection from "./components/SalonSection";
import CraftSection from "./components/CraftSection";
import TrendingSection from "./components/TrendingSection";
import JournalSection from "./components/JournalSection";
import ClientServicesSection from "./components/ClientServicesSection";
import FloatingSidebarNav from "./components/FloatingSidebarNav";

export default function HomePage() {
  return (
    <main className="relative">
      <HeroSection />
      <FloatingSidebarNav />
      <TheHouseSection />
      <CollectionsSection />
      <AtelierSection />
      <SalonSection />
      <CraftSection />
      <TrendingSection />
      <JournalSection />
      <ClientServicesSection />
    </main>
  );
}