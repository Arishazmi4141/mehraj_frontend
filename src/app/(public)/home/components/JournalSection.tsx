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
  }, []);

  return (
    <section ref={scopeRef} id="the-journal" className="relative bg-[#F6F2E9] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="journal-header mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-6 bg-[#5C2A32]" />
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#5C2A32]">
                The Journal
              </span>
            </div>
            <h2 className="font-serif text-3xl font-light leading-[1.12] text-[#1B1B18] md:text-[2.8rem]">
              Style, Craft & <span className="italic text-[#5C2A32]">Cultural History</span>
            </h2>
          </div>
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B1B18] transition-colors hover:text-[#5C2A32]"
          >
            Read the Journal
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="journal-grid grid grid-cols-1 gap-6 sm:grid-cols-3">
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              href={`/journal/${a.slug}`}
              className="journal-card group relative flex flex-col overflow-hidden border border-[#1B1B18]/10 bg-white"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EDE6D8]">
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.3em] text-[#5C2A32]">
                  {a.kicker}
                </span>
                <h3 className="mt-2 font-serif text-lg font-light text-[#1B1B18] group-hover:text-[#5C2A32] transition-colors">
                  {a.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}