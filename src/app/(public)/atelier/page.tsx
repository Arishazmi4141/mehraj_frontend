"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/src/hooks/useGsap";

import AtelierHero from "./components/AtelierHero";
import AlterationsTrack from "./components/AlterationsTrack";
import RedesignTrack from "./components/RedesignTrack";
import CustomRecreationTrack from "./components/CustomRecreationTrack";
import HowItWorks from "./components/HowItWorks";
import AtelierGallery from "./components/AtelierGallery";
import AtelierCTA from "./components/AtelierCTA";
import ColorChangeTrack from "./components/ColorChangeTrack";

gsap.registerPlugin(ScrollTrigger);

export default function AtelierPage() {
  const scopeRef = useGsap<HTMLElement>(() => {
    gsap.fromTo(".atl-hero > *", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" });

    gsap.fromTo(
      ".atl-track-1",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".atl-track-1", start: "top 80%" } }
    );
    gsap.fromTo(
      ".atl-track-redesign",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".atl-track-redesign", start: "top 80%" } }
    );
    gsap.fromTo(
      ".atl-track-2",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".atl-track-2", start: "top 80%" } }
    );
    gsap.fromTo(
      ".atl-step",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".atl-steps-row", start: "top 85%" } }
    );
    gsap.fromTo(
      ".atl-gallery-item",
      { opacity: 0, scale: 1.03 },
      { opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: ".atl-gallery", start: "top 85%" } }
    );
    gsap.fromTo(
      ".atl-cta > *",
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: ".atl-cta", start: "top 85%" } }
    );
  }, []);

  return (
    <main ref={scopeRef} className="relative">
      <AtelierHero />
      <AlterationsTrack />
      <RedesignTrack />
       <ColorChangeTrack/> 
      <CustomRecreationTrack />
      <HowItWorks />
      <AtelierGallery />
      <AtelierCTA />
    </main>
  );
}