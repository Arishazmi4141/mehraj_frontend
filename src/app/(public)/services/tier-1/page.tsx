import TierHero from "../components/tier/TierHero";
import CategoryBlock from "../components/tier/CategoryBlock";
import Commitments from "../components/tier/Commitments";
import TierClosing from "../components/tier/TierClosing";
import ServicesCTA from "../components/ServicesCTA";
import { TIER_1 } from "../data/tiers";

export default function Tier1Page() {
  return (
    <main style={{ background: "var(--color-bg)" }}>
      <TierHero tier={TIER_1} />
      {TIER_1.categories.map((category, i) => (
        <CategoryBlock key={category.heading} category={category} position={i} />
      ))}
      <Commitments commitments={TIER_1.commitments} />
      <TierClosing tier={TIER_1} />
      <ServicesCTA />
    </main>
  );
}