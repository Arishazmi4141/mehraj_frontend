"use client";

import { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { productService } from "@/src/services/product.service";
import { categoryService, Category } from "@/src/services/category.service";
import { Product } from "@/src/types/product";
import CollectionProductCard from "@/src/app/(public)/collections/components/CollectionProductCard";

const PAGE_SIZE = 12;

export default function ShopAllPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    categoryService.getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    productService
      .filterProducts({
        keyword: keyword || null,
        category: selectedCategory || null,
        page,
        size: PAGE_SIZE,
      })
      .then((data) => {
        setProducts(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
      })
      .catch((err) => console.error("Shop fetch failed", err))
      .finally(() => setLoading(false));
  }, [keyword, selectedCategory, page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    setKeyword(keywordInput.trim());
  };

  const handleCategoryChange = (name: string) => {
    setPage(0);
    setSelectedCategory(name);
  };

  return (
    <main className="min-h-screen bg-[#F6F2E9] pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-14 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-[#2E4B3F]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#2E4B3F]">
              Shop All
            </span>
            <span className="h-px w-6 bg-[#2E4B3F]" />
          </div>
          <h1 className="font-serif text-3xl font-light leading-[1.12] text-[#1B1B18] md:text-[2.6rem]">
            The Full <span className="italic text-[#5C2A32]">MehRāj Wardrobe</span>
          </h1>
        </div>

        {/* Toolbar: search + category filter */}
        <div className="mb-10 flex flex-col gap-4 border border-[#1B1B18]/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center gap-2 border border-[#1B1B18]/15 px-3">
            <Search className="h-4 w-4 shrink-0 text-[#1B1B18]/40" />
            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              placeholder="Search products..."
              className="h-11 w-full bg-transparent font-sans text-sm text-[#1B1B18] outline-none placeholder:text-[#1B1B18]/35"
            />
          </form>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleCategoryChange("")}
              className={`border px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors ${
                selectedCategory === ""
                  ? "border-[#1B1B18] bg-[#1B1B18] text-[#F6F2E9]"
                  : "border-[#1B1B18]/20 text-[#1B1B18]/60 hover:border-[#1B1B18]"
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => handleCategoryChange(c.name)}
                className={`border px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors ${
                  selectedCategory === c.name
                    ? "border-[#1B1B18] bg-[#1B1B18] text-[#F6F2E9]"
                    : "border-[#1B1B18]/20 text-[#1B1B18]/60 hover:border-[#1B1B18]"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {!loading && (
          <p className="mb-6 font-sans text-xs text-[#1B1B18]/45">
            {totalElements} {totalElements === 1 ? "product" : "products"} found
          </p>
        )}

        {/* Product grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] animate-pulse border border-[#1B1B18]/10 bg-[#EDE6D8]" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="py-20 text-center font-sans text-sm text-[#1B1B18]/50">
            No products match your search — try a different keyword or category.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <CollectionProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="flex h-10 w-10 items-center justify-center border border-[#1B1B18]/15 text-[#1B1B18] transition-colors disabled:cursor-not-allowed disabled:opacity-30 hover:border-[#2E4B3F]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-sans text-xs uppercase tracking-[0.15em] text-[#1B1B18]/60">
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="flex h-10 w-10 items-center justify-center border border-[#1B1B18]/15 text-[#1B1B18] transition-colors disabled:cursor-not-allowed disabled:opacity-30 hover:border-[#2E4B3F]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}