"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";
import { categoryService, Category } from "@/src/services/category.service";

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=900";

export default function CollectionsSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService
      .getCategories()
      .then((data) => setCategories(data.slice(0, 3)))
      .finally(() => setLoading(false));
  }, []);

  const scopeRef = useGsap<HTMLElement>(() => {
    if (loading) return;
    gsap.fromTo(
      ".coll-header > *",
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".coll-header", start: "top 85%" },
      }
    );
    gsap.fromTo(
      ".coll-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: ".coll-grid", start: "top 82%" },
      }
    );
  }, [loading, categories]);

  if (!loading && categories.length === 0) return null;

  return (
    <section ref={scopeRef} id="collections" className="relative bg-[#F6F2E9] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="coll-header mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-[#2E4B3F]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#2E4B3F]">
              Collections
            </span>
            <span className="h-px w-6 bg-[#2E4B3F]" />
          </div>
          <h2 className="font-serif text-3xl font-light leading-[1.12] text-[#1B1B18] md:text-[2.8rem]">
            Campaigns, <span className="italic text-[#5C2A32]">Not Catalogues</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md font-sans text-xs leading-[1.85] text-[#1B1B18]/60">
            Each collection is a complete story — styled, photographed, and released
            as a moment, not merely a set of products.
          </p>
        </div>

        {loading ? (
          <div className="coll-grid grid grid-cols-1 gap-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] animate-pulse border border-[#1B1B18]/10 bg-[#EDE6D8]" />
            ))}
          </div>
        ) : (
          <div className="coll-grid grid grid-cols-1 gap-8 md:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/collections/${category.id}`}
                className="coll-card group relative flex flex-col overflow-hidden border border-[#1B1B18]/10 bg-white"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EDE6D8]">
                  <img
                    src={category.imageUrl || FALLBACK_IMAGE}
                    alt={category.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B18]/75 via-[#1B1B18]/15 to-transparent" />
                  <span className="absolute bottom-5 left-5 right-5 font-serif text-2xl font-light text-[#F6F2E9]">
                    {category.name}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  {category.description && (
                    <p className="mb-4 flex-1 font-sans text-[12px] leading-[1.75] text-[#1B1B18]/55">
                      {category.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#2E4B3F]">
                      View Collection
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#2E4B3F] transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-14 flex justify-center">
          <Link
            href="/collections"
            className="group inline-flex items-center gap-3 border border-[#1B1B18]/20 bg-white px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B1B18] transition-all duration-300 hover:border-[#1B1B18] hover:bg-[#1B1B18] hover:text-[#F6F2E9]"
          >
            <span>View All Collections</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}