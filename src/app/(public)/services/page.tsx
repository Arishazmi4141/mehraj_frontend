import ServicesHero from "./components/ServicesHero";
import TierGrid from "./components/TierGrid";
import ServicesCTA from "./components/ServicesCTA";

export default function ServicesPage() {
  return (
    <main style={{ background: "var(--color-bg)" }}>
      <ServicesHero />
      <TierGrid />
      <ServicesCTA />
    </main>
  );
}