"use client";

import React from "react";
import { Eye, Edit3, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Product } from "@/src/types/product";
import { IMAGE_BASE_URL } from "@/src/lib/api-client";

interface ProductTableProps {
  products: Product[];
  expandedProductId: number | null;
  setExpandedProductId: (id: number | null) => void;
  onViewDetails: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number, name: string) => void;
}

export default function ProductTable({
  products, expandedProductId, setExpandedProductId, onViewDetails, onEdit, onDelete
}: ProductTableProps) {

  const resolveImageUrl = (url: string | undefined | null) => {
    if (!url) return "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=150";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${IMAGE_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-[13px] font-body">
        <thead>
          <tr className="border-b text-[#8C8A80] uppercase tracking-wider text-[10px]" style={{ borderColor: "#E7E3D8" }}>
            <th className="pb-4 font-semibold">Product</th>
            <th className="pb-4 font-semibold">Category</th>
            <th className="pb-4 font-semibold">Variants</th>
            <th className="pb-4 font-semibold">Stock</th>
            <th className="pb-4 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y" style={{ borderColor: "#EFECE3" }}>
          {products.map((p) => {
            const totalStock = p.variants?.reduce((sum, v) => sum + v.stock, 0) || 0;
            const isExpanded = expandedProductId === p.id;
            const minPrice = p.variants?.length ? Math.min(...p.variants.map((v) => v.price)) : 0;
            const maxPrice = p.variants?.length ? Math.max(...p.variants.map((v) => v.price)) : 0;

            const primaryImg = p.productImages?.length
              ? resolveImageUrl(p.productImages[0].imageUrl)
              : "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=150";

            return (
              <React.Fragment key={p.id}>
                <tr
                  className="hover:bg-[#F7F7F4] transition-colors group cursor-pointer"
                  onClick={() => setExpandedProductId(isExpanded ? null : p.id)}
                >
                  <td className="py-5 flex items-center gap-4">
                    <div className="h-10 w-14 bg-[#F1EFE9] border overflow-hidden rounded-sm" style={{ borderColor: "#E7E3D8" }}>
                      <img
                        src={primaryImg}
                        alt={p.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=150";
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-[#171712] font-semibold tracking-wide">{p.name}</p>
                      <p className="text-[11px] text-[#A9773C] font-mono mt-0.5">
                        {minPrice === maxPrice ? `£${minPrice.toLocaleString()}` : `£${minPrice.toLocaleString()} – £${maxPrice.toLocaleString()}`}
                      </p>
                    </div>
                  </td>
                  <td className="py-5 text-[#6B685F]">{p.category?.name}</td>
                  <td className="py-5 font-mono text-[#8C8A80] inline-flex items-center gap-1 mt-4">
                    <span>{p.variants?.length || 0} Variants</span>
                    {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </td>
                  <td className="py-5">
                    <span className={`font-mono text-[10px] uppercase tracking-wider font-semibold ${
                      totalStock === 0 ? "text-red-600" : totalStock <= 10 ? "text-amber-600" : "text-[#6B685F]"
                    }`}>
                      {totalStock === 0 ? "Out of Stock" : `${totalStock} Units`}
                    </span>
                  </td>
                  <td className="py-5 text-right space-x-3" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => onViewDetails(p)} className="text-[#B8B4A8] hover:text-[#171712] transition-colors p-1"><Eye className="h-4 w-4" /></button>
                    <button onClick={() => onEdit(p)} className="text-[#B8B4A8] hover:text-[#1F4A38] transition-colors p-1"><Edit3 className="h-4 w-4" /></button>
                    <button onClick={() => onDelete(p.id, p.name)} className="text-[#B8B4A8] hover:text-red-600 transition-colors p-1"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>

                {isExpanded && p.variants && (
                  <tr>
                    <td colSpan={5} className="bg-[#F7F7F4] px-8 py-4 border-l border-r" style={{ borderColor: "#EFECE3" }}>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {p.variants.map((v, idx) => (
                          <div key={idx} className="border bg-white p-3 font-mono text-[11px] rounded-sm" style={{ borderColor: "#E7E3D8" }}>
                            <p className="text-[#8C8A80] uppercase text-[9px] tracking-wider mb-1">Spec: <strong className="text-[#171712]">{v.size}</strong></p>
                            <p className="text-[#8C8A80]">Price: <span className="text-[#A9773C]">£{v.price}</span></p>
                            <p className="text-[#8C8A80]">Stock: <span className="text-[#4A4740]">{v.stock} Pcs</span></p>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}