// (admin)/admin/journal/components/JournalFilters.tsx
"use client";

import { Search } from "lucide-react";

export default function JournalFilters({
  search,
  onSearchChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <div className="relative max-w-xs">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-ink-faint)]"
        strokeWidth={1.5}
      />
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by title..."
        className="w-full rounded-sm border py-2.5 pl-9 pr-3 text-[12.5px] text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-green)]"
        style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
      />
    </div>
  );
}