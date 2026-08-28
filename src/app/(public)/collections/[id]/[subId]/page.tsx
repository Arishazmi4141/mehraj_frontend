"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { productService } from "@/src/services/product.service";
import { subCategoryService } from "@/src/services/subcategory.service";
import { SubCategory, Product } from "@/src/types/product";
import CollectionProductCard from "@/src/app/(public)/collections/components/CollectionProductCard";

export default function SubCollectionDetailPage() {
  const params = useParams();
  const categoryId = Number(params.id);
  const subCategoryId = Number(params.subId);

  const [subCategory, setSubCategory] = useState<SubCategory | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId || !subCategoryId) return;

    setLoading(true);

    subCategoryService
      .getSubCategoriesByCategory(categoryId)
      .then((subCats) => {
        const matchedSubCategory = subCats.find((sc) => sc.id === subCategoryId) || null;
        setSubCategory(matchedSubCategory);

        if (!matchedSubCategory) {
          setProducts([]);
          setLoading(false);
          return;
        }

        // Category ke products laake, sub-category se client-side filter
        return productService
          .filterProducts({ category: matchedSubCategory.category?.name, size: 200 })
          .then((page) => {
            const allProducts = page.content || [];
            const filtered = allProducts.filter((p) => p.subCategory?.id === subCategoryId);
            setProducts(filtered);
          })
          .finally(() => setLoading(false));
      })
      .catch((err) => {
        console.error("Sub-collection fetch failed", err);
        setProducts([]);
        setLoading(false);
      });
  }, [categoryId, subCategoryId]);

  return (
    <main className="min-h-screen bg-[#F6F2E9]">
      {!loading && subCategory?.imageUrl && (
        <div className="relative h-[42vh] w-full overflow-hidden bg-[#EDE6D8]">
          <img src={subCategory.imageUrl} alt={subCategory.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B18]/70 via-[#1B1B18]/10 to-transparent" />
        </div>
      )}

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-[#2E4B3F]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#2E4B3F]">
              {subCategory?.category?.name || "Collection"}
            </span>
            <span className="h-px w-6 bg-[#2E4B3F]" />
          </div>
          <h1 className="font-serif text-3xl font-light leading-[1.12] text-[#1B1B18] md:text-[2.8rem]">
            {loading ? "Loading…" : subCategory?.name || "This Collection"}
          </h1>
          {subCategory?.description && (
            <p className="mx-auto mt-4 max-w-lg font-sans text-xs leading-[1.85] text-[#1B1B18]/60">
              {subCategory.description}
            </p>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] animate-pulse border border-[#1B1B18]/10 bg-[#EDE6D8]" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center font-sans text-sm text-[#1B1B18]/50">
            No products in this collection yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <CollectionProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}