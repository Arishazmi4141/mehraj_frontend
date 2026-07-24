"use client";

import React from "react";
import { Search, RefreshCw } from "lucide-react";

interface CancelledFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  statusFilter: "cancelled" | "refund";
  setStatusFilter: (filter: "cancelled" | "refund") => void;
  onRefresh: () => void;
}

export default function CancelledFilters({
  searchQuery, setSearchQuery, statusFilter, setStatusFilter, onRefresh
}: CancelledFiltersProps) {
  return (
    <div className="animate-cancelled-node flex flex-col gap-6 mb-8 border-b border-[var(--color-border)] pb-6">
      
      {/* Upper Tab Switches Controls Row */}
      <div className="flex bg-[var(--color-surface)] border border-[var(--color-border)] p-1 self-start">
        <button
          type="button"
          onClick={() => setStatusFilter("refund")}
          className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
            statusFilter === "refund" ? "bg-[var(--color-brass)] text-[var(--color-bg)]" : "text-[var(--color-ink-faint)] hover:text-[var(--color-ink)]"
          }`}
        >
          Refunded Matrices
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter("cancelled")}
          className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
            statusFilter === "cancelled" ? "bg-red-600/10 text-red-700 border border-red-600/25" : "text-[var(--color-ink-faint)] hover:text-[var(--color-ink)]"
          }`}
        >
          Cancelled Allocation Nodes
        </button>
      </div>

      {/* Search Layout Grid Frame */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full items-center">
        <div className="md:col-span-3 relative flex items-center bg-[var(--color-surface)] border border-[var(--color-border)] px-4 h-11 focus-within:border-[var(--color-green)]/40 transition-colors">
          <Search className="h-4 w-4 text-[var(--color-ink-faint)] mr-3" />
          <input
            type="text"
            placeholder="Search cancelled repository mapping tokens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs tracking-wide text-[var(--color-ink)] outline-none placeholder-[var(--color-ink-faint)]"
          />
        </div>
        
        <button
          type="button"
          onClick={onRefresh}
          className="bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:border-[var(--color-green)]/40 h-11 text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink-faint)] hover:text-[var(--color-green)] transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Sync Node</span>
        </button>
      </div>

    </div>
  );
}