import TierHero from "../components/tier/TierHero";
import CategoryBlock from "../components/tier/CategoryBlock";
import Commitments from "../components/tier/Commitments";
import TierClosing from "../components/tier/TierClosing";
import ServicesCTA from "../components/ServicesCTA";
import { TIER_3 } from "../data/tiers";

export default function Tier3Page() {
  return (
    <main style={{ background: "var(--color-bg)" }}>
      <TierHero tier={TIER_3} />
      {TIER_3.categories.map((category, i) => (
        <CategoryBlock key={category.heading} category={category} position={i} />
      ))}
      <Commitments commitments={TIER_3.commitments} />
      <TierClosing tier={TIER_3} />
      <ServicesCTA />
    </main>
  );
}