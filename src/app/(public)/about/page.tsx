import AboutHero from "./components/AboutHero";
import CompanyStory from "./components/CompanyStory";
import MissionVision from "./components/MissionVision";
import StatsSection from "./components/StatsSection";
import Timeline from "./components/Timeline";
import WhyChoosePAS from "./components/WhyChoosePAS";

export default function AboutPage() {
  return (
    <main style={{ background: "var(--color-bg)" }}>
      <AboutHero />
      <CompanyStory />
      <MissionVision />
      <StatsSection />
      <Timeline />
      <WhyChoosePAS />
    </main>
  );
}