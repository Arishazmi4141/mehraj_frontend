// (admin)/admin/magazine/components/MagazineFilters.tsx
"use client";

import { Search } from "lucide-react";

export default function MagazineFilters({
  search,
  onSearchChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <div
      className="flex items-center gap-2.5 rounded-sm border px-4 py-2.5"
      style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
    >
      <Search className="h-4 w-4 shrink-0 text-[var(--color-ink-faint)]" strokeWidth={1.5} />
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search issues on this page by title, label, or description..."
        className="w-full bg-transparent text-[12.5px] text-[var(--color-ink)] outline-none placeholder:text-[var(--color-ink-faint)]"
      />
    </div>
  );
}