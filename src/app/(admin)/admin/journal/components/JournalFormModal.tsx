// (admin)/admin/journal/components/JournalFormModal.tsx
"use client";

import { useRef, useState } from "react";
import { X, ImagePlus, Trash2 } from "lucide-react";
import { journalService } from "@/src/services/journal.service";
import { Journal } from "@/src/types/journal.types";

interface Props {
  journal: Journal | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function JournalFormModal({ journal, onClose, onSuccess }: Props) {
  const isEditing = Boolean(journal);

  const [title, setTitle] = useState(journal?.title ?? "");
  const [content, setContent] = useState(journal?.content ?? "");
  const [existingImages, setExistingImages] = useState(journal?.journalImages ?? []);
  // NEW: track ids removed from existingImages so we can tell the backend.
  const [removedImageIds, setRemovedImageIds] = useState<number[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fileArr = Array.from(files);
    setNewImages((prev) => [...prev, ...fileArr]);
    setNewPreviews((prev) => [...prev, ...fileArr.map((f) => URL.createObjectURL(f))]);
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (id: number) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== id));
    setRemovedImageIds((prev) => [...prev, id]); // NEW
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Title and content are both required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      if (isEditing && journal) {
        await journalService.updateJournal(journal.id, {
          title: title.trim(),
          content: content.trim(),
          images: newImages,
          deleteImageIds: removedImageIds, // NEW
        });
      } else {
        await journalService.addJournal({
          title: title.trim(),
          content: content.trim(),
          images: newImages,
        });
      }
      onSuccess();
    } catch (err) {
      console.error("Failed to save journal entry:", err);
      setError("Something went wrong while saving. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-sm border p-7 md:p-9"
        style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-[16px] font-bold text-[var(--color-ink)]">
            {isEditing ? "Edit Entry" : "New Journal Entry"}
          </h2>
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
              placeholder="e.g. October Diaries"
              className="w-full rounded-sm border px-4 py-2.5 text-[13px] text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-green)]"
              style={{ borderColor: "var(--color-border)" }}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
              Content *
            </span>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={7}
              placeholder="Write the journal entry..."
              className="w-full resize-none rounded-sm border px-4 py-2.5 text-[13px] leading-[1.7] text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-green)]"
              style={{ borderColor: "var(--color-border)" }}
            />
          </label>

          {/* Images */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
              Images
            </span>

            <div className="flex flex-wrap gap-3">
              {existingImages.map((img) => (
                <div
                  key={img.id}
                  className="group relative h-20 w-20 overflow-hidden rounded-sm border"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <img src={img.imageUrl} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(img.id)}
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label="Remove image"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}

              {newPreviews.map((src, i) => (
                <div
                  key={src}
                  className="group relative h-20 w-20 overflow-hidden rounded-sm border"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeNewImage(i)}
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label="Remove image"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-sm border border-dashed text-[var(--color-ink-faint)] transition-colors hover:border-[var(--color-green)] hover:text-[var(--color-green-deep)]"
                style={{ borderColor: "var(--color-border-strong)" }}
              >
                <ImagePlus className="h-4 w-4" strokeWidth={1.5} />
                <span className="text-[9px] uppercase tracking-wider">Add</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFilesSelected(e.target.files)}
              />
            </div>

            {isEditing && (
              <p className="text-[10.5px] text-[var(--color-ink-faint)]">
                Existing images stay unless removed. Newly added images upload on save.
              </p>
            )}
          </div>

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
              {saving ? "Saving..." : isEditing ? "Save Changes" : "Publish Entry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}