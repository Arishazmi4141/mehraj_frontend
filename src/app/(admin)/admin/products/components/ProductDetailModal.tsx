"use client";

import React from "react";
import { X } from "lucide-react";
import { Product } from "@/src/types/product";
import { IMAGE_BASE_URL } from "@/src/lib/api-client";

interface ProductDetailModalProps {
  show: boolean;
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({ show, product, onClose }: ProductDetailModalProps) {
  if (!show || !product) return null;

  const resolveImageUrl = (url: string | undefined | null) => {
    if (!url) return "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=300";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${IMAGE_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const displayImage = resolveImageUrl(product.productImages?.[0]?.imageUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-[var(--color-surface)] border w-full max-w-lg p-8 shadow-2xl relative max-h-[80vh] overflow-y-auto rounded-sm" style={{ borderColor: "var(--color-border)" }}>
        <button onClick={onClose} className="absolute top-6 right-6 text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors">
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-4 border-b pb-6 mb-6" style={{ borderColor: "var(--color-border)" }}>
          <div className="h-12 w-16 bg-[var(--color-surface-alt)] border overflow-hidden rounded-sm" style={{ borderColor: "var(--color-border)" }}>
            <img
              src={displayImage}
              alt={product.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=300";
              }}
            />
          </div>
          <div>
            <span className="font-body text-[9px] uppercase tracking-widest text-[var(--color-brass)]">{product.category?.name}</span>
            <h3 className="font-display text-[15px] font-bold text-[var(--color-ink)] mt-0.5">{product.name}</h3>
          </div>
        </div>

        <div className="space-y-4 text-[13px] font-body text-[var(--color-ink-muted)] leading-relaxed">
          <p>{product.description || "No description provided."}</p>
          <div className="border-t pt-4 space-y-2" style={{ borderColor: "var(--color-border)" }}>
            {product.variants?.map((v, i) => (
              <div key={i} className="flex justify-between font-mono py-1">
                <span className="text-[var(--color-ink)]">{v.size}</span>
                <span>Price: <strong className="text-[var(--color-brass)]">£{v.price}</strong> &bull; Stock: <strong className="text-[var(--color-ink-muted)]">{v.stock} Pcs</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}