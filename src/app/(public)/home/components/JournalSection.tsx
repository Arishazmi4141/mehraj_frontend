"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

const ARTICLES = [
  {
    slug: "art-of-the-bandhgala",
    title: "The Art of the Bandhgala",
    kicker: "Style Guide",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "inside-the-embroidery-room",
    title: "Inside the Embroidery Room",
    kicker: "Craftsmanship",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "a-history-of-the-sherwani",
    title: "A History of the Sherwani",
    kicker: "Cultural History",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=800",
  },
];

export default function JournalSection() {
  const scopeRef = useGsap<HTMLElement>(() => {
    gsap.fromTo(
      ".journal-header > *",
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".journal-header", start: "top 85%" },
      }
    );
    gsap.fromTo(
      ".journal-card",
      { opacity: 0, y: 34 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".journal-grid", start: "top 82%" },
      }
    );
    gsap.fromTo(
      ".journal-cta",
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".journal-cta", start: "top 90%" },
      }
    );
  }, []);

  return (
    <section ref={scopeRef} id="the-journal" className="relative bg-[#F6F2E9] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="journal-header mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#5C2A32]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#5C2A32]">
              The Journal
            </span>
            <span className="h-px w-8 bg-[#5C2A32]" />
          </div>
          <h2 className="font-serif text-3xl font-light leading-[1.12] text-[#1B1B18] md:text-[2.8rem]">
            Style, Craft & <span className="italic text-[#5C2A32]">Cultural History</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-[13px] leading-[1.85] text-[#1B1B18]/60">
            Notes from the atelier — on fabric, form, and the traditions
            behind every piece we make.
          </p>
        </div>

        <div className="journal-grid grid grid-cols-1 gap-6 sm:grid-cols-3">
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              href={`/journal/${a.slug}`}
              className="journal-card group relative flex flex-col overflow-hidden border border-[#1B1B18]/10 bg-white transition-shadow duration-500 hover:shadow-[0_24px_60px_-30px_rgba(27,27,24,0.35)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EDE6D8]">
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1B1B18]/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.3em] text-[#5C2A32]">
                  {a.kicker}
                </span>
                <h3 className="mt-2 font-serif text-lg font-light leading-snug text-[#1B1B18] transition-colors group-hover:text-[#5C2A32]">
                  {a.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18]/50 transition-colors group-hover:text-[#5C2A32]">
                  Read More
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="journal-cta mt-16 flex justify-center">
          <Link
            href="/journal"
            className="group inline-flex items-center gap-2.5 rounded-sm border border-[#1B1B18]/20 px-9 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B1B18] transition-colors hover:border-[#5C2A32] hover:bg-[#5C2A32] hover:text-[#F6F2E9]"
          >
            Read The Journal
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}