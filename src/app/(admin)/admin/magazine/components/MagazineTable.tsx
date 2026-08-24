// (admin)/admin/magazine/components/MagazineTable.tsx
"use client";

import { Trash2, FileText, ExternalLink } from "lucide-react";
import { Magazine } from "@/src/types/magazine.types";

export default function MagazineTable({
  magazines,
  loading,
  onDelete,
}: {
  magazines: Magazine[];
  loading: boolean;
  onDelete: (magazine: Magazine) => void;
}) {
  if (loading) {
    return (
      <div
        className="rounded-sm border p-16 text-center text-[12px] text-[var(--color-ink-faint)]"
        style={{ borderColor: "var(--color-border)" }}
      >
        Loading magazine issues...
      </div>
    );
  }

  if (magazines.length === 0) {
    return (
      <div className="rounded-sm border p-16 text-center" style={{ borderColor: "var(--color-border)" }}>
        <p className="text-[13px] font-semibold text-[var(--color-ink)]">No issues yet</p>
        <p className="mt-1 text-[12px] text-[var(--color-ink-faint)]">
          Publish your first magazine issue to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-sm border" style={{ borderColor: "var(--color-border)" }}>
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b" style={{ borderColor: "var(--color-border)", background: "var(--color-surface-alt)" }}>
            <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-faint)]">
              Issue
            </th>
            <th className="hidden px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-faint)] sm:table-cell">
              Year
            </th>
            <th className="hidden px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-faint)] md:table-cell">
              Published
            </th>
            <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-faint)]">
              PDF
            </th>
            <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-faint)]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {magazines.map((m) => {
            const publishedDate = new Date(m.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            return (
              <tr key={m.id} className="border-b last:border-b-0" style={{ borderColor: "var(--color-border)" }}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-sm"
                      style={{ background: "var(--color-surface-alt)" }}
                    >
                      <FileText className="h-4 w-4 text-[var(--color-ink-faint)]" strokeWidth={1.5} />
                    </div>
                    <p className="text-[12.5px] font-semibold text-[var(--color-ink)]">{m.title}</p>
                  </div>
                </td>
                <td className="hidden px-5 py-3 text-[12px] text-[var(--color-ink-muted)] sm:table-cell">
                  {m.year}
                </td>
                <td className="hidden px-5 py-3 text-[11.5px] text-[var(--color-ink-faint)] md:table-cell">
                  {publishedDate}
                </td>
                <td className="px-5 py-3">
                  <a
                    href={m.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--color-green-deep)] hover:underline"
                  >
                    View <ExternalLink className="h-3 w-3" />
                  </a>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => onDelete(m)}
                      className="flex h-8 w-8 items-center justify-center rounded-sm border text-[var(--color-ink-muted)] transition-colors hover:border-red-300 hover:text-red-600"
                      style={{ borderColor: "var(--color-border)" }}
                      aria-label={`Delete ${m.title}`}
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