"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";
import { productService } from "@/src/services/product.service";
import { Product } from "@/src/types/product";
import CollectionProductCard from "@/src/app/(public)/collections/components/CollectionProductCard";

gsap.registerPlugin(ScrollTrigger);

type Tab = "trending" | "new";

export default function TrendingSection() {
  const [tab, setTab] = useState<Tab>("trending");
  const [trending, setTrending] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([productService.getTrendingProducts(), productService.getRecentProducts()])
      .then(([trendingData, recentData]) => {
        setTrending(trendingData.slice(0, 4));
        setNewArrivals(recentData.slice(0, 4));
      })
      .catch((err) => console.error("Home products fetch failed", err))
      .finally(() => setLoading(false));
  }, []);

  const scopeRef = useGsap<HTMLElement>(() => {
    if (loading) return;
    gsap.fromTo(
      ".trend-header > *",
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".trend-header", start: "top 85%" },
      }
    );
    gsap.fromTo(
      ".trend-card",
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".trend-grid", start: "top 84%" },
      }
    );
  }, [loading, tab]);

  const activeProducts = tab === "trending" ? trending : newArrivals;
  const hasAny = trending.length > 0 || newArrivals.length > 0;

  if (!loading && !hasAny) return null;

  return (
    <section ref={scopeRef} id="shop-the-edit" className="relative bg-[#EDE6D8] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="trend-header mb-14 flex flex-col items-center gap-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-[#5C2A32]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#5C2A32]">
              Shop The Edit
            </span>
            <span className="h-px w-6 bg-[#5C2A32]" />
          </div>
          <h2 className="font-serif text-3xl font-light leading-[1.12] text-[#1B1B18] md:text-[2.8rem]">
            Trending Now, <span className="italic text-[#5C2A32]">Freshly Arrived</span>
          </h2>

          {/* Tabs */}
          <div className="mt-2 flex items-center gap-1 border border-[#1B1B18]/15 bg-[#F6F2E9] p-1">
            <button
              onClick={() => setTab("trending")}
              className={`px-6 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                tab === "trending" ? "bg-[#1B1B18] text-[#F6F2E9]" : "text-[#1B1B18]/55 hover:text-[#1B1B18]"
              }`}
            >
              Trending Now
            </button>
            <button
              onClick={() => setTab("new")}
              className={`px-6 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                tab === "new" ? "bg-[#1B1B18] text-[#F6F2E9]" : "text-[#1B1B18]/55 hover:text-[#1B1B18]"
              }`}
            >
              New Arrivals
            </button>
          </div>
        </div>

        {loading ? (
          <div className="trend-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] animate-pulse border border-[#1B1B18]/10 bg-white" />
            ))}
          </div>
        ) : activeProducts.length === 0 ? (
          <p className="py-10 text-center font-sans text-sm text-[#1B1B18]/50">
            Nothing here yet — check back soon.
          </p>
        ) : (
          <div className="trend-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {activeProducts.map((product) => (
              <div key={product.id} className="trend-card">
                <CollectionProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 bg-[#1B1B18] px-9 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[#F6F2E9] shadow-sm transition-all duration-300 hover:bg-[#5C2A32]"
          >
            <span>Shop All Products</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}