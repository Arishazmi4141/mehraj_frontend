"use client";

import React from "react";
import { Edit3, Trash2, Layers } from "lucide-react";
import { Category } from "@/src/types/product";

interface CategoryListTableProps {
  categories: Category[];
  onEditClick: (cat: Category) => void;
  onDeleteClick: (id: number) => void;
}

export default function CategoryListTable({
  categories, onEditClick, onDeleteClick
}: CategoryListTableProps) {
  return (
    <div className="bg-white border p-8 rounded-sm" style={{ borderColor: "#E7E3D8" }}>
      <h3 className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-[#8C8A80] mb-6">
        All Categories
      </h3>

      {categories.length === 0 ? (
        <div className="text-center py-12 text-[#B8B4A8] font-body text-[12px] uppercase tracking-widest">
          No categories yet.
        </div>
      ) : (
        <div className="divide-y" style={{ borderColor: "#EFECE3" }}>
          {categories.map((c) => (
            <div key={c.id} className="flex justify-between items-center py-4 group first:pt-0 last:pb-0">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 bg-[#F1EFE9] border flex items-center justify-center text-[#8C8A80] group-hover:text-[#1F4A38] transition-colors duration-300 rounded-sm" style={{ borderColor: "#E7E3D8" }}>
                  <Layers className="h-3.5 w-3.5" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="font-display text-[14px] font-semibold text-[#171712] tracking-wide">
                    {c.name}
                  </span>
                  <p className="font-mono text-[10px] text-[#B8B4A8] mt-0.5 uppercase tracking-wider">ID: CAT-{c.id}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button type="button" onClick={() => onEditClick(c)} className="text-[#B8B4A8] hover:text-[#1F4A38] transition-colors p-1">
                  <Edit3 className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button type="button" onClick={() => onDeleteClick(c.id)} className="text-[#B8B4A8] hover:text-red-600 transition-colors p-1">
                  <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}