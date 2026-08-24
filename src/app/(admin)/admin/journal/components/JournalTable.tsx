// (admin)/admin/journal/components/JournalTable.tsx
"use client";

import { Pencil, Trash2, ImageOff } from "lucide-react";
import { Journal } from "@/src/types/journal.types";

export default function JournalTable({
  journals,
  loading,
  onEdit,
  onDelete,
}: {
  journals: Journal[];
  loading: boolean;
  onEdit: (journal: Journal) => void;
  onDelete: (journal: Journal) => void;
}) {
  if (loading) {
    return (
      <div
        className="rounded-sm border p-16 text-center text-[12px] text-[var(--color-ink-faint)]"
        style={{ borderColor: "var(--color-border)" }}
      >
        Loading journal entries...
      </div>
    );
  }

  if (journals.length === 0) {
    return (
      <div className="rounded-sm border p-16 text-center" style={{ borderColor: "var(--color-border)" }}>
        <p className="text-[13px] font-semibold text-[var(--color-ink)]">No entries yet</p>
        <p className="mt-1 text-[12px] text-[var(--color-ink-faint)]">
          Add your first journal entry to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-sm border" style={{ borderColor: "var(--color-border)" }}>
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b" style={{ borderColor: "var(--color-border)", background: "var(--color-surface-alt)" }}>
            <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-faint)]">
              Cover
            </th>
            <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-faint)]">
              Title
            </th>
            <th className="hidden px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-faint)] md:table-cell">
              Excerpt
            </th>
            <th className="hidden px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-faint)] sm:table-cell">
              Published
            </th>
            <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-faint)]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {journals.map((journal) => {
            const cover = journal.journalImages?.[0]?.imageUrl;
            const publishedDate = new Date(journal.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            return (
              <tr key={journal.id} className="border-b last:border-b-0" style={{ borderColor: "var(--color-border)" }}>
                <td className="px-5 py-3">
                  {cover ? (
                    <img src={cover} alt={journal.title} className="h-12 w-12 rounded-sm object-cover" />
                  ) : (
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-sm"
                      style={{ background: "var(--color-surface-alt)" }}
                    >
                      <ImageOff className="h-4 w-4 text-[var(--color-ink-faint)]" strokeWidth={1.5} />
                    </div>
                  )}
                </td>
                <td className="px-5 py-3 text-[12.5px] font-semibold text-[var(--color-ink)]">
                  {journal.title}
                </td>
                <td className="hidden max-w-xs px-5 py-3 text-[12px] leading-[1.6] text-[var(--color-ink-muted)] md:table-cell">
                  <span className="line-clamp-2">{journal.content}</span>
                </td>
                <td className="hidden px-5 py-3 text-[11.5px] text-[var(--color-ink-faint)] sm:table-cell">
                  {publishedDate}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(journal)}
                      className="flex h-8 w-8 items-center justify-center rounded-sm border text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-green)] hover:text-[var(--color-green-deep)]"
                      style={{ borderColor: "var(--color-border)" }}
                      aria-label={`Edit ${journal.title}`}
                    >
                      <Pencil className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(journal)}
                      className="flex h-8 w-8 items-center justify-center rounded-sm border text-[var(--color-ink-muted)] transition-colors hover:border-red-300 hover:text-red-600"
                      style={{ borderColor: "var(--color-border)" }}
                      aria-label={`Delete ${journal.title}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}