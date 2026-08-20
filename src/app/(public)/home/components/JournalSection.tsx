"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

export default function JournalSection() {
  const scopeRef = useGsap<HTMLElement>(() => {
    gsap.fromTo(
      ".journal-content > *",
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".journal-content", start: "top 82%" },
      }
    );
    gsap.fromTo(
      ".journal-svg path",
      { strokeDashoffset: 60 },
      {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".journal-svg", start: "top 85%" },
      }
    );
  }, []);

  return (
    <section
      ref={scopeRef}
      id="the-journal"
      className="relative overflow-hidden bg-[#F6F2E9] py-28 md:py-36"
    >
      {/* soft radial glow behind the emblem */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(92,42,50,0.06), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="journal-content relative mx-auto flex max-w-2xl flex-col items-center px-6 text-center md:px-12">
        {/* Open-book emblem */}
        <div className="journal-svg mb-8">
          <svg
            viewBox="0 0 120 90"
            className="h-16 w-auto md:h-20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Open book emblem"
          >
            <path
              d="M60 18 C50 10 30 8 14 12 L14 70 C30 66 50 68 60 76"
              stroke="#5C2A32"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="220"
            />
            <path
              d="M60 18 C70 10 90 8 106 12 L106 70 C90 66 70 68 60 76"
              stroke="#5C2A32"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="220"
            />
            <path d="M60 18 L60 76" stroke="#1B1B18" strokeWidth="1.2" strokeOpacity="0.35" />
            {/* page lines, left */}
            <path d="M22 26 L48 22" stroke="#1B1B18" strokeOpacity="0.3" strokeWidth="1" strokeLinecap="round" />
            <path d="M22 36 L48 32" stroke="#1B1B18" strokeOpacity="0.3" strokeWidth="1" strokeLinecap="round" />
            <path d="M22 46 L48 42" stroke="#1B1B18" strokeOpacity="0.3" strokeWidth="1" strokeLinecap="round" />
            {/* page lines, right */}
            <path d="M98 26 L72 22" stroke="#1B1B18" strokeOpacity="0.3" strokeWidth="1" strokeLinecap="round" />
            <path d="M98 36 L72 32" stroke="#1B1B18" strokeOpacity="0.3" strokeWidth="1" strokeLinecap="round" />
            <path d="M98 46 L72 42" stroke="#1B1B18" strokeOpacity="0.3" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>

        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#5C2A32]" />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#5C2A32]">
            The Journal
          </span>
          <span className="h-px w-8 bg-[#5C2A32]" />
        </div>

        <h2 className="font-serif text-3xl font-light leading-[1.15] text-[#1B1B18] md:text-[2.6rem]">
          Style, Craft & <span className="italic text-[#5C2A32]">Cultural History</span>
        </h2>

        <p className="mx-auto mt-5 max-w-md font-sans text-[13px] leading-[1.9] text-[#1B1B18]/60">
          Notes from the atelier — on fabric, form, and the traditions
          behind every piece we make.
        </p>

        <Link
          href="/journal"
          className="group relative mt-10 inline-flex items-center gap-3 border border-[#1B1B18]/25 px-10 py-4 font-serif text-[15px] italic text-[#1B1B18] transition-all duration-400 hover:border-[#5C2A32] hover:bg-[#1B1B18] hover:text-[#F6F2E9]"
        >
          Read The Journal
          <svg
            width="18" height="18" viewBox="0 0 18 18" fill="none"
            className="transition-transform duration-400 group-hover:translate-x-1.5"
          >
            <path d="M3 9 H15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M10 4 L15 9 L10 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}