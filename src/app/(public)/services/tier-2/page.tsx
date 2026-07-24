import TierHero from "../components/tier/TierHero";
import CategoryBlock from "../components/tier/CategoryBlock";
import Commitments from "../components/tier/Commitments";
import TierClosing from "../components/tier/TierClosing";
import ServicesCTA from "../components/ServicesCTA";
import { TIER_2 } from "../data/tiers";

export default function Tier2Page() {
  return (
    <main style={{ background: "var(--color-bg)" }}>
      <TierHero tier={TIER_2} />
      {TIER_2.categories.map((category, i) => (
        <CategoryBlock key={category.heading} category={category} position={i} />
      ))}
      <Commitments commitments={TIER_2.commitments} />
      <TierClosing tier={TIER_2} />
      <ServicesCTA />
    </main>
  );
}