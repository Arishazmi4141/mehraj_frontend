"use client";

import React, { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ProductPagination({ currentPage, totalPages, onPageChange }: ProductPaginationProps) {
  const pageNumbers = useMemo(() => {
    const total = totalPages;
    const current = currentPage;
    const pages: number[] = [];

    if (total <= 7) {
      for (let i = 0; i < total; i++) pages.push(i);
    } else {
      pages.push(0);
      if (current > 2) pages.push(-1);
      for (let i = Math.max(1, current - 1); i <= Math.min(total - 2, current + 1); i++) pages.push(i);
      if (current < total - 3) pages.push(-1);
      pages.push(total - 1);
    }
    return pages;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <button
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex h-9 w-9 items-center justify-center rounded-sm border text-[#6B685F] transition-colors hover:text-[#1F4A38] disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ borderColor: "#E7E3D8" }}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pageNumbers.map((p, idx) =>
        p === -1 ? (
          <span key={`ellipsis-${idx}`} className="px-1 font-body text-[12px] text-[#B8B4A8]">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`flex h-9 w-9 items-center justify-center rounded-sm font-mono text-[12px] transition-colors ${
              p === currentPage ? "bg-[#1F4A38] text-white" : "text-[#6B685F] hover:bg-[#F7F7F4]"
            }`}
          >
            {p + 1}
          </button>
        )
      )}

      <button
        disabled={currentPage >= totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-sm border text-[#6B685F] transition-colors hover:text-[#1F4A38] disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ borderColor: "#E7E3D8" }}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}