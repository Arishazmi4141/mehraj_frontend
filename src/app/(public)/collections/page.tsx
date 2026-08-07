"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categoryService, Category } from "@/src/services/category.service";

export default function CollectionsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService
      .getCategories()
      .then(setCategories)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#F6F2E9]">
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-[#2E4B3F]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#2E4B3F]">
              Collections
            </span>
            <span className="h-px w-6 bg-[#2E4B3F]" />
          </div>
          <h1 className="font-serif text-3xl font-light leading-[1.12] text-[#1B1B18] md:text-[2.8rem]">
            Campaigns, <span className="italic text-[#5C2A32]">Not Catalogues</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md font-sans text-xs leading-[1.85] text-[#1B1B18]/60">
            Each collection is a complete story, styled and released as a moment.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] animate-pulse border border-[#1B1B18]/10 bg-[#EDE6D8]" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <p className="text-center font-sans text-sm text-[#1B1B18]/50">No collections available right now.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/collections/${category.id}`}
                className="group relative flex flex-col overflow-hidden border border-[#1B1B18]/10 bg-white"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EDE6D8]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B18]/70 via-[#1B1B18]/10 to-transparent" />
                  <span className="absolute bottom-5 left-5 right-5 font-serif text-2xl font-light text-[#F6F2E9]">
                    {category.name}
                  </span>
                </div>
                <div className="flex items-center justify-between p-6">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#2E4B3F]">
                    View Collection
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#2E4B3F] transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}