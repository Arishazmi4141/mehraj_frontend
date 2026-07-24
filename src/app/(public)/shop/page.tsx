"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { productService } from "@/src/services/product.service";
import { categoryService } from "@/src/services/category.service";
import { Product } from "@/src/types/product";

import ProductToolbar from "./components/ProductToolbar";
import ProductFilterSidebar from "./components/ProductFilterSidebar";
import ProductCard from "./components/ProductCard";
import ProductPagination from "./components/ProductPagination";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cardsVisible, setCardsVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 12;

  const [filters, setFilters] = useState({
    keyword: "",
    category: initialCategory,
    minPrice: null as number | null,
    maxPrice: null as number | null,
  });

  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [categories, setCategories] = useState<string[]>([]);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setCardsVisible(false);
    try {
      const res = await productService.filterProducts({
        keyword: filters.keyword || null,
        category: filters.category || null,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        page: currentPage,
        size: pageSize,
      });
      setProducts(res.content || []);
      setTotalElements(res.totalElements || 0);
      setTotalPages(res.totalPages || 0);
      setTimeout(() => setCardsVisible(true), 60);
    } catch (err) {
      console.error("Failed to load products", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters.keyword, filters.category, filters.minPrice, filters.maxPrice, currentPage]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    categoryService.getCategories().then((cats) => setCategories(cats.map((c) => c.name)));
  }, []);

  const hasActiveFilters = !!(
    filters.keyword || filters.category || filters.minPrice != null || filters.maxPrice != null
  );
  const activeFilterCount = [
    filters.keyword, filters.category, filters.minPrice != null, filters.maxPrice != null,
  ].filter(Boolean).length;

  const handleSearchInput = (keyword: string) => {
    setFilters((f) => ({ ...f, keyword }));
    setCurrentPage(0);
  };
  const handleCategoryChange = (category: string) => {
    setFilters((f) => ({ ...f, category }));
    setCurrentPage(0);
    setFilterOpen(false);
  };
  const handlePriceChange = (min: number | null, max: number | null) => {
    setFilters((f) => ({ ...f, minPrice: min, maxPrice: max }));
    setCurrentPage(0);
  };
  const handleClearAll = () => {
    setFilters({ keyword: "", category: "", minPrice: null, maxPrice: null });
    setCurrentPage(0);
  };
  const handlePageChange = (page: number) => {
    if (page < 0 || page >= totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#F7F7F4]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        {/* Page heading */}
        <div className="mb-12 text-center">
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#A9773C]">Full Catalogue</span>
          <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#171712] md:text-[2.6rem]">
            All Components
          </h1>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <ProductFilterSidebar
            isOpen={filterOpen}
            categories={categories}
            selectedCategory={filters.category}
            keyword={filters.keyword}
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            hasActiveFilters={hasActiveFilters}
            onClose={() => setFilterOpen(false)}
            onSearchInput={handleSearchInput}
            onCategoryChange={handleCategoryChange}
            onPriceChange={handlePriceChange}
            onClearAll={handleClearAll}
          />

          <div className="flex-1">
            <ProductToolbar
              loading={loading}
              totalElements={totalElements}
              viewMode={viewMode}
              setViewMode={setViewMode}
              onFilterToggle={() => setFilterOpen(true)}
              hasActiveFilters={hasActiveFilters}
              activeFilterCount={activeFilterCount}
              keyword={filters.keyword}
              category={filters.category}
              minPrice={filters.minPrice}
              maxPrice={filters.maxPrice}
              onClearSearch={() => handleSearchInput("")}
              onClearCategory={() => handleCategoryChange("")}
              onClearPrice={() => handlePriceChange(null, null)}
            />

            {loading ? (
              <div className="flex items-center justify-center py-32">
                <Loader2 className="h-6 w-6 animate-spin text-[#1F4A38]" />
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <p className="font-display text-[15px] font-semibold text-[#171712]">No products found</p>
                <p className="mt-2 font-body text-[12px] text-[#8C8A80]">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <div
                className={`transition-opacity duration-500 ${cardsVisible ? "opacity-100" : "opacity-0"} ${
                  viewMode === "grid"
                    ? "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
                    : "flex flex-col gap-5"
                }`}
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            )}

            <ProductPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F7F4]" />}>
      <ShopContent />
    </Suspense>
  );
}