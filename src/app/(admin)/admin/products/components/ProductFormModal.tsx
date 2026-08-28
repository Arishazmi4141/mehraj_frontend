"use client";

import React, { useState } from "react";
import { X, Plus, Loader2 } from "lucide-react";
import { Product, ProductVariant, Category, SubCategory } from "@/src/types/product";
import { IMAGE_BASE_URL } from "@/src/lib/api-client";

interface ProductFormModalProps {
  show: boolean;
  actionLoading: boolean;
  categories: Category[];
  subCategories: SubCategory[];        // NEW — parent se filtered list aayegi
  subCategoriesLoading: boolean;       // NEW
  editingProduct: Product | null;
  formData: any;
  setFormData: (val: any) => void;
  formVariants: ProductVariant[];
  setFormVariants: (val: any) => void;
  selectedFilesPreviews: string[];
  localImages: any[];
  deleteImageIds: number[];
  toggleDeleteImageId: (id: number) => void;
  handleFileAttachment: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDropFiles: (files: File[]) => void;
  setSelectedFiles: (val: any) => void;
  setSelectedFilesPreviews: (val: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function ProductFormModal({
  show, actionLoading, categories, subCategories, subCategoriesLoading, editingProduct, formData, setFormData,
  formVariants, setFormVariants, selectedFilesPreviews, localImages, deleteImageIds,
  toggleDeleteImageId, handleFileAttachment, onDropFiles, setSelectedFiles, setSelectedFilesPreviews, onSubmit, onClose
}: ProductFormModalProps) {

  const [isDragging, setIsDragging] = useState(false);

  if (!show) return null;

  const addVariantRow = () => {
    const newVariant = { size: "", price: 0, stock: 10 } as unknown as ProductVariant;
    setFormVariants([...formVariants, newVariant]);
  };

  const resolveImageUrl = (url: string | undefined | null) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${IMAGE_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
      onDropFiles(files);
    }
  };

  const inputClass = "w-full bg-[var(--color-bg)] border h-11 px-4 text-[13px] tracking-wide text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-green)]/40 rounded-sm";
  const inputBorder = { borderColor: "var(--color-border)" };
  const labelClass = "block font-body text-[10px] font-semibold uppercase tracking-widest text-[var(--color-ink-faint)] mb-2";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-[var(--color-surface)] border w-full max-w-2xl p-8 shadow-2xl relative my-auto max-h-[88vh] overflow-y-auto rounded-sm" style={{ borderColor: "var(--color-border)" }}>
        <button type="button" onClick={onClose} className="absolute top-6 right-6 text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors">
          <X className="h-4 w-4" />
        </button>

        <h3 className="font-display text-[15px] font-bold uppercase tracking-[0.15em] text-[var(--color-ink)] mb-8 border-b pb-4" style={{ borderColor: "var(--color-border)" }}>
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h3>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className={labelClass}>Product Name</label>
              <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} style={inputBorder} />
            </div>

            <div>
              <label className={labelClass}>Category</label>
              <select
                required
                value={formData.categoryId || ""}
                onChange={(e) => setFormData({ ...formData, categoryId: Number(e.target.value), subCategoryId: 0 })}
                className={inputClass}
                style={inputBorder}
              >
                <option value="" disabled>Select a category</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            {/* NEW — Sub-Category, category select hone ke baad hi enable */}
            <div>
              <label className={labelClass}>
                Sub-Category <span className="normal-case text-[var(--color-ink-faint)]/70">(optional)</span>
              </label>
              <select
                value={formData.subCategoryId || ""}
                onChange={(e) => setFormData({ ...formData, subCategoryId: Number(e.target.value) })}
                disabled={!formData.categoryId || subCategoriesLoading}
                className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                style={inputBorder}
              >
                <option value="">
                  {subCategoriesLoading
                    ? "Loading..."
                    : !formData.categoryId
                    ? "Select category first"
                    : subCategories.length === 0
                    ? "No sub-categories"
                    : "None"}
                </option>
                {subCategories.map((sc) => <option key={sc.id} value={sc.id}>{sc.name}</option>)}
              </select>
            </div>

