// (public)/journal/components/MagazineGrid.tsx
"use client";

import Link from "next/link";
import { Magazine } from "@/src/types/magazine.types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function MagazineGrid({ magazines, loading }: { magazines: Magazine[]; loading: boolean }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse border border-[#1B1B18]/10 bg-white">
            <div className="aspect-[3/4] w-full bg-[#EDE6D8]" />
            <div className="space-y-2 p-6">
              <div className="h-2 w-20 bg-[#EDE6D8]" />
              <div className="h-4 w-3/4 bg-[#EDE6D8]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (magazines.length === 0) {
    return (
      <div className="border border-[#1B1B18]/10 bg-white p-16 text-center">
        <p className="font-serif text-lg font-light text-[#1B1B18]">No issues yet</p>
        <p className="mt-2 font-sans text-[12px] text-[#1B1B18]/50">Our next edition is on its way.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {magazines.map((m) => {
        // #toolbar=0&navpanes=0 hides the browser's PDF chrome so it reads
        // like a clean embedded preview; view=FitH fits the page to width.
        const pdfPreviewSrc = `${m.pdfUrl}#toolbar=0&navpanes=0&view=FitH`;

        return (
          <div
            key={m.id}
            className="group relative flex flex-col overflow-hidden border border-[#1B1B18]/10 bg-white transition-shadow duration-400 hover:shadow-[0_20px_50px_-25px_rgba(27,27,24,0.35)]"
          >
            {/* PDF preview — its own scroll, not wrapped in the Link so the
               native PDF viewer can handle scroll/zoom interaction. */}
            <div className="relative aspect-[3/4] w-full overflow-hidden border-b border-[#1B1B18]/10 bg-[#EDE6D8]">
              <iframe
                src={pdfPreviewSrc}
                title={m.title}
                loading="lazy"
                className="h-full w-full"
              />
              <span className="pointer-events-none absolute right-3 top-3 border border-[#1B1B18]/15 bg-[#F6F2E9]/90 px-2.5 py-1 font-sans text-[10px] font-semibold tracking-[0.15em] text-[#5C2A32] shadow-sm backdrop-blur-sm">
                {m.year}
              </span>
            </div>

            <Link href={`/journal/magazine/${m.id}`} className="flex flex-1 flex-col p-6">
              <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.3em] text-[#5C2A32]">
                {formatDate(m.createdAt)}
              </span>
              <h3 className="mt-2 font-serif text-lg font-light text-[#1B1B18] transition-colors group-hover:text-[#5C2A32]">
                {m.title}
              </h3>
              <p className="mt-2 font-sans text-[11.5px] uppercase tracking-[0.15em] text-[#1B1B18]/45">
                Issue {m.year}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18]">
                Read Full Issue
                <svg width="12" height="12" viewBox="0 0 18 18" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M3 9 H15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M10 4 L15 9 L10 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}