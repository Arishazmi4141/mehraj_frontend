"use client";
import React from "react";
import { Search, X } from "lucide-react";
import { InquiryFilterParams } from "@/src/types/inquiry";

interface InquiryFiltersProps {
  filters: InquiryFilterParams;
  setFilters: (val: InquiryFilterParams) => void;
}

export default function InquiryFilters({ filters, setFilters }: InquiryFiltersProps) {
  const hasActiveFilters = !!(filters.name || filters.fromDate || filters.toDate);

  return (
    <div className="animate-inq-node mb-6 flex flex-col sm:flex-row gap-3 sm:items-end">
      <div className="flex-1">
        <label className="block font-body text-[10px] font-semibold uppercase tracking-widest text-[var(--color-ink-faint)] mb-2">
          Search by name
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--color-ink-faint)]" />
          <input
            type="text"
            placeholder="e.g., Priya Sharma"
            value={filters.name || ""}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            className="w-full bg-[var(--color-bg)] border h-11 pl-9 pr-4 text-[13px] text-[var(--color-ink)] outline-none rounded-sm focus:border-[var(--color-green)]/40"
            style={{ borderColor: "var(--color-border)" }}
          />
        </div>
      </div>

      <div>
        <label className="block font-body text-[10px] font-semibold uppercase tracking-widest text-[var(--color-ink-faint)] mb-2">From</label>
        <input
          type="date"
          value={filters.fromDate ? filters.fromDate.slice(0, 10) : ""}
          onChange={(e) => setFilters({ ...filters, fromDate: e.target.value ? `${e.target.value}T00:00:00` : null })}
          className="bg-[var(--color-bg)] border h-11 px-3 text-[13px] text-[var(--color-ink)] outline-none rounded-sm focus:border-[var(--color-green)]/40"
          style={{ borderColor: "var(--color-border)" }}
        />
      </div>

      <div>
        <label className="block font-body text-[10px] font-semibold uppercase tracking-widest text-[var(--color-ink-faint)] mb-2">To</label>
        <input
          type="date"
          value={filters.toDate ? filters.toDate.slice(0, 10) : ""}
          onChange={(e) => setFilters({ ...filters, toDate: e.target.value ? `${e.target.value}T23:59:59` : null })}
          className="bg-[var(--color-bg)] border h-11 px-3 text-[13px] text-[var(--color-ink)] outline-none rounded-sm focus:border-[var(--color-green)]/40"
          style={{ borderColor: "var(--color-border)" }}
        />
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => setFilters({ name: "", fromDate: null, toDate: null })}
          className="h-11 px-4 flex items-center gap-1.5 border text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-alt)] rounded-sm transition-colors"
          style={{ borderColor: "var(--color-border)" }}
        >
          <X className="h-3.5 w-3.5" /> Clear
        </button>
      )}
    </div>
  );
}