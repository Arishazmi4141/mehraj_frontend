"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/src/hooks/useGsap";
import ServiceCard from "./ServiceCard";
import { Wrench, Gauge, Disc3, Sparkles } from "lucide-react";
import type { ServiceItem } from "@/src/types/service";

gsap.registerPlugin(ScrollTrigger);

const SERVICES: ServiceItem[] = [
  {
    id:          "maintenance",
    title:       "Routine Maintenance",
    description: "Oil changes, fluid checks, filters, and scheduled servicing carried out to manufacturer specification.",
    icon:        Wrench,
    href:        "/services#maintenance",
  },
  {
    id:          "diagnostics",
    title:       "Performance Diagnostics",
    description: "Full computerised diagnostics and performance tuning for engines that demand precision, not guesswork.",
    icon:        Gauge,
    href:        "/services#diagnostics",
  },
  {
    id:          "brakes-suspension",
    title:       "Brakes & Suspension",
    description: "Inspection, repair, and upgrade of braking and suspension systems for confident handling at any speed.",
    icon:        Disc3,
    href:        "/services#brakes-suspension",
  },
  {
    id:          "detailing",
    title:       "Detailing & Finish",
    description: "Paint correction, ceramic coating, and interior detailing that restores your vehicle to showroom condition.",
    icon:        Sparkles,
    href:        "/services#detailing",
  },
];

export default function ServicesSection() {
  const scopeRef = useGsap<HTMLElement>(() => {
    gsap.fromTo(".services-eyebrow", { opacity: 0, y: 14 }, {
      opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
      scrollTrigger: { trigger: ".services-heading", start: "top 86%" },
    });
    gsap.fromTo(".services-title", { opacity: 0, y: 28 }, {
      opacity: 1, y: 0, duration: 0.65, ease: "expo.out",
      scrollTrigger: { trigger: ".services-heading", start: "top 85%" }, delay: 0.1,
    });
    gsap.fromTo(".services-body", { opacity: 0, y: 18 }, {
      opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: ".services-heading", start: "top 84%" }, delay: 0.2,
    });
    gsap.fromTo(".service-card", { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, ease: "expo.out", stagger: 0.09,
      scrollTrigger: { trigger: ".services-grid", start: "top 82%" },
    });
  }, []);

  return (
    <section ref={scopeRef} className="bg-[#F7F7F4] py-20 md:py-28" id="services">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="services-heading mb-14">
          <span className="services-eyebrow font-body text-[10px] uppercase tracking-[0.3em] text-[#A9773C]" style={{ opacity: 0 }}>
            Our Services
          </span>
          <div className="mt-5 flex items-end gap-8">
            <h2
              className="services-title max-w-md font-display text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#171712] md:text-[2.6rem]"
              style={{ opacity: 0 }}
            >
              Precision Care &<br />Elite Components
            </h2>
            <div aria-hidden className="services-rule mb-2 hidden h-px flex-1 md:block bg-gradient-to-r from-[#1F4A38]/20 to-transparent" />
          </div>
          <p className="services-body mt-5 max-w-sm font-body text-[13px] leading-[1.85] text-[#6B685F]" style={{ opacity: 0 }}>
            Every service delivered with the exacting standards your luxury vehicle deserves.
          </p>
        </div>

        <div className="services-grid grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4 bg-[#E7E3D8]">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <p className="mt-10 text-center font-body text-[10px] uppercase tracking-[0.3em] text-[#B8B4A8]">
          Certified · Precision · Integrity
        </p>
      </div>
    </section>
  );
}