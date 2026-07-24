"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, Search } from "lucide-react";

interface ProductFilterSidebarProps {
  isOpen: boolean;
  categories: string[];
  selectedCategory: string;
  keyword: string;
  minPrice: number | null;
  maxPrice: number | null;
  hasActiveFilters: boolean;
  onClose: () => void;
  onSearchInput: (keyword: string) => void;
  onCategoryChange: (category: string) => void;
  onPriceChange: (min: number | null, max: number | null) => void;
  onClearAll: () => void;
}

export default function ProductFilterSidebar({
  isOpen, categories, selectedCategory, keyword, minPrice, maxPrice,
  hasActiveFilters, onClose, onSearchInput, onCategoryChange, onPriceChange, onClearAll,
}: ProductFilterSidebarProps) {
  const [localKeyword, setLocalKeyword] = useState(keyword);
  const [localMin, setLocalMin] = useState<string>(minPrice != null ? String(minPrice) : "");
  const [localMax, setLocalMax] = useState<string>(maxPrice != null ? String(maxPrice) : "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setLocalKeyword(keyword), [keyword]);

  const handleSearchChange = (value: string) => {
    setLocalKeyword(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSearchInput(value), 400);
  };

  const applyPrice = () => {
    onPriceChange(
      localMin.trim() ? Number(localMin) : null,
      localMax.trim() ? Number(localMax) : null
    );
  };

  useEffect(() => {
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, []);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto bg-white p-6 transition-transform duration-300 lg:static lg:z-0 lg:w-64 lg:shrink-0 lg:translate-x-0 lg:bg-transparent lg:p-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <h3 className="font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-[#171712]">
            Filters
          </h3>
          <button onClick={onClose}><X className="h-4 w-4 text-[#8C8A80]" /></button>
        </div>

        {/* Search */}
        <div className="mb-8">
          <label className="mb-2 block font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-[#171712]">
            Search
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#B8B4A8]" />
            <input
              type="text"
              value={localKeyword}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-sm border py-2.5 pl-9 pr-3 font-body text-[12px] text-[#171712] outline-none focus:border-[#1F4A38]/40"
              style={{ borderColor: "#E7E3D8" }}
            />
          </div>
        </div>

        {/* Category */}
        <div className="mb-8">
          <label className="mb-3 block font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-[#171712]">
            Category
          </label>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => onCategoryChange("")}
              className={`rounded-sm px-3 py-2 text-left font-body text-[12px] transition-colors ${
                !selectedCategory ? "bg-[#1F4A38]/[0.06] font-semibold text-[#1F4A38]" : "text-[#6B685F] hover:bg-[#F7F7F4]"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`rounded-sm px-3 py-2 text-left font-body text-[12px] transition-colors ${
                  selectedCategory === cat ? "bg-[#1F4A38]/[0.06] font-semibold text-[#1F4A38]" : "text-[#6B685F] hover:bg-[#F7F7F4]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="mb-8">
          <label className="mb-3 block font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-[#171712]">
            Price Range
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={localMin}
              onChange={(e) => setLocalMin(e.target.value)}
              onBlur={applyPrice}
              placeholder="Min"
              className="w-full rounded-sm border px-3 py-2 font-body text-[12px] text-[#171712] outline-none focus:border-[#1F4A38]/40"
              style={{ borderColor: "#E7E3D8" }}
            />
            <span className="text-[#B8B4A8]">–</span>
            <input
              type="number"
              value={localMax}
              onChange={(e) => setLocalMax(e.target.value)}
              onBlur={applyPrice}
              placeholder="Max"
              className="w-full rounded-sm border px-3 py-2 font-body text-[12px] text-[#171712] outline-none focus:border-[#1F4A38]/40"
              style={{ borderColor: "#E7E3D8" }}
            />
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={() => { setLocalKeyword(""); setLocalMin(""); setLocalMax(""); onClearAll(); }}
            className="w-full rounded-sm border py-2.5 font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8C8A80] hover:text-[#171712]"
            style={{ borderColor: "#E7E3D8" }}
          >
            Clear All Filters
          </button>
        )}
      </aside>
    </>
  );
}