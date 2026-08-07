"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ShoppingBag, Check, Loader2 } from "lucide-react";
import { Product } from "@/src/types/product";
import { IMAGE_BASE_URL } from "@/src/lib/api-client";
import { cartService } from "@/src/services/cart.service";

export default function CollectionProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const defaultVariant = product.variants?.find((v) => v.stock > 0) || product.variants?.[0];
  const isOutOfStock = !product.variants?.some((v) => v.stock > 0);

  const minPrice = product.variants?.length ? Math.min(...product.variants.map((v) => v.price)) : 0;
  const maxPrice = product.variants?.length ? Math.max(...product.variants.map((v) => v.price)) : 0;
  const priceDisplay =
    minPrice === maxPrice ? `₹${minPrice.toLocaleString()}` : `₹${minPrice.toLocaleString()} – ₹${maxPrice.toLocaleString()}`;

  const resolveImageUrl = (url: string | undefined | null) => {
    if (!url) return "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${IMAGE_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const displayImage = resolveImageUrl(product.productImages?.[0]?.imageUrl);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { y: -6, borderColor: "#5C2A32", duration: 0.4, ease: "power2.out" });
    }
  };
  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { y: 0, borderColor: "rgba(27,27,24,0.1)", duration: 0.5, ease: "power2.out" });
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock || isAdding || !defaultVariant) return;
    setIsAdding(true);
    try {
      await cartService.addItem(defaultVariant.id, 1);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2500);
    } catch {
      alert("Couldn't add this item to your bag — please check stock and try again.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Link href={`/shop/${product.id}`} className="block group">
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex flex-col overflow-hidden border bg-white transition-all duration-300"
        style={{ borderColor: "rgba(27,27,24,0.1)" }}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EDE6D8]">
          <img
            src={displayImage}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {product.trending === "YES" && (
            <div className="absolute top-3 right-3 z-10 bg-[#5C2A32] px-2.5 py-1 font-sans text-[8px] font-semibold uppercase tracking-[0.2em] text-white">
              Trending
            </div>
          )}
          {isOutOfStock && (
            <div className="absolute bottom-3 left-3 z-10 bg-[#1B1B18]/90 px-2.5 py-1 font-sans text-[8px] font-semibold uppercase tracking-[0.2em] text-[#F6F2E9]">
              Out of Stock
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-serif text-[16px] font-light leading-snug text-[#1B1B18] transition-colors duration-300 group-hover:text-[#5C2A32] line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1.5 font-sans text-[11px] leading-[1.7] text-[#1B1B18]/55 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-[#1B1B18]/10 pt-3">
            <span className="font-serif text-[15px] font-normal text-[#1B1B18]">{priceDisplay}</span>
            {!isOutOfStock && (
              <span className="font-sans text-[9px] uppercase tracking-[0.15em] text-[#2E4B3F] font-semibold">
                Available
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || isAdding || isAdded}
            className={`mt-4 flex w-full items-center justify-center gap-2 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
              isAdded
                ? "bg-[#EBF3ED] text-[#1E4D2B]"
                : isOutOfStock
                ? "cursor-not-allowed bg-[#EDE6D8] text-[#1B1B18]/40"
                : "bg-[#1B1B18] text-[#F6F2E9] hover:bg-[#5C2A32]"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-3.5 w-3.5" /> Added To Bag
              </>
            ) : isAdding ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : isOutOfStock ? (
              "Out of Stock"
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" /> Add To Bag
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}