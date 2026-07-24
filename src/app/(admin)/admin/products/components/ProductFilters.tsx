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
      <div className="relative flex items-center bg-white border px-4 h-11 rounded-sm" style={{ borderColor: "#E7E3D8" }}>
        <Search className="h-4 w-4 text-[#B8B4A8] mr-3" />
        <input
          type="text"
          placeholder="Search products..."
          value={filters.searchQuery}
          onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
          className="w-full bg-transparent text-[13px] tracking-wide outline-none text-[#171712] placeholder-[#B8B4A8]"
        />
      </div>
      <select
        value={filters.filterCategory}
        onChange={(e) => setFilters({ ...filters, filterCategory: e.target.value })}
        className="bg-white border px-4 h-11 text-[13px] text-[#4A4740] outline-none rounded-sm"
        style={{ borderColor: "#E7E3D8" }}
      >
        <option value="">All Categories</option>
        {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
      </select>
      <select
        value={filters.filterTrending}
        onChange={(e) => setFilters({ ...filters, filterTrending: e.target.value })}
        className="bg-white border px-4 h-11 text-[13px] text-[#4A4740] outline-none rounded-sm"
        style={{ borderColor: "#E7E3D8" }}
      >
        <option value="">Trending Status</option>
        <option value="YES">Trending</option>
        <option value="NO">Not Trending</option>
      </select>
      <button
        onClick={() => setFilters({ searchQuery: "", filterCategory: "", filterTrending: "", filterStatus: "" })}
        className="bg-white border text-[#6B685F] hover:text-[#171712] hover:border-[#1F4A38]/25 text-[11px] font-semibold uppercase tracking-widest transition-colors h-11 rounded-sm"
        style={{ borderColor: "#E7E3D8" }}
      >
        Clear Filters
      </button>
    </div>
  );
}