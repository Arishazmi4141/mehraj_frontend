"use client";

import React, { useState } from "react";
import { X, Package, Layers } from "lucide-react";
import { Product } from "@/src/types/product";
import { IMAGE_BASE_URL } from "@/src/lib/api-client";

interface ProductDetailModalProps {
  show: boolean;
  product: Product | null;
  onClose: () => void;
}

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=600";

export default function ProductDetailModal({ show, product, onClose }: ProductDetailModalProps) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  if (!show || !product) return null;

  const resolveImageUrl = (url: string | undefined | null) => {
    if (!url) return FALLBACK_IMG;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${IMAGE_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const images = product.productImages?.length ? product.productImages : [];
  const displayImage = images.length ? resolveImageUrl(images[activeImgIdx]?.imageUrl) : FALLBACK_IMG;

  const isTrending = product.trending === "YES";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        className="bg-[var(--color-surface)] border w-full max-w-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto rounded-sm"
        style={{ borderColor: "var(--color-border)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 bg-[var(--color-surface)] border p-2 text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors rounded-sm"
          style={{ borderColor: "var(--color-border)" }}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* ---------- Image side ---------- */}
          <div className="p-6 sm:p-8 sm:border-r" style={{ borderColor: "var(--color-border)" }}>
            <div
              className="aspect-square w-full bg-[var(--color-surface-alt)] border overflow-hidden rounded-sm"
              style={{ borderColor: "var(--color-border)" }}
            >
              <img
                src={displayImage}
                alt={product.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMG;
                }}
              />
            </div>

            {images.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImgIdx(i)}
                    className={`aspect-square overflow-hidden rounded-sm border transition-all ${
                      i === activeImgIdx ? "opacity-100" : "opacity-50 hover:opacity-80"
                    }`}
                    style={{
                      borderColor: i === activeImgIdx ? "var(--color-green)" : "var(--color-border)",
                    }}
                  >
                    <img
                      src={resolveImageUrl(img.imageUrl)}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ---------- Info side ---------- */}
          <div className="p-6 sm:p-8 flex flex-col">
            {/* Category / subcategory breadcrumb */}
            <div className="flex items-center gap-1.5 font-body text-[10px] font-semibold uppercase tracking-widest text-[var(--color-brass)]">
              <span>{product.category?.name}</span>
              {product.subCategory?.name && (
                <>
                  <span className="text-[var(--color-ink-faint)]">/</span>
                  <span>{product.subCategory.name}</span>
                </>
              )}
            </div>

            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--color-ink)] leading-snug">
              {product.name}
            </h2>

            {/* Status badges */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest rounded-sm border ${
                  product.isActive
                    ? "text-[var(--color-green-deep)] border-[var(--color-green)]/30 bg-[var(--color-green-soft)]"
                    : "text-[var(--color-ink-faint)] border-[var(--color-border)]"
                }`}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: product.isActive ? "currentColor" : "var(--color-ink-faint)" }}
                />
                {product.isActive ? "Active" : "Inactive"}
              </span>
              {isTrending && (
                <span className="inline-flex items-center px-3 py-1 text-[10px] font-semibold uppercase tracking-widest rounded-sm border text-[var(--color-brass)] border-[var(--color-brass)]/40">
                  Trending
                </span>
              )}
            </div>

            <p className="mt-5 font-body text-[13px] leading-relaxed text-[var(--color-ink-muted)]">
              {product.description || "No description provided."}
            </p>

            {/* Variants */}
            <div className="mt-6 pt-5 border-t flex-1" style={{ borderColor: "var(--color-border)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Layers className="h-3.5 w-3.5 text-[var(--color-brass)]" />
                <h4 className="font-display text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
                  Variants
                </h4>
              </div>

              <div className="border rounded-sm overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
                {/* header row */}
                <div
                  className="grid grid-cols-3 gap-2 px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-ink-faint)] border-b"
                  style={{ borderColor: "var(--color-border)", background: "var(--color-surface-alt)" }}
                >
                  <span>Size</span>
                  <span className="text-right">Price</span>
                  <span className="text-right">Stock</span>
                </div>
                {product.variants?.length ? (
                  product.variants.map((v, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-3 gap-2 px-4 py-3 text-[13px] font-mono border-b last:border-b-0"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      <span className="text-[var(--color-ink)] font-semibold">{v.size}</span>
                      <span className="text-right text-[var(--color-brass)] font-semibold">£{v.price}</span>
                      <span
                        className={`text-right ${
                          v.stock === 0 ? "text-red-600" : "text-[var(--color-ink-muted)]"
                        }`}
                      >
                        {v.stock} pcs
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 flex flex-col items-center gap-2 text-[var(--color-ink-faint)]">
                    <Package className="h-5 w-5" />
                    <span className="text-[11px] uppercase tracking-widest">No variants added</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}