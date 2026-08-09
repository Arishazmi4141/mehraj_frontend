"use client";

import React from "react";
import { Edit3, Trash2, Layers } from "lucide-react";
import { Category } from "@/src/types/product";
import { IMAGE_BASE_URL } from "@/src/lib/api-client";

interface CategoryListTableProps {
  categories: Category[];
  onEditClick: (cat: Category) => void;
  onDeleteClick: (id: number) => void;
}

export default function CategoryListTable({
  categories, onEditClick, onDeleteClick
}: CategoryListTableProps) {

  const resolveImageUrl = (url: string | undefined | null) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${IMAGE_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  return (
    <div className="bg-[var(--color-surface)] border p-8 rounded-sm" style={{ borderColor: "var(--color-border)" }}>
      <h3 className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-ink-faint)] mb-6">
        All Categories
      </h3>

      {categories.length === 0 ? (
        <div className="text-center py-12 text-[var(--color-ink-faint)] font-body text-[12px] uppercase tracking-widest">
          No categories yet.
        </div>
      ) : (
        <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
          {categories.map((c) => (
            <div key={c.id} className="flex justify-between items-center py-4 group first:pt-0 last:pb-0">
              <div className="flex items-center gap-4 min-w-0">
                {c.imageUrl ? (
                  <div className="h-11 w-14 bg-[var(--color-surface-alt)] border overflow-hidden flex-shrink-0 rounded-sm" style={{ borderColor: "var(--color-border)" }}>
                    <img src={resolveImageUrl(c.imageUrl)} alt={c.name} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="h-11 w-14 bg-[var(--color-surface-alt)] border flex items-center justify-center text-[var(--color-ink-faint)] group-hover:text-[var(--color-green)] transition-colors duration-300 flex-shrink-0 rounded-sm" style={{ borderColor: "var(--color-border)" }}>
                    <Layers className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </div>
                )}
                <div className="min-w-0">
                  <span className="font-display text-[14px] font-semibold text-[var(--color-ink)] tracking-wide truncate block">
                    {c.name}
                  </span>
                  {c.description && (
                    <p className="font-body text-[11px] text-[var(--color-ink-muted)] mt-0.5 truncate max-w-xs">{c.description}</p>
                  )}
                  <p className="font-mono text-[10px] text-[var(--color-ink-faint)] mt-0.5 uppercase tracking-wider">ID: CAT-{c.id}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <button type="button" onClick={() => onEditClick(c)} className="text-[var(--color-ink-faint)] hover:text-[var(--color-green)] transition-colors p-1">
                  <Edit3 className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button type="button" onClick={() => onDeleteClick(c.id)} className="text-[var(--color-ink-faint)] hover:text-red-600 transition-colors p-1">
                  <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}