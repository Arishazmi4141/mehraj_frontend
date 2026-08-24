// (public)/journal/magazine/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { contentService } from "@/src/services/content.service";
import { Magazine } from "@/src/types/magazine.types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function MagazineDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params?.id);

  const [magazine, setMagazine] = useState<Magazine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || Number.isNaN(id)) {
      setError("Invalid issue.");
      setLoading(false);
      return;
    }
    (async () => {
      setLoading(true);
      setError("");
      try {
        // No GET /api/magazines/{id} on the backend yet — pull a large
        // page of the public list and find this issue by id.
        const data = await contentService.getMagazines(0, 100);
        const found = data.content.find((m) => m.id === id);
        if (!found) {
          setError("This issue couldn't be found.");
        } else {
          setMagazine(found);
        }
      } catch (err) {
        console.error("Failed to load magazine issue:", err);
        setError("This issue couldn't be found.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F6F2E9]">
        <p className="font-sans text-[12px] uppercase tracking-[0.2em] text-[#1B1B18]/40">Loading…</p>
      </main>
    );
  }

  if (error || !magazine) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F6F2E9] px-6 text-center">
        <p className="font-serif text-xl font-light text-[#1B1B18]">{error || "Issue not found."}</p>
        <button
          type="button"
          onClick={() => router.push("/journal?tab=magazine")}
          className="border border-[#1B1B18]/25 px-8 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18] transition-colors hover:border-[#5C2A32]"
        >
          Back to Magazine
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F2E9]">
      <section className="mx-auto max-w-5xl px-6 py-24 md:px-12 md:py-32">
        <button
          type="button"
          onClick={() => router.push("/journal?tab=magazine")}
          className="group mb-10 inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18]/60 transition-colors hover:text-[#5C2A32]"
        >
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none" className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1">
            <path d="M3 9 H15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M10 4 L15 9 L10 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Magazine
        </button>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,320px)_1fr]">
          <div
            className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden"
            style={{ background: "linear-gradient(160deg, #1B1B18 0%, #3A2A2C 55%, #5C2A32 100%)" }}
          >
            <span className="absolute left-0 top-0 h-full w-2.5 bg-black/25" aria-hidden="true" />

            <span className="absolute right-5 top-5 border border-[#F6F2E9]/30 px-3 py-1.5 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#F6F2E9]/85">
              {magazine.year}
            </span>

            <svg viewBox="0 0 26 26" className="h-16 w-16 opacity-85" fill="none">
              <rect x="4" y="2.5" width="18" height="21" rx="1" stroke="#F6F2E9" strokeWidth="1.2" />
              <path d="M8 8 H18" stroke="#F6F2E9" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7" />
              <path d="M8 12.5 H18" stroke="#F6F2E9" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7" />
              <path d="M8 17 H14" stroke="#F6F2E9" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7" />
            </svg>

            <span className="absolute bottom-5 left-5 right-5 text-center font-sans text-[9px] font-semibold uppercase tracking-[0.25em] text-[#F6F2E9]/70">
              Annual Edition
            </span>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-6 bg-[#5C2A32]" />
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#5C2A32]">
                Issue {magazine.year}
              </span>
            </div>

            <h1 className="font-serif text-3xl font-light leading-[1.15] text-[#1B1B18] md:text-[2.4rem]">
              {magazine.title}
            </h1>

            <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.15em] text-[#1B1B18]/40">
              Published {formatDate(magazine.createdAt)}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={magazine.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1B1B18] px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F6F2E9] transition-colors hover:bg-[#5C2A32]"
              >
                Read Full Issue
              </a>
              <a
                href={magazine.pdfUrl}
                download
                className="inline-flex items-center gap-2 border border-[#1B1B18]/25 px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18] transition-colors hover:border-[#5C2A32]"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border border-[#1B1B18]/10 bg-white p-2">
          <iframe src={magazine.pdfUrl} className="h-[80vh] w-full" title={magazine.title} />
        </div>
      </section>
    </main>
  );
}