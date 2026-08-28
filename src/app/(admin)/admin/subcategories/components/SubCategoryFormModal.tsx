"use client";

import React, { useEffect, useState } from "react";
import { X, Loader2, Plus } from "lucide-react";
import { Category, SubCategory } from "@/src/types/product";
import { IMAGE_BASE_URL } from "@/src/lib/api-client";

interface SubCategoryFormModalProps {
  show: boolean;
  saving: boolean;
  editData: SubCategory | null;
  categories: Category[];
  onSubmit: (payload: { name: string; description: string; categoryId: number; imageFile: File | null }) => void;
  onClose: () => void;
}

export default function SubCategoryFormModal({
  show, saving, editData, categories, onSubmit, onClose
}: SubCategoryFormModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (show) {
      setName(editData?.name || "");
      setDescription(editData?.description || "");
      setCategoryId(editData?.category?.id ?? (categories[0]?.id ?? ""));
      setImageFile(null);
      setImagePreview(null);
    }
  }, [show, editData, categories]);

  if (!show) return null;

  const resolveImageUrl = (url: string | undefined | null) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${IMAGE_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const handleFile = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !categoryId) return;
    onSubmit({ name: name.trim(), description: description.trim(), categoryId: Number(categoryId), imageFile });
  };

  const existingImage = editData?.imageUrl ? resolveImageUrl(editData.imageUrl) : null;
  const displayPreview = imagePreview || existingImage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-[var(--color-surface)] border w-full max-w-md p-8 shadow-2xl relative rounded-sm max-h-[88vh] overflow-y-auto" style={{ borderColor: "var(--color-border)" }}>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <h3 className="font-display text-[15px] font-bold uppercase tracking-[0.15em] text-[var(--color-ink)] mb-6 border-b pb-4" style={{ borderColor: "var(--color-border)" }}>
          {editData ? "Edit Sub-Category" : "Add Sub-Category"}
        </h3>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label className="block font-body text-[10px] font-semibold uppercase tracking-widest text-[var(--color-ink-faint)] mb-2">
              Parent Category
            </label>
            <select
              required
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              disabled={saving || !!editData} // edit me category change ka backend support nahi hai abhi
              className="w-full bg-[var(--color-bg)] border h-11 px-4 text-[13px] text-[var(--color-ink)] outline-none tracking-wide transition-colors rounded-sm focus:border-[var(--color-green)]/40 disabled:opacity-60"
              style={{ borderColor: "var(--color-border)" }}
            >
              <option value="" disabled>Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-body text-[10px] font-semibold uppercase tracking-widest text-[var(--color-ink-faint)] mb-2">
              Sub-Category Name
            </label>
            <input
              required
              type="text"
              placeholder="e.g., Formal Shirts"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={saving}
              className="w-full bg-[var(--color-bg)] border h-11 px-4 text-[13px] text-[var(--color-ink)] outline-none tracking-wide transition-colors rounded-sm focus:border-[var(--color-green)]/40"
              style={{ borderColor: "var(--color-border)" }}
            />
          </div>

          <div>
            <label className="block font-body text-[10px] font-semibold uppercase tracking-widest text-[var(--color-ink-faint)] mb-2">
              Description <span className="normal-case text-[var(--color-ink-faint)]/70">(optional)</span>
            </label>
            <textarea
              rows={3}
              placeholder="A short line about this sub-category..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={saving}
              className="w-full bg-[var(--color-bg)] border p-4 text-[13px] text-[var(--color-ink)] outline-none tracking-wide transition-colors resize-none rounded-sm focus:border-[var(--color-green)]/40"
              style={{ borderColor: "var(--color-border)" }}
            />
          </div>

          <div>
            <label className="block font-body text-[10px] font-semibold uppercase tracking-widest text-[var(--color-ink-faint)] mb-2">
              Sub-Category Image <span className="normal-case text-[var(--color-ink-faint)]/70">(optional)</span>
            </label>

            {displayPreview ? (
              <div className="relative aspect-[16/9] border rounded-sm overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
                <img src={displayPreview} alt="Sub-category preview" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => { setImageFile(null); setImagePreview(null); }}
                  className="absolute top-2 right-2 z-10 bg-[var(--color-surface)]/90 p-1.5 rounded-sm text-[var(--color-ink-muted)] hover:text-red-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <label className="absolute inset-0 cursor-pointer">
                  <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
                </label>
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                onDrop={handleDrop}
                className={`border border-dashed transition-colors duration-300 p-6 text-center cursor-pointer relative rounded-sm ${
                  isDragging ? "border-[var(--color-green)] bg-[var(--color-green-soft)]" : "bg-[var(--color-bg)] hover:bg-[var(--color-surface-alt)]"
                }`}
                style={!isDragging ? { borderColor: "var(--color-border-strong)" } : undefined}
              >
                <input type="file" accept="image/*" onChange={handleFileInput} className="absolute inset-0 opacity-0 cursor-pointer h-full w-full z-20" />
                <Plus className={`h-5 w-5 mx-auto mb-2 transition-colors ${isDragging ? "text-[var(--color-green)]" : "text-[var(--color-brass)]"}`} />
                <p className="font-body text-[12px] text-[var(--color-ink-faint)]">Click or drag an image here</p>
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 bg-[var(--color-surface)] border text-[var(--color-ink-muted)] hover:bg-[var(--color-bg)] py-3 text-[11px] font-semibold uppercase tracking-widest transition-colors rounded-sm"
              style={{ borderColor: "var(--color-border)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !name.trim() || !categoryId}
              className="flex-1 bg-[var(--color-green)] hover:bg-[var(--color-green-deep)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-bg)] py-3 text-[11px] font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-sm"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : editData ? "Save Changes" : "Add Sub-Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}