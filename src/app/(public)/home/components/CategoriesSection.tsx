"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Shirt,
  Scissors,
  Footprints,
  Sparkles,
  Crown,
  Watch,
  Briefcase,
  Glasses,
  Tag,
} from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";
import { categoryService, Category } from "@/src/services/category.service";

gsap.registerPlugin(ScrollTrigger);

// Italian Menswear Keyword → Icon Mapping with fallback
const ICON_MAP: { keywords: string[]; icon: React.ElementType }[] = [
  { keywords: ["suit", "blazer", "tuxedo", "tailor", "sartorial"], icon: Scissors },
  { keywords: ["shirt", "polo", "linen", "top", "cotton"],         icon: Shirt },
  { keywords: ["shoe", "boot", "loafer", "footwear", "oxford"],   icon: Footprints },
  { keywords: ["coat", "jacket", "outerwear", "trench", "cashmere"], icon: Crown },
  { keywords: ["accessory", "tie", "belt", "pocket", "silk"],     icon: Sparkles },
  { keywords: ["watch", "timepiece", "chronograph"],              icon: Watch },
  { keywords: ["bag", "briefcase", "leather", "luggage"],         icon: Briefcase },
  { keywords: ["eyewear", "glasses", "shade", "sunglasses"],      icon: Glasses },
];

function getCategoryIcon(name: string): React.ElementType {
  const key = name.toLowerCase();
  const match = ICON_MAP.find((entry) => entry.keywords.some((k) => key.includes(k)));
  return match?.icon || Tag;
}

export default function CategoriesSection() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService
      .getCategories()
      .then((data) => setCategories(data))
      .finally(() => setLoading(false));
  }, []);

  const scopeRef = useGsap<HTMLElement>(() => {
    if (loading || categories.length === 0) return;
    gsap.fromTo(
      ".cat-header > *",
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cat-header", start: "top 86%" },
      }
    );
    gsap.fromTo(
      ".cat-card",
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.07,
        ease: "expo.out",
        scrollTrigger: { trigger: ".cat-grid", start: "top 84%" },
      }
    );
  }, [loading, categories]);

  if (!loading && categories.length === 0) return null;

  return (
    <section ref={scopeRef} className="relative bg-[#FAFAFA] py-24 md:py-32" id="categories">
      {/* Background Subtle Architectural Line Grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-25"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(10, 17, 24, 0.03) 1px, transparent 1px)",
          backgroundSize: "100px 100%",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        {/* Editorial Header */}
        <div className="cat-header mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[1px] w-6 bg-[#B89752]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#B89752]">
              Collezione Esclusiva
            </span>
            <span className="h-[1px] w-6 bg-[#B89752]" />
          </div>

          <h2 className="font-serif text-3xl font-light leading-[1.12] tracking-[-0.01em] text-[#0A1118] md:text-[2.8rem]">
            Explore <span className="italic text-[#B89752]">By Category</span>
          </h2>

          <p className="mx-auto mt-4 max-w-md font-sans text-xs leading-[1.85] text-[#4A5568]">
            Discover masterfully tailored menswear essentials, cut from pure Italian wool, silk, and cashmere.
          </p>

          <div className="mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent via-[#B89752]/40 to-transparent" />
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="cat-grid grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square animate-pulse rounded-none border border-[#0A1118]/10 bg-[#F4F1EA]"
              />
            ))}
          </div>
        ) : (
          /* Categories Grid */
          <div className="cat-grid grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => {
              const Icon = getCategoryIcon(category.name);
              return (
                <button
                  key={category.id}
                  onClick={() => router.push(`/shop?category=${encodeURIComponent(category.name)}`)}
                  className="cat-card group relative flex aspect-square flex-col items-center justify-center gap-4 overflow-hidden rounded-none border bg-white p-5 text-center shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#0A1118]/5"
                  style={{ borderColor: "rgba(10, 17, 24, 0.08)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(184, 151, 82, 0.4)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(10, 17, 24, 0.08)")}
                >
                  {/* Subtle Florentine Gold Radial Glow on Hover */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: "radial-gradient(circle at 50% 30%, rgba(184, 151, 82, 0.08) 0%, transparent 70%)",
                    }}
                  />

                  {/* Category Icon Container */}
                  <div className="relative flex h-13 w-13 items-center justify-center rounded-full border border-[#0A1118]/10 bg-[#FAFAFA] text-[#0A1118] transition-all duration-500 group-hover:border-[#B89752] group-hover:bg-[#0A1118] group-hover:text-[#FAFAFA] group-hover:scale-110">
                    <Icon className="h-5 w-5 transition-colors duration-300" strokeWidth={1.3} />
                  </div>

                  {/* Category Title */}
                  <span className="relative font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0A1118] transition-colors duration-300 group-hover:text-[#B89752] line-clamp-1">
                    {category.name}
                  </span>

                  {/* Gold Bottom Border Animation */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-[#B89752] to-[#0A1118] transition-all duration-500 group-hover:w-3/4"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}