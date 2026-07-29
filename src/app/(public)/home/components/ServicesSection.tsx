"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/src/hooks/useGsap";
import ServiceCard from "./ServiceCard";
import { Scissors, Ruler, Shirt, UserCheck } from "lucide-react";
import type { ServiceItem } from "@/src/types/service";

gsap.registerPlugin(ScrollTrigger);

const SERVICES: ServiceItem[] = [
  {
    id: "su-misura",
    title: "Su Misura Tailoring",
    description: "Fully bespoke suits crafted from scratch over 48+ hours using full-canvas horsehair construction and your exact measurements.",
    icon: Scissors,
    href: "/services#su-misura",
  },
  {
    id: "private-fittings",
    title: "Private Fitting Atelier",
    description: "Personalized one-on-one consultation with master Italian tailors in our private salon or directly at your residence.",
    icon: Ruler,
    href: "/services#private-fittings",
  },
  {
    id: "fabric-curation",
    title: "Rare Fabric Selection",
    description: "Exclusive access to seasonal mills including Loro Piana, Ermenegildo Zegna, and Vitale Barberis Canonico.",
    icon: Shirt,
    href: "/services#fabric-curation",
  },
  {
    id: "wardrobe-styling",
    title: "Executive Wardrobe Styling",
    description: "Curated seasonal capsules engineered for modern executives, black-tie galas, and diplomatic occasions.",
    icon: UserCheck,
    href: "/services#wardrobe-styling",
  },
];

export default function ServicesSection() {
  const scopeRef = useGsap<HTMLElement>(() => {
    gsap.fromTo(
      ".services-eyebrow",
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-heading", start: "top 86%" },
      }
    );
    gsap.fromTo(
      ".services-title",
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "expo.out",
        scrollTrigger: { trigger: ".services-heading", start: "top 85%" },
        delay: 0.1,
      }
    );
    gsap.fromTo(
      ".services-body",
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: ".services-heading", start: "top 84%" },
        delay: 0.2,
      }
    );
    gsap.fromTo(
      ".service-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "expo.out",
        stagger: 0.09,
        scrollTrigger: { trigger: ".services-grid", start: "top 82%" },
      }
    );
  }, []);

  return (
    <section ref={scopeRef} className="bg-[#FAFAFA] py-24 md:py-32" id="services">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Editorial Heading Block */}
        <div className="services-heading mb-16">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#B89752]" />
            <span
              className="services-eyebrow font-sans text-[11px] font-semibold uppercase tracking-[0.35em] text-[#B89752]"
              style={{ opacity: 0 }}
            >
              Servizi Sartoriali
            </span>
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <h2
              className="services-title max-w-lg font-serif text-3xl font-light leading-[1.12] tracking-[-0.01em] text-[#0A1118] md:text-[2.8rem]"
              style={{ opacity: 0 }}
            >
              Bespoke Craftsmanship & <br />
              <span className="italic text-[#B89752]">Personalized Luxury</span>
            </h2>

            <div
              aria-hidden="true"
              className="services-rule mb-3 hidden h-px flex-1 md:block bg-gradient-to-r from-[#0A1118]/15 to-transparent mx-8"
            />

            <p
              className="services-body max-w-sm font-sans text-xs leading-[1.85] text-[#4A5568]"
              style={{ opacity: 0 }}
            >
              Every garment is individually cut and hand-stitched to honor the centuries-old tradition of Neapolitan tailoring.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4 bg-[#0A1118]/10 border border-[#0A1118]/10 shadow-sm">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Footer Guarantee Ticker */}
        <p className="mt-12 text-center font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#4A5568]/60">
          Fatto a Mano • Full Canvas • Loro Piana Fabrics
        </p>
      </div>
    </section>
  );
}