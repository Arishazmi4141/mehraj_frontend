"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Check, Loader2, Minus, Plus } from "lucide-react";
import { Product, ProductVariant } from "@/src/types/product";
import { IMAGE_BASE_URL } from "@/src/lib/api-client";
import { cartService } from "@/src/services/cart.service";

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
}

export default function ProductCard({ product, viewMode }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [qty, setQty] = useState(1);
  const [cartState, setCartState] = useState<"idle" | "loading" | "added">("idle");
  const [cartError, setCartError] = useState("");

  // Auto-select first in-stock variant on mount / product change
  useEffect(() => {
    const firstInStock = product.variants?.find((v) => v.stock > 0) || product.variants?.[0] || null;
    setSelectedVariant(firstInStock);
    setQty(1);
  }, [product.id]);

  const isFullyOutOfStock = !product.variants?.some((v) => v.stock > 0);
  const isNew = (() => {
    if (!product.createdAt) return false;
    const diffDays = (Date.now() - new Date(product.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  })();

  const resolveImageUrl = (url: string | undefined | null) => {
    if (!url) return "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=600";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${IMAGE_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const displayImage = resolveImageUrl(product.productImages?.[0]?.imageUrl);

  const selectedPriceDisplay = (() => {
    if (selectedVariant) return `₹${selectedVariant.price}`;
    const prices = product.variants?.map((v) => v.price) ?? [];
    if (!prices.length) return "";
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `₹${min}` : `₹${min} – ₹${max}`;
  })();

  const incrementQty = () => {
    const max = selectedVariant?.stock ?? 99;
    if (qty < max) setQty((q) => q + 1);
  };

  const decrementQty = () => {
    if (qty > 1) setQty((q) => q - 1);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedVariant || cartState !== "idle") return;

    setCartState("loading");
    setCartError("");

    try {
      await cartService.addItem(selectedVariant.id!, qty);
      setCartState("added");
      setQty(1);
      setTimeout(() => setCartState("idle"), 2200);
    } catch (err: any) {
      setCartState("idle");
      setCartError(err?.message || "Could not add to cart");
      setTimeout(() => setCartError(""), 3500);
    }
  };

  const isListMode = viewMode === "list";

  return (
    <Link href={`/shop/${product.id}`} className="block">
      <div
        className={`group relative flex overflow-hidden rounded-sm border bg-white transition-all duration-300 hover:-translate-y-0.5 ${
          isListMode ? "flex-row" : "flex-col"
        }`}
        style={{ borderColor: "#E7E3D8", boxShadow: "0 1px 2px rgba(23,23,18,0.04)" }}
      >
        {/* Image */}
        <div
          className={`relative overflow-hidden bg-[#F1EFE9] ${
            isListMode ? "w-40 shrink-0 sm:w-52" : "aspect-[4/3] w-full"
          }`}
        >
          <img
            src={displayImage}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {product.category?.name && (
            <div className="absolute top-3 left-3 z-10 rounded-sm bg-white/90 px-2 py-1 font-body text-[8px] font-semibold uppercase tracking-[0.15em] text-[#1F4A38] backdrop-blur-sm">
              {product.category.name}
            </div>
          )}

          <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 items-end">
            {product.trending === "YES" && (
              <span className="rounded-sm bg-[#1F4A38] px-2 py-1 font-body text-[8px] font-semibold uppercase tracking-[0.15em] text-white">
                Trending
              </span>
            )}
            {isNew && (
              <span className="rounded-sm bg-[#C9A063] px-2 py-1 font-body text-[8px] font-semibold uppercase tracking-[0.15em] text-white">
                New
              </span>
            )}
          </div>

          {isFullyOutOfStock && (
            <div className="absolute bottom-3 left-3 z-10 rounded-sm bg-[#171712]/85 px-2 py-1 font-body text-[8px] font-semibold uppercase tracking-[0.15em] text-white">
              Out of Stock
            </div>
          )}
        </div>

        {/* Details */}
        <div className={`flex flex-1 flex-col ${isListMode ? "p-5" : "p-6"}`}>
          <h3 className="font-display text-[15px] font-semibold leading-snug text-[#171712] line-clamp-1">
            {product.name}
          </h3>

          <p
            className={`mt-2 font-body text-[12px] leading-[1.7] text-[#8C8A80] ${
              isListMode ? "line-clamp-1" : "line-clamp-2"
            }`}
          >
            {product.description}
          </p>

          {/* Variant selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5" onClick={(e) => e.preventDefault()}>
              {product.variants.map((v) => (
                <button
                  key={v.id ?? v.size}
                  type="button"
                  disabled={v.stock === 0}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedVariant(v);
                    setQty(1);
                  }}
                  className={`rounded-sm border px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-wide transition-colors ${
                    selectedVariant?.id === v.id
                      ? "border-[#1F4A38] bg-[#1F4A38] text-white"
                      : v.stock === 0
                      ? "cursor-not-allowed border-[#E7E3D8] text-[#C4C1B6] line-through"
                      : "border-[#E7E3D8] text-[#6B685F] hover:border-[#1F4A38]/40"
                  }`}
                >
                  {v.size}
                </button>
              ))}
            </div>
          )}

          <div className="mt-5 flex items-center justify-between">
            <span className="font-mono text-[14px] font-semibold text-[#A9773C]">{selectedPriceDisplay}</span>
            {!isFullyOutOfStock && selectedVariant && (
              <span className="font-body text-[10px] uppercase tracking-[0.1em] text-[#1F4A38]/70">
                {selectedVariant.stock} In Stock
              </span>
            )}
          </div>

          {/* Qty stepper */}
          {!isFullyOutOfStock && (
            <div className="mt-4 flex items-center gap-3" onClick={(e) => e.preventDefault()}>
              <div className="flex items-center rounded-sm border" style={{ borderColor: "#E7E3D8" }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    decrementQty();
                  }}
                  className="flex h-8 w-8 items-center justify-center text-[#6B685F] hover:text-[#1F4A38]"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-8 text-center font-mono text-[12px] text-[#171712]">{qty}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    incrementQty();
                  }}
                  className="flex h-8 w-8 items-center justify-center text-[#6B685F] hover:text-[#1F4A38]"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}

          {cartError && (
            <p className="mt-2 font-body text-[10px] text-red-500">{cartError}</p>
          )}

          <button
            onClick={handleAddToCart}
            disabled={isFullyOutOfStock || cartState !== "idle"}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-sm py-3 font-body text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
              cartState === "added"
                ? "bg-[#EAF3EE] text-[#1F4A38]"
                : isFullyOutOfStock
                ? "cursor-not-allowed bg-[#F1EFE9] text-[#B8B4A8]"
                : "bg-[#1F4A38] text-white hover:bg-[#173829]"
            }`}
          >
            {cartState === "added" ? (
              <><Check className="h-3.5 w-3.5" /> Added to Cart</>
            ) : cartState === "loading" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : isFullyOutOfStock ? (
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