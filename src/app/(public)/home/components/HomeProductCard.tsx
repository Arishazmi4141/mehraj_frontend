"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { Product } from "@/src/types/product";
import { IMAGE_BASE_URL } from "@/src/lib/api-client";
import { cartService } from "@/src/services/cart.service";

export default function HomeProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const defaultVariant = product.variants?.find((v) => v.stock > 0) || product.variants?.[0];
  const isOutOfStock = !product.variants?.some((v) => v.stock > 0);

  const minPrice = product.variants?.length ? Math.min(...product.variants.map((v) => v.price)) : 0;
  const maxPrice = product.variants?.length ? Math.max(...product.variants.map((v) => v.price)) : 0;
  const priceDisplay = minPrice === maxPrice ? `₹${minPrice}` : `₹${minPrice} – ₹${maxPrice}`;

  const resolveImageUrl = (url: string | undefined | null) => {
    if (!url) return "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=600";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${IMAGE_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const displayImage = resolveImageUrl(product.productImages?.[0]?.imageUrl);
  const categoryLabel = product.category?.name;

  // Subtle lift on hover — kept lightweight, no 3D tilt for readability on a bright card
  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -4,
        boxShadow: "0 24px 48px -20px rgba(23,23,18,0.18)",
        borderColor: "rgba(31,74,56,0.25)",
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        boxShadow: "0 1px 2px rgba(23,23,18,0.04)",
        borderColor: "rgba(231,227,216,1)",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock || isAdding || !defaultVariant) return;

    setIsAdding(true);
    try {
      await cartService.addItem(defaultVariant.id, 1);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2500);
    } catch {
      alert("Couldn't add this to your cart — please check stock and try again.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Link href={`/shop/${product.id}`} className="block">
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group flex flex-col overflow-hidden rounded-sm border bg-white"
        style={{ borderColor: "#E7E3D8", boxShadow: "0 1px 2px rgba(23,23,18,0.04)" }}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F1EFE9]">
          <img
            src={displayImage}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Category chip — the "what part is this" signal */}
          {categoryLabel && (
            <div className="absolute top-4 left-4 z-10 rounded-sm bg-white/90 px-2.5 py-1 font-body text-[9px] font-semibold uppercase tracking-[0.15em] text-[#1F4A38] backdrop-blur-sm">
              {categoryLabel}
            </div>
          )}

          {product.trending === "YES" && (
            <div className="absolute top-4 right-4 z-10 rounded-sm bg-[#1F4A38] px-2.5 py-1 font-body text-[9px] font-semibold uppercase tracking-[0.15em] text-white">
              Trending
            </div>
          )}
          {isOutOfStock && (
            <div className="absolute bottom-4 left-4 z-10 rounded-sm bg-[#171712]/85 px-2.5 py-1 font-body text-[9px] font-semibold uppercase tracking-[0.15em] text-white">
              Out of Stock
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-[15px] font-semibold leading-snug text-[#171712] line-clamp-1">
            {product.name}
          </h3>

          <p className="mt-2 font-body text-[12px] leading-[1.7] text-[#8C8A80] line-clamp-2">
            {product.description}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="font-mono text-[14px] font-semibold text-[#A9773C]">{priceDisplay}</span>
            {!isOutOfStock && (
              <span className="font-body text-[10px] uppercase tracking-[0.1em] text-[#1F4A38]/70">In Stock</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || isAdding || isAdded}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-sm py-3 font-body text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
              isAdded
                ? "bg-[#EAF3EE] text-[#1F4A38]"
                : isOutOfStock
                ? "cursor-not-allowed bg-[#F1EFE9] text-[#B8B4A8]"
                : "bg-[#1F4A38] text-white hover:bg-[#173829]"
            }`}
          >
            {isAdded ? (
              <><Check className="h-3.5 w-3.5" /> Added to Cart</>
            ) : isAdding ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : isOutOfStock ? (
              "Out of Stock"
            ) : (
              <><ShoppingCart className="h-3.5 w-3.5" /> Add to Cart</>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}