            <div>
              <label className={labelClass}>Trending</label>
              <select value={formData.trending} onChange={(e) => setFormData({ ...formData, trending: e.target.value })} className={inputClass} style={inputBorder}>
                <option value="N">Not Trending</option>
                <option value="Y">Trending</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={`${inputClass} p-4 resize-none`} style={inputBorder} />
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block font-body text-[10px] font-semibold uppercase tracking-widest text-[var(--color-ink-faint)] mb-3">Product Images</label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border border-dashed transition-colors duration-300 p-6 text-center cursor-pointer relative rounded-sm ${
                isDragging ? "border-[var(--color-green)] bg-[var(--color-green-soft)]" : "bg-[var(--color-bg)] hover:bg-[var(--color-surface-alt)]"
              }`}
              style={!isDragging ? { borderColor: "var(--color-border-strong)" } : undefined}
            >
              <input type="file" multiple accept="image/*" onChange={handleFileAttachment} className="absolute inset-0 opacity-0 cursor-pointer h-full w-full z-20" />
              <Plus className={`h-5 w-5 mx-auto mb-2 transition-colors ${isDragging ? "text-[var(--color-green)]" : "text-[var(--color-brass)]"}`} />
              <p className="font-body text-[12px] text-[var(--color-ink-faint)]">Click or drag images here to upload</p>
            </div>

            {(selectedFilesPreviews.length > 0 || localImages.length > 0) && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4">
                {localImages.map((img) => {
                  const isDeleted = deleteImageIds.includes(img.id);
                  return (
                    <div key={img.id} className="relative aspect-square border bg-[var(--color-surface-alt)] rounded-sm overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
                      <img
                        src={resolveImageUrl(img.imageUrl)}
                        alt="Product"
                        className={`h-full w-full object-cover transition-all duration-300 ${isDeleted ? "opacity-25 grayscale" : "opacity-100"}`}
                      />
                      <button
                        type="button"
                        onClick={() => toggleDeleteImageId(img.id)}
                        className={`absolute top-1 right-1 z-30 bg-[var(--color-surface)]/90 p-1 rounded-sm transition-colors ${isDeleted ? "text-red-600" : "text-[var(--color-ink-muted)] hover:text-red-600"}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })}
                {selectedFilesPreviews.map((src, idx) => (
                  <div key={`new-preview-${idx}`} className="relative aspect-square border bg-[var(--color-surface-alt)] rounded-sm overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
                    <img src={src} alt="New upload preview" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFiles((prev: any[]) => prev.filter((_, i) => i !== idx));
                        setSelectedFilesPreviews((prev: any[]) => prev.filter((_, i) => i !== idx));
                      }}
                      className="absolute top-1 right-1 z-30 bg-[var(--color-surface)]/90 p-1 rounded-sm text-[var(--color-ink-muted)] hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Variants */}
          <div className="border-t pt-6" style={{ borderColor: "var(--color-border)" }}>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-display text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">Variants</h4>
              <button
                type="button"
                onClick={addVariantRow}
                className="text-[var(--color-green-deep)] border border-[var(--color-green)]/25 hover:border-[var(--color-green)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest transition-colors flex items-center gap-1 rounded-sm"
              >
                <Plus className="h-3 w-3" /> Add Variant
              </button>
            </div>

            <div className="space-y-3 max-h-40 overflow-y-auto pr-1">
              {formVariants.map((v, i) => (
                <div key={i} className="flex gap-4 items-center bg-[var(--color-bg)] border p-3 rounded-sm" style={{ borderColor: "var(--color-border)" }}>
                  <input
                    required type="text" placeholder="Size / spec"
                    value={v.size}
                    onChange={(e) => setFormVariants(formVariants.map((cell, idx) => idx === i ? { ...cell, size: e.target.value } : cell))}
                    className="flex-1 bg-[var(--color-surface)] border h-9 px-3 text-[13px] text-[var(--color-ink)] outline-none rounded-sm focus:border-[var(--color-green)]/40"
                    style={{ borderColor: "var(--color-border)" }}
                  />
                  <input
                    required type="number" placeholder="Price (£)"
                    value={v.price || ""}
                    onChange={(e) => setFormVariants(formVariants.map((cell, idx) => idx === i ? { ...cell, price: Number(e.target.value) } : cell))}
                    className="w-24 bg-[var(--color-surface)] border h-9 px-3 text-[13px] text-[var(--color-ink)] outline-none font-mono rounded-sm focus:border-[var(--color-green)]/40"
                    style={{ borderColor: "var(--color-border)" }}
                  />
                  <input
                    required type="number" placeholder="Stock"
                    value={v.stock === 0 ? 0 : v.stock || ""}
                    onChange={(e) => setFormVariants(formVariants.map((cell, idx) => idx === i ? { ...cell, stock: Number(e.target.value) } : cell))}
                    className="w-24 bg-[var(--color-surface)] border h-9 px-3 text-[13px] text-[var(--color-ink)] outline-none font-mono rounded-sm focus:border-[var(--color-green)]/40"
                    style={{ borderColor: "var(--color-border)" }}
                  />
                  {formVariants.length > 1 && (
                    <button type="button" onClick={() => setFormVariants(formVariants.filter((_, idx) => idx !== i))} className="text-[var(--color-ink-faint)] hover:text-red-600 transition-colors p-1">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-6 flex gap-4" style={{ borderColor: "var(--color-border)" }}>
            <button type="button" onClick={onClose} className="flex-1 bg-[var(--color-surface)] border text-[var(--color-ink-muted)] hover:bg-[var(--color-bg)] py-3.5 text-[11px] font-semibold uppercase tracking-widest transition-colors rounded-sm" style={{ borderColor: "var(--color-border)" }}>
              Cancel
            </button>
            <button type="submit" disabled={actionLoading} className="flex-1 bg-[var(--color-green)] hover:bg-[var(--color-green-deep)] text-[var(--color-bg)] py-3.5 text-[11px] font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-sm disabled:opacity-60">
              {actionLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}