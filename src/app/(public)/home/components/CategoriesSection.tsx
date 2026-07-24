"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Car, Cog, Gauge, Disc3, Battery, Fuel, Wrench, Lightbulb, ShieldCheck,
} from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";
import { categoryService, Category } from "@/src/services/category.service";

gsap.registerPlugin(ScrollTrigger);

// Keyword → icon mapping. "default" fallback for unmatched category names.
const ICON_MAP: { keywords: string[]; icon: React.ElementType }[] = [
  { keywords: ["engine", "motor"],            icon: Cog },
  { keywords: ["brake"],                      icon: Disc3 },
  { keywords: ["battery", "electric"],        icon: Battery },
  { keywords: ["fuel", "tank", "injector"],    icon: Fuel },
  { keywords: ["light", "lamp", "led"],        icon: Lightbulb },
  { keywords: ["perform", "tune", "gauge"],    icon: Gauge },
  { keywords: ["safety", "guard", "protect"],  icon: ShieldCheck },
  { keywords: ["tool", "service", "repair"],   icon: Wrench },
];

function getCategoryIcon(name: string): React.ElementType {
  const key = name.toLowerCase();
  const match = ICON_MAP.find((entry) => entry.keywords.some((k) => key.includes(k)));
  return match?.icon || Car;
}

export default function CategoriesSection() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService.getCategories()
      .then((data) => setCategories(data))
      .finally(() => setLoading(false));
  }, []);

  const scopeRef = useGsap<HTMLElement>(() => {
    if (loading || categories.length === 0) return;
    gsap.fromTo(".cat-header > *", { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: ".cat-header", start: "top 86%" },
    });
    gsap.fromTo(".cat-card", { opacity: 0, y: 36 }, {
      opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: "expo.out",
      scrollTrigger: { trigger: ".cat-grid", start: "top 84%" },
    });
  }, [loading, categories]);

  if (!loading && categories.length === 0) return null;

  return (
    <section ref={scopeRef} className="relative bg-[#F7F7F4] py-20 md:py-28" id="categories">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="cat-header mb-12 text-center">
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#A9773C]">
            Browse by Category
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#171712] md:text-[2.8rem]">
            Find Your Fit
          </h2>
          <p className="mx-auto mt-5 max-w-md font-body text-[13px] leading-[1.8] text-[#8C8A80]">
            Every category, curated for the exact system your vehicle needs — precise, genuine, ready to fit.
          </p>
          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-[#1F4A38]/30 to-transparent" />
        </div>

        {loading ? (
          <div className="cat-grid grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-sm border border-[#E7E3D8] bg-[#EFECE3]" />
            ))}
          </div>
        ) : (
          <div className="cat-grid grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => {
              const Icon = getCategoryIcon(category.name);
              return (
                <button
                  key={category.id}
                  onClick={() => router.push(`/shop?category=${encodeURIComponent(category.name)}`)}
                  className="cat-card group relative flex aspect-square flex-col items-center justify-center gap-4 overflow-hidden rounded-sm border bg-white p-4 text-center transition-all duration-400 hover:-translate-y-1"
                  style={{ borderColor: "#E7E3D8" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(31,74,56,0.3)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E7E3D8")}
                >
                  {/* Ambient hover glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "radial-gradient(circle at 50% 30%, rgba(201,160,99,0.08) 0%, transparent 70%)" }}
                  />

                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#1F4A38]/10 bg-[#1F4A38]/[0.06] transition-transform duration-400 group-hover:scale-110">
                    <Icon className="h-5 w-5 text-[#1F4A38]" strokeWidth={1.5} />
                  </div>

                  <span className="relative font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-[#171712] line-clamp-1">
                    {category.name}
                  </span>

                  <span
                    aria-hidden
                    className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-[#1F4A38] to-[#C9A063] transition-all duration-400 group-hover:w-2/3"
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