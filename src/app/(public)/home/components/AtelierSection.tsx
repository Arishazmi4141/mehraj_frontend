"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle } from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

export default function AtelierSection() {
  const scopeRef = useGsap<HTMLElement>(() => {
    gsap.fromTo(
      ".atelier-text > *",
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".atelier-text", start: "top 80%" },
      }
    );
    gsap.fromTo(
      ".atelier-image",
      { opacity: 0, scale: 1.05 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".atelier-image", start: "top 82%" },
      }
    );
  }, []);

  return (
    <section ref={scopeRef} id="the-atelier" className="relative bg-[#F6F2E9] py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 md:px-12 lg:grid-cols-2 lg:gap-20">
        <div className="atelier-image order-1 aspect-[4/5] w-full overflow-hidden bg-[#EDE6D8] lg:order-2">
          <img
            src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=900"
            alt="Master tailor at work in the MehRāj Atelier"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="atelier-text order-2 lg:order-1">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#2E4B3F]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#2E4B3F]">
              The Atelier
            </span>
          </div>

          <h2 className="max-w-md font-serif text-3xl font-light leading-[1.15] text-[#1B1B18] md:text-[2.6rem]">
            Bespoke Tailoring, <span className="italic text-[#5C2A32]">Built Around You</span>
          </h2>

          <p className="mt-6 max-w-md font-sans text-sm leading-[1.85] text-[#1B1B18]/65">
            Customise every garment from the fabric up. Every bespoke order includes
            a direct consultation with our master tailor to discuss measurements,
            fabric selection, and construction — no charge, no obligation.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              href="/atelier"
              className="inline-flex items-center gap-2 bg-[#1B1B18] px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F6F2E9] transition-colors duration-300 hover:bg-[#2E4B3F]"
            >
              Begin Bespoke Consultation
            </Link>
            <a
              href="https://wa.me/910000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#1B1B18]/25 px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18] transition-colors duration-300 hover:border-[#2E4B3F] hover:text-[#2E4B3F]"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              Message Us Directly
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}