"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { productService } from "@/src/services/product.service";
import { categoryService, Category } from "@/src/services/category.service";
import { subCategoryService } from "@/src/services/subcategory.service";
import { SubCategory, Product } from "@/src/types/product";
import CollectionProductCard from "@/src/app/(public)/collections/components/CollectionProductCard";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=900";

export default function CollectionDetailPage() {
  const params = useParams();
  const categoryId = Number(params.id);

  const [category, setCategory] = useState<Category | null>(null);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"subcategories" | "products">("products");

  useEffect(() => {
    if (!categoryId) return;

    setLoading(true);

    Promise.all([
      categoryService.getCategories(),
      subCategoryService.getSubCategoriesByCategory(categoryId),
    ])
      .then(([categories, subCats]) => {
        const matchedCategory = categories.find((c) => c.id === categoryId) || null;
        setCategory(matchedCategory);
        setSubCategories(subCats);

        if (!matchedCategory) {
          setProducts([]);
          setLoading(false);
          return;
        }

        // Agar is category ki sub-categories hain to unka grid dikhao
        if (subCats.length > 0) {
          setMode("subcategories");
          setLoading(false);
          return;
        }

        // Warna seedhe products dikhao (pehle wala behavior)
        setMode("products");
        return productService
          .filterProducts({ category: matchedCategory.name, size: 100 })
          .then((page) => setProducts(page.content || []))
          .finally(() => setLoading(false));
      })
      .catch((err) => {
        console.error("Collection fetch failed", err);
        setProducts([]);
        setSubCategories([]);
        setLoading(false);
      });
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
        ) : mode === "subcategories" ? (
          subCategories.length === 0 ? (
            <p className="text-center font-sans text-sm text-[#1B1B18]/50">No sub-collections yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {subCategories.map((sc) => (
                <Link
                  key={sc.id}
                  href={`/collections/${categoryId}/${sc.id}`}
                  className="group relative flex flex-col overflow-hidden border border-[#1B1B18]/10 bg-white"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EDE6D8]">
                    <img
                      src={sc.imageUrl || FALLBACK_IMAGE}
                      alt={sc.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B18]/75 via-[#1B1B18]/15 to-transparent" />
                    <span className="absolute bottom-5 left-5 right-5 font-serif text-2xl font-light text-[#F6F2E9]">
                      {sc.name}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    {sc.description && (
                      <p className="mb-4 flex-1 font-sans text-[12px] leading-[1.75] text-[#1B1B18]/55">
                        {sc.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#2E4B3F]">
                        View Collection
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#2E4B3F] transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )
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