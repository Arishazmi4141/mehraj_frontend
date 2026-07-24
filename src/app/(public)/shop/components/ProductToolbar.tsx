"use client";

import React from "react";
import { SlidersHorizontal, LayoutGrid, List, X } from "lucide-react";

interface ProductToolbarProps {
  loading: boolean;
  totalElements: number;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  onFilterToggle: () => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
  keyword: string;
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
  onClearSearch: () => void;
  onClearCategory: () => void;
  onClearPrice: () => void;
}

export default function ProductToolbar({
  loading, totalElements, viewMode, setViewMode, onFilterToggle,
  hasActiveFilters, activeFilterCount, keyword, category, minPrice, maxPrice,
  onClearSearch, onClearCategory, onClearPrice,
}: ProductToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onFilterToggle}
          className="flex items-center gap-2 rounded-sm border px-4 py-2.5 font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-[#171712] lg:hidden"
          style={{ borderColor: "#E7E3D8" }}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-[#1F4A38] px-1.5 py-0.5 font-mono text-[9px] text-white">
              {activeFilterCount}
            </span>
          )}
        </button>

        <span className="font-body text-[12px] text-[#8C8A80] hidden lg:block">
          {loading ? "Loading..." : `${totalElements} product${totalElements === 1 ? "" : "s"} found`}
        </span>

        <div className="ml-auto flex items-center gap-1 rounded-sm border p-1" style={{ borderColor: "#E7E3D8" }}>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex h-8 w-8 items-center justify-center rounded-sm transition-colors ${
              viewMode === "grid" ? "bg-[#1F4A38] text-white" : "text-[#8C8A80] hover:text-[#171712]"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex h-8 w-8 items-center justify-center rounded-sm transition-colors ${
              viewMode === "list" ? "bg-[#1F4A38] text-white" : "text-[#8C8A80] hover:text-[#171712]"
            }`}
          >
            <List className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <span className="font-body text-[12px] text-[#8C8A80] lg:hidden">
        {loading ? "Loading..." : `${totalElements} product${totalElements === 1 ? "" : "s"} found`}
      </span>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {keyword && (
            <Chip label={`"${keyword}"`} onClear={onClearSearch} />
          )}
          {category && (
            <Chip label={category} onClear={onClearCategory} />
          )}
          {(minPrice != null || maxPrice != null) && (
            <Chip
              label={`₹${minPrice ?? 0} – ₹${maxPrice ?? "∞"}`}
              onClear={onClearPrice}
            />
          )}
        </div>
      )}
    </div>
  );
}

function Chip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span
      className="flex items-center gap-1.5 rounded-full border px-3 py-1 font-body text-[10px] font-medium text-[#4A4740]"
      style={{ borderColor: "#E7E3D8" }}
    >
      {label}
      <button onClick={onClear} className="text-[#8C8A80] hover:text-[#171712]">
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}