"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Palette, CalendarHeart, MessageCircle } from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

const SALON_SERVICES = [
  { icon: Sparkles, title: "Wardrobe Planning", body: "A curated capsule wardrobe built around how you actually live and dress." },
  { icon: Palette, title: "Colour Consultation", body: "Personal palette guidance to refine every future purchase you make." },
  { icon: CalendarHeart, title: "Event Styling", body: "Complete looks for weddings, business, and every occasion in between." },
];

export default function SalonSection() {
  const scopeRef = useGsap<HTMLElement>(() => {
    gsap.fromTo(
      ".salon-header > *",
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".salon-header", start: "top 85%" },
      }
    );
    gsap.fromTo(
      ".salon-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".salon-grid", start: "top 82%" },
      }
    );
  }, []);

  return (
    <section ref={scopeRef} id="the-salon" className="relative bg-[#F1EADC] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="salon-header mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-[#5C2A32]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#5C2A32]">
              The Salon
            </span>
            <span className="h-px w-6 bg-[#5C2A32]" />
          </div>
          <h2 className="font-serif text-3xl font-light leading-[1.12] text-[#1B1B18] md:text-[2.8rem]">
            Personal Styling, <span className="italic text-[#5C2A32]">By Appointment</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md font-sans text-xs leading-[1.85] text-[#1B1B18]/60">
            Book a fashion consultant for wardrobe planning, event styling, and
            colour consultation — tailored to how you want to be seen.
          </p>
        </div>

        <div className="salon-grid grid grid-cols-1 gap-6 sm:grid-cols-3">
          {SALON_SERVICES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="salon-card border border-[#1B1B18]/10 bg-[#F6F2E9] p-8">
              <div className="mb-6 flex h-11 w-11 items-center justify-center border border-[#1B1B18]/10 bg-[#F1EADC] text-[#5C2A32]">
                <Icon className="h-5 w-5" strokeWidth={1.4} />
              </div>
              <h3 className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18]">
                {title}
              </h3>
              <p className="mt-3 font-sans text-[12.5px] leading-[1.8] text-[#1B1B18]/60">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 bg-[#1B1B18] px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F6F2E9] transition-colors duration-300 hover:bg-[#5C2A32]"
          >
            Book a Consultant
          </Link>
        </div>
      </div>
    </section>
  );
}