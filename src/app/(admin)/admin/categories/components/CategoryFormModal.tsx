"use client";

import React, { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Category } from "@/src/types/product";

interface CategoryFormModalProps {
  show: boolean;
  saving: boolean;
  editData: Category | null;
  onSubmit: (name: string) => void;
  onClose: () => void;
}

export default function CategoryFormModal({
  show, saving, editData, onSubmit, onClose
}: CategoryFormModalProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (show) {
      setName(editData ? editData.name : "");
    }
  }, [show, editData]);

  if (!show) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white border w-full max-w-md p-8 shadow-2xl relative rounded-sm" style={{ borderColor: "#E7E3D8" }}>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-[#B8B4A8] hover:text-[#171712] transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <h3 className="font-display text-[15px] font-bold uppercase tracking-[0.15em] text-[#171712] mb-6 border-b pb-4" style={{ borderColor: "#EFECE3" }}>
          {editData ? "Edit Category" : "Add Category"}
        </h3>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label className="block font-body text-[10px] font-semibold uppercase tracking-widest text-[#8C8A80] mb-2">
              Category Name
            </label>
            <input
              required
              type="text"
              placeholder="e.g., Performance Components"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={saving}
              className="w-full bg-[#F7F7F4] border h-11 px-4 text-[13px] text-[#171712] outline-none tracking-wide transition-colors rounded-sm focus:border-[#1F4A38]/40"
              style={{ borderColor: "#E7E3D8" }}
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 bg-white border text-[#4A4740] hover:bg-[#F7F7F4] py-3 text-[11px] font-semibold uppercase tracking-widest transition-colors rounded-sm"
              style={{ borderColor: "#E7E3D8" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !name.trim()}
              className="flex-1 bg-[#1F4A38] hover:bg-[#173829] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 text-[11px] font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-sm"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : editData ? "Save Changes" : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}