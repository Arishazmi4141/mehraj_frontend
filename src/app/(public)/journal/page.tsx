import Link from "next/link";
import { JOURNAL_ARTICLES } from "@/src/app/(public)/journal/data/articles";

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-[#F6F2E9]">
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="mb-16 text-center">
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

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {JOURNAL_ARTICLES.map((a) => (
            <Link
              key={a.slug}
              href={`/journal/${a.slug}`}
              className="group relative flex flex-col overflow-hidden border border-[#1B1B18]/10 bg-white"
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
                <p className="mt-2 font-sans text-[12px] leading-[1.75] text-[#1B1B18]/55">{a.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}