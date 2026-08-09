"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { productService } from "@/src/services/product.service";
import { categoryService, Category } from "@/src/services/category.service";
import { Product } from "@/src/types/product";
import CollectionProductCard from "@/src/app/(public)/collections/components/CollectionProductCard";

export default function CollectionDetailPage() {
  const params = useParams();
  const categoryId = Number(params.id);

  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    Promise.all([
      productService.getProductsByCategory(categoryId),
      categoryService.getCategories(),
    ])
      .then(([productData, categories]) => {
        setProducts(productData);
        setCategory(categories.find((c) => c.id === categoryId) || null);
      })
      .catch((err) => console.error("Collection fetch failed", err))
      .finally(() => setLoading(false));
  }, [categoryId]);

  return (
    <main className="min-h-screen bg-[#F6F2E9]">
      {!loading && category?.imageUrl && (
        <div className="relative h-[42vh] w-full overflow-hidden bg-[#EDE6D8]">
          <img src={category.imageUrl} alt={category.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B18]/70 via-[#1B1B18]/10 to-transparent" />
        </div>
      )}

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-[#2E4B3F]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#2E4B3F]">
              Collection
            </span>
            <span className="h-px w-6 bg-[#2E4B3F]" />
          </div>
          <h1 className="font-serif text-3xl font-light leading-[1.12] text-[#1B1B18] md:text-[2.8rem]">
            {loading ? "Loading…" : category?.name || "This Collection"}
          </h1>
          {category?.description && (
            <p className="mx-auto mt-4 max-w-lg font-sans text-xs leading-[1.85] text-[#1B1B18]/60">
              {category.description}
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