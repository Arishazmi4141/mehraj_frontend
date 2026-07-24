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
    productService.getTrendingProducts()
      .then((data) => setProducts(data.slice(0, 4)))
      .catch((err) => console.error("Error fetching trending:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading || products.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".trending-header > *", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".trending-header", start: "top 85%" },
      });
      gsap.fromTo(".trending-card", { opacity: 0, y: 36 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".trending-grid", start: "top 82%" },
      });
    }, containerRef);
    return () => ctx.revert();
  }, [loading, products]);

  if (!loading && products.length === 0) return null;

  return (
    <section ref={containerRef} className="relative bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="trending-header mb-12 text-center">
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#A9773C]">High Priority</span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#171712] md:text-[2.8rem]">
            Trending Hardware
          </h2>
          <p className="mx-auto mt-5 max-w-md font-body text-[13px] leading-[1.8] text-[#8C8A80]">
            The most sought-after components in our network, engineered for peak performance.
          </p>
          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-[#1F4A38]/30 to-transparent" />
        </div>

        {loading ? (
          <div className="trending-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col overflow-hidden rounded-sm border border-[#E7E3D8] bg-white">
                <div className="aspect-[4/3] w-full animate-pulse bg-[#F1EFE9]" />
                <div className="p-6 space-y-3">
                  <div className="h-3.5 w-3/4 animate-pulse rounded-sm bg-[#F1EFE9]" />
                  <div className="h-3 w-full animate-pulse rounded-sm bg-[#F1EFE9]" />
                  <div className="h-3 w-2/3 animate-pulse rounded-sm bg-[#F1EFE9]" />
                  <div className="h-10 w-full animate-pulse rounded-sm bg-[#F1EFE9] mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="trending-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <div key={product.id} className="trending-card">
                  <HomeProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="mt-14 flex justify-center">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2.5 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1F4A38] transition-colors duration-300 hover:text-[#173829]"
              >
                View All Products
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}