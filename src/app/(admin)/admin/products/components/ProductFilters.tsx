"use client";

import React from "react";
import { Search } from "lucide-react";
import { Category } from "@/src/types/product";

interface ProductFiltersProps {
  filters: { searchQuery: string; filterCategory: string; filterTrending: string; filterStatus: string };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  categories: Category[];
}

export default function ProductFilters({ filters, setFilters, categories }: ProductFiltersProps) {
  return (
    <div className="animate-prod-node grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="relative flex items-center bg-[var(--color-surface)] border px-4 h-11 rounded-sm" style={{ borderColor: "var(--color-border)" }}>
        <Search className="h-4 w-4 text-[var(--color-ink-faint)] mr-3" />
        <input
          type="text"
          placeholder="Search products..."
          value={filters.searchQuery}
          onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
          className="w-full bg-transparent text-[13px] tracking-wide outline-none text-[var(--color-ink)] placeholder-[var(--color-ink-faint)]"
        />
      </div>
      <select
        value={filters.filterCategory}
        onChange={(e) => setFilters({ ...filters, filterCategory: e.target.value })}
        className="bg-[var(--color-surface)] border px-4 h-11 text-[13px] text-[var(--color-ink-muted)] outline-none rounded-sm"
        style={{ borderColor: "var(--color-border)" }}
      >
        <option value="">All Categories</option>
        {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
      </select>
      <select
        value={filters.filterTrending}
        onChange={(e) => setFilters({ ...filters, filterTrending: e.target.value })}
        className="bg-[var(--color-surface)] border px-4 h-11 text-[13px] text-[var(--color-ink-muted)] outline-none rounded-sm"
        style={{ borderColor: "var(--color-border)" }}
      >
        <option value="">Trending Status</option>
        <option value="YES">Trending</option>
        <option value="NO">Not Trending</option>
      </select>
      <button
        onClick={() => setFilters({ searchQuery: "", filterCategory: "", filterTrending: "", filterStatus: "" })}
        className="bg-[var(--color-surface)] border text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:border-[var(--color-green)]/30 text-[11px] font-semibold uppercase tracking-widest transition-colors h-11 rounded-sm"
        style={{ borderColor: "var(--color-border)" }}
      >
        Clear Filters
      </button>
    </div>
  );
}