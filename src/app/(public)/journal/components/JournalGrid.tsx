// (public)/journal/components/JournalGrid.tsx
"use client";

import Link from "next/link";
import { Journal } from "@/src/types/journal.types";

function truncate(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max).trimEnd() + "…" : clean;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function JournalGrid({ journals, loading }: { journals: Journal[]; loading: boolean }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse border border-[#1B1B18]/10 bg-white">
            <div className="aspect-[4/3] w-full bg-[#EDE6D8]" />
            <div className="space-y-2 p-6">
              <div className="h-2 w-16 bg-[#EDE6D8]" />
              <div className="h-4 w-3/4 bg-[#EDE6D8]" />
              <div className="h-3 w-full bg-[#EDE6D8]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (journals.length === 0) {
    return (
      <div className="border border-[#1B1B18]/10 bg-white p-16 text-center">
        <p className="font-serif text-lg font-light text-[#1B1B18]">No entries yet</p>
        <p className="mt-2 font-sans text-[12px] text-[#1B1B18]/50">Check back soon for new stories.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {journals.map((j) => {
        const cover = j.journalImages?.[0]?.imageUrl;
        return (
          <Link
            key={j.id}
            href={`/journal/${j.id}`}
            className="group relative flex flex-col overflow-hidden border border-[#1B1B18]/10 bg-white transition-shadow duration-400 hover:shadow-[0_20px_50px_-25px_rgba(27,27,24,0.35)]"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EDE6D8]">
              {cover ? (
                <img
                  src={cover}
                  alt={j.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <svg viewBox="0 0 60 45" className="h-10 w-auto opacity-25" fill="none">
                    <path d="M30 9 C25 5 15 4 7 6 L7 35 C15 33 25 34 30 38" stroke="#5C2A32" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M30 9 C35 5 45 4 53 6 L53 35 C45 33 35 34 30 38" stroke="#5C2A32" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.3em] text-[#5C2A32]">
                {formatDate(j.createdAt)}
              </span>
              <h3 className="mt-2 font-serif text-lg font-light text-[#1B1B18] transition-colors group-hover:text-[#5C2A32]">
                {j.title}
              </h3>
              <p className="mt-2 font-sans text-[12px] leading-[1.75] text-[#1B1B18]/55">
                {truncate(j.content, 120)}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18]">
                Read More
                <svg width="12" height="12" viewBox="0 0 18 18" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M3 9 H15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M10 4 L15 9 L10 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}