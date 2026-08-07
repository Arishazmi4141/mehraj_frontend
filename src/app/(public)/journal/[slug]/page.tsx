import { notFound } from "next/navigation";
import { JOURNAL_ARTICLES } from "@/src/app/(public)/journal/data/articles";

export default function JournalArticlePage({ params }: { params: { slug: string } }) {
  const article = JOURNAL_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) return notFound();

  return (
    <main className="min-h-screen bg-[#F6F2E9]">
      <div className="relative h-[50vh] w-full overflow-hidden bg-[#EDE6D8]">
        <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B18]/70 via-[#1B1B18]/10 to-transparent" />
      </div>

      <article className="mx-auto max-w-2xl px-6 py-16 md:px-0">
        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#5C2A32]">
          {article.kicker}
        </span>
        <h1 className="mt-3 font-serif text-3xl font-light leading-[1.15] text-[#1B1B18] md:text-4xl">
          {article.title}
        </h1>

        <div className="mt-10 space-y-6">
          {article.body.map((para, i) => (
            <p key={i} className="font-sans text-sm leading-[1.9] text-[#1B1B18]/75">
              {para}
            </p>
          ))}
        </div>
      </article>
    </main>
  );
}