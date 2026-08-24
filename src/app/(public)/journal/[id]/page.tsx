// (public)/journal/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { contentService } from "@/src/services/content.service";
import { Journal } from "@/src/types/journal.types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function JournalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params?.id);

  const [journal, setJournal] = useState<Journal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || Number.isNaN(id)) {
      setError("Invalid entry.");
      setLoading(false);
      return;
    }
    (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await contentService.getJournalById(id);
        setJournal(data);
      } catch (err) {
        console.error("Failed to load journal entry:", err);
        setError("This entry couldn't be found.");
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

  if (error || !journal) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F6F2E9] px-6 text-center">
        <p className="font-serif text-xl font-light text-[#1B1B18]">{error || "Entry not found."}</p>
        <button
          type="button"
          onClick={() => router.push("/journal")}
          className="border border-[#1B1B18]/25 px-8 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18] transition-colors hover:border-[#5C2A32]"
        >
          Back to Journal
        </button>
      </main>
    );
  }

  const cover = journal.journalImages?.[0]?.imageUrl;
  const gallery = journal.journalImages?.slice(1) ?? [];

  return (
    <main className="min-h-screen bg-[#F6F2E9]">
      <article className="mx-auto max-w-3xl px-6 py-24 md:px-12 md:py-32">
        <button
          type="button"
          onClick={() => router.push("/journal")}
          className="group mb-10 inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18]/60 transition-colors hover:text-[#5C2A32]"
        >
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none" className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1">
            <path d="M3 9 H15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M10 4 L15 9 L10 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Journal
        </button>

        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-6 bg-[#5C2A32]" />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#5C2A32]">
            {formatDate(journal.createdAt)}
          </span>
        </div>

        <h1 className="font-serif text-3xl font-light leading-[1.15] text-[#1B1B18] md:text-[2.6rem]">
          {journal.title}
        </h1>

        {cover && (
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden bg-[#EDE6D8]">
            <img src={cover} alt={journal.title} className="h-full w-full object-cover" />
          </div>
        )}

        <div className="mt-10 whitespace-pre-line font-sans text-[14.5px] leading-[1.95] text-[#1B1B18]/75">
          {journal.content}
        </div>

        {gallery.length > 0 && (
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.map((img) => (
              <div key={img.id} className="aspect-[4/3] overflow-hidden bg-[#EDE6D8]">
                <img src={img.imageUrl} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </article>
    </main>
  );
}