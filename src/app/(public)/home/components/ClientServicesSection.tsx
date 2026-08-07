"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, HelpCircle, Truck, RotateCcw, Sparkles, Ruler } from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { icon: Phone, title: "Contact", href: "/contact" },
  { icon: HelpCircle, title: "FAQs", href: "/client-services#faqs" },
  { icon: Truck, title: "Delivery", href: "/client-services#delivery" },
  { icon: RotateCcw, title: "Returns", href: "/client-services#returns" },
  { icon: Sparkles, title: "Garment Care", href: "/client-services#garment-care" },
  { icon: Ruler, title: "Size Guide", href: "/client-services#size-guide" },
];

export default function ClientServicesSection() {
  const scopeRef = useGsap<HTMLElement>(() => {
    gsap.fromTo(
      ".cs-header > *",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cs-header", start: "top 85%" },
      }
    );
    gsap.fromTo(
      ".cs-item",
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cs-grid", start: "top 84%" },
      }
    );
  }, []);

  return (
    <section ref={scopeRef} id="client-services" className="relative bg-[#EDE6D8] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="cs-header mb-14 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-[#A6906F]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#1B1B18]/70">
              Client Services
            </span>
            <span className="h-px w-6 bg-[#A6906F]" />
          </div>
          <h2 className="font-serif text-3xl font-light leading-[1.12] text-[#1B1B18] md:text-[2.6rem]">
            Everything You Need, <span className="italic text-[#5C2A32]">In One Place</span>
          </h2>
        </div>

        <div className="cs-grid grid grid-cols-2 gap-px border border-[#1B1B18]/10 bg-[#1B1B18]/10 sm:grid-cols-3 lg:grid-cols-6">
          {SERVICES.map(({ icon: Icon, title, href }) => (
            <Link
              key={title}
              href={href}
              className="cs-item group flex flex-col items-center gap-4 bg-[#F6F2E9] p-8 text-center transition-colors hover:bg-white"
            >
              <div className="flex h-11 w-11 items-center justify-center border border-[#1B1B18]/10 text-[#1B1B18] transition-colors group-hover:border-[#5C2A32] group-hover:text-[#5C2A32]">
                <Icon className="h-5 w-5" strokeWidth={1.4} />
              </div>
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18]">
                {title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}