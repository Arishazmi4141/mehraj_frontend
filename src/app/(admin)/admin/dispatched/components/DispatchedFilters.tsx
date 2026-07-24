"use client";

import React from "react";
import { Search, RefreshCw } from "lucide-react";

interface DispatchedFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onClear: () => void;
  onRefresh: () => void;
}

export default function DispatchedFilters({
  searchQuery, setSearchQuery, onClear, onRefresh
}: DispatchedFiltersProps) {
  return (
    <div className="animate-dispatched-node grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      
      {/* Dynamic Search Box Input */}
      <div className="md:col-span-3 relative flex items-center bg-[var(--color-surface)] border border-[var(--color-border)] px-4 h-11 focus-within:border-[var(--color-green)]/40 transition-colors">
        <Search className="h-4 w-4 text-[var(--color-ink-faint)] mr-3" />
        <input
          type="text"
          placeholder="Filter by dispatched tracking hash key nodes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-xs tracking-wide text-[var(--color-ink)] outline-none placeholder-[var(--color-ink-faint)]"
        />
      </div>

      {/* Control Actions Buttons Grid */}
      <div className="flex gap-2 h-11">
        <button
          type="button"
          onClick={onClear}
          className="flex-1 bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:border-[var(--color-brass)]/40 text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors"
        >
          Wipe
        </button>
        <button
          type="button"
          onClick={onRefresh}
          className="bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:border-[var(--color-green)]/40 px-4 text-[var(--color-ink-faint)] hover:text-[var(--color-green)] transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

    </div>
  );
}