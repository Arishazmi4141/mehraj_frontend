"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { productService } from "@/src/services/product.service";
import { Product } from "@/src/types/product";
import HomeProductCard from "./HomeProductCard";

gsap.registerPlugin(ScrollTrigger);

export default function ProductsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService
      .getTrendingProducts()
      .then((data) => setProducts(data.slice(0, 4)))
      .catch((err) => console.error("Error fetching trending:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading || products.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".trending-header > *",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".trending-header", start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".trending-card",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".trending-grid", start: "top 82%" },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [loading, products]);

  if (!loading && products.length === 0) return null;

  return (
    <section ref={containerRef} className="relative bg-[#FAFAFA] py-24 md:py-32">
      {/* Background Architectural Grid Lines */}
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
        <div className="trending-header mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[1px] w-6 bg-[#B89752]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#B89752]">
              Selezione Estiva
            </span>
            <span className="h-[1px] w-6 bg-[#B89752]" />
          </div>

          <h2 className="font-serif text-3xl font-light leading-[1.12] tracking-[-0.01em] text-[#0A1118] md:text-[2.8rem]">
            Curated <span className="italic text-[#B89752]">Sartorial Pieces</span>
          </h2>

          <p className="mx-auto mt-4 max-w-md font-sans text-xs leading-[1.85] text-[#4A5568]">
            Discover our most sought-after garments, hand-tailored with unyielding precision and Italian refinement.
          </p>

          <div className="mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent via-[#B89752]/40 to-transparent" />
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="trending-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col overflow-hidden rounded-none border border-[#0A1118]/10 bg-white"
              >
                <div className="aspect-[3/4] w-full animate-pulse bg-[#F4F1EA]" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-1/3 animate-pulse bg-[#F4F1EA]" />
                  <div className="h-4 w-3/4 animate-pulse bg-[#F4F1EA]" />
                  <div className="h-3 w-1/2 animate-pulse bg-[#F4F1EA]" />
                  <div className="h-10 w-full animate-pulse bg-[#F4F1EA] mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Products Grid & View All Action */
          <>
            <div className="trending-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <div key={product.id} className="trending-card">
                  <HomeProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 border border-[#0A1118]/20 bg-white px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[#0A1118] shadow-sm transition-all duration-300 hover:border-[#0A1118] hover:bg-[#0A1118] hover:text-[#FAFAFA] hover:shadow-xl"
              >
                <span>View Full Collection</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}