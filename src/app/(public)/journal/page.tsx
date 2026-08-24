// (public)/journal/page.tsx
"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { contentService } from "@/src/services/content.service";
import { Journal } from "@/src/types/journal.types";
import { Magazine } from "@/src/types/magazine.types";
import JournalMagazineToggle, { ContentTab } from "./components/JournalMagazineToggle";
import JournalGrid from "./components/JournalGrid";
import MagazineGrid from "./components/MagazineGrid";

const PAGE_SIZE = 12;

function JournalPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") === "magazine" ? "magazine" : "journal") as ContentTab;

  const [activeTab, setActiveTab] = useState<ContentTab>(initialTab);

  const [journals, setJournals] = useState<Journal[]>([]);
  const [journalPage, setJournalPage] = useState(0);
  const [journalTotalPages, setJournalTotalPages] = useState(0);
  const [journalLoading, setJournalLoading] = useState(true);
  const [journalLoaded, setJournalLoaded] = useState(false);

  const [magazines, setMagazines] = useState<Magazine[]>([]);
  const [magazinePage, setMagazinePage] = useState(0);
  const [magazineTotalPages, setMagazineTotalPages] = useState(0);
  const [magazineLoading, setMagazineLoading] = useState(false);
  const [magazineLoaded, setMagazineLoaded] = useState(false);

  const fetchJournals = useCallback(async (pageToLoad: number) => {
    setJournalLoading(true);
    try {
      const data = await contentService.getJournals(pageToLoad, PAGE_SIZE);
      setJournals(data.content);
      setJournalTotalPages(data.totalPages);
      setJournalPage(data.number);
    } catch (err) {
      console.error("Failed to load journal entries:", err);
    } finally {
      setJournalLoading(false);
      setJournalLoaded(true);
    }
  }, []);

  const fetchMagazines = useCallback(async (pageToLoad: number) => {
    setMagazineLoading(true);
    try {
      const data = await contentService.getMagazines(pageToLoad, PAGE_SIZE);
      setMagazines(data.content);
      setMagazineTotalPages(data.totalPages);
      setMagazinePage(data.number);
    } catch (err) {
      console.error("Failed to load magazine issues:", err);
    } finally {
      setMagazineLoading(false);
      setMagazineLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "journal") fetchJournals(0);
    else fetchMagazines(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabChange = (tab: ContentTab) => {
    setActiveTab(tab);
    router.replace(`/journal?tab=${tab}`, { scroll: false });
    if (tab === "journal" && !journalLoaded) fetchJournals(0);
    if (tab === "magazine" && !magazineLoaded) fetchMagazines(0);
  };

  return (
    <main className="min-h-screen bg-[#F6F2E9]">
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-[#5C2A32]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#5C2A32]">
              The Journal
            </span>
            <span className="h-px w-6 bg-[#5C2A32]" />
          </div>
          <h1 className="font-serif text-3xl font-light leading-[1.12] text-[#1B1B18] md:text-[2.8rem]">
            Style, Craft & <span className="italic text-[#5C2A32]">Cultural History</span>
          </h1>
        </div>

        <div className="mb-14 flex justify-center">
          <JournalMagazineToggle active={activeTab} onChange={handleTabChange} />
        </div>

        {activeTab === "journal" ? (
          <>
            <JournalGrid journals={journals} loading={journalLoading} />
            {!journalLoading && journalTotalPages > 1 && (
              <Pagination page={journalPage} totalPages={journalTotalPages} onChange={fetchJournals} />
            )}
          </>
        ) : (
          <>
            <MagazineGrid magazines={magazines} loading={magazineLoading} />
            {!magazineLoading && magazineTotalPages > 1 && (
              <Pagination page={magazinePage} totalPages={magazineTotalPages} onChange={fetchMagazines} />
            )}
          </>
        )}
      </section>
    </main>
  );
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  return (
    <div className="mt-16 flex items-center justify-center gap-4">
      <button
        type="button"
        disabled={page === 0}
        onClick={() => onChange(page - 1)}
        className="border border-[#1B1B18]/20 px-6 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18] transition-colors hover:border-[#5C2A32] disabled:opacity-30"
      >
        Previous
      </button>
      <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#1B1B18]/50">
        {page + 1} / {totalPages}
      </span>
      <button
        type="button"
        disabled={page >= totalPages - 1}
        onClick={() => onChange(page + 1)}
        className="border border-[#1B1B18]/20 px-6 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18] transition-colors hover:border-[#5C2A32] disabled:opacity-30"
      >
        Next
      </button>
    </div>
  );
}

export default function JournalPage() {
  return (
    <Suspense fallback={null}>
      <JournalPageContent />
    </Suspense>
  );
}