// (admin)/admin/magazine/components/MagazineFormModal.tsx
"use client";

import { useRef, useState } from "react";
import { X, UploadCloud, FileText } from "lucide-react";
import { magazineService } from "@/src/services/magazine.service";

export default function MagazineFormModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState<string>(String(new Date().getFullYear()));
  const [archiveJournals, setArchiveJournals] = useState(true);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    const yearNum = Number(year);
    if (!year.trim() || Number.isNaN(yearNum)) {
      setError("A valid year is required.");
      return;
    }
    if (!pdfFile) {
      setError("Please attach the issue's PDF file.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      await magazineService.addMagazine(
        {
          title: title.trim(),
          year: yearNum,
        },
        pdfFile,
        archiveJournals
      );
      onSuccess();
    } catch (err) {
      console.error("Failed to publish magazine:", err);
      setError("Something went wrong while publishing. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
      <div
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-sm border p-7 md:p-9"
        style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-[16px] font-bold text-[var(--color-ink)]">New Magazine Issue</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-sm text-[var(--color-ink-faint)] transition-colors hover:text-[var(--color-ink)]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
              Title *
            </span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The Winter Edit"
              className="w-full rounded-sm border px-4 py-2.5 text-[13px] text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-green)]"
              style={{ borderColor: "var(--color-border)" }}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
              Year *
            </span>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="e.g. 2026"
              className="w-full rounded-sm border px-4 py-2.5 text-[13px] text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-green)]"
              style={{ borderColor: "var(--color-border)" }}
            />
          </label>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
              PDF File *
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-3 rounded-sm border border-dashed px-4 py-4 text-left transition-colors hover:border-[var(--color-green)]"
              style={{ borderColor: "var(--color-border-strong)" }}
            >
              {pdfFile ? (
                <>
                  <FileText className="h-5 w-5 text-[var(--color-green-deep)]" strokeWidth={1.5} />
                  <span className="truncate text-[12.5px] text-[var(--color-ink)]">{pdfFile.name}</span>
                </>
              ) : (
                <>
                  <UploadCloud className="h-5 w-5 text-[var(--color-ink-faint)]" strokeWidth={1.5} />
                  <span className="text-[12.5px] text-[var(--color-ink-faint)]">Click to attach a PDF</span>
                </>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
            />
          </div>

          <label
            className="flex items-start gap-3 rounded-sm border p-4 transition-colors"
            style={{
              borderColor: archiveJournals ? "#F3C4C0" : "var(--color-border)",
              background: archiveJournals ? "#FDECEA" : "transparent",
            }}
          >
            <input
              type="checkbox"
              checked={archiveJournals}
              onChange={(e) => setArchiveJournals(e.target.checked)}
              className="mt-0.5 h-4 w-4"
            />
            <span
              className="text-[12px] leading-[1.6]"
              style={{ color: archiveJournals ? "#7A2E29" : "var(--color-ink-muted)" }}
            >
              Archive all existing Journal entries when this issue publishes.
              {archiveJournals && " This will permanently clear the current Journal — make sure that's intended."}
            </span>
          </label>

          {error && (
            <div
              className="rounded-sm border px-4 py-2.5 text-[12px]"
              style={{ background: "#FDECEA", borderColor: "#F3C4C0", color: "#7A2E29" }}
            >
              {error}
            </div>
          )}

          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-sm border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]"
              style={{ borderColor: "var(--color-border)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-sm bg-[var(--color-green)] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-ink)] transition-colors hover:bg-[var(--color-green-deep)] hover:text-[var(--color-bg)] disabled:opacity-60"
            >
              {saving ? "Publishing..." : "Publish Issue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}