"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ShoppingBag, Check, Loader2, Minus, Plus } from "lucide-react";
import { Product, ProductVariant } from "@/src/types/product";
import { IMAGE_BASE_URL } from "@/src/lib/api-client";
import { cartService } from "@/src/services/cart.service";
import { isTrending } from "@/src/lib/utils";

const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

export default function CollectionProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const sortedVariants = useMemo(() => {
    const variants = product.variants ?? [];
    return [...variants].sort((a, b) => {
      const ai = SIZE_ORDER.indexOf((a.size || "").toUpperCase());
      const bi = SIZE_ORDER.indexOf((b.size || "").toUpperCase());
      if (ai === -1 && bi === -1) return 0;
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  }, [product.variants]);

  const firstInStock = sortedVariants.find((v) => v.stock > 0) ?? sortedVariants[0];
  const [selectedVariantId, setSelectedVariantId] = useState<number | undefined>(firstInStock?.id);
  const [qty, setQty] = useState(1);

  const selectedVariant = sortedVariants.find((v) => v.id === selectedVariantId) ?? firstInStock;

  const isOutOfStock = !sortedVariants.some((v) => v.stock > 0);
  const hasMultipleSizes = sortedVariants.length > 1;

  const minPrice = sortedVariants.length ? Math.min(...sortedVariants.map((v) => v.price)) : 0;
  const maxPrice = sortedVariants.length ? Math.max(...sortedVariants.map((v) => v.price)) : 0;

  const priceDisplay = selectedVariant
    ? `₹${selectedVariant.price.toLocaleString()}`
    : minPrice === maxPrice
    ? `₹${minPrice.toLocaleString()}`
    : `₹${minPrice.toLocaleString()} – ₹${maxPrice.toLocaleString()}`;

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

  const handleSizeSelect = (e: React.MouseEvent, variant: ProductVariant) => {
    e.preventDefault();
    e.stopPropagation();
    if (variant.stock <= 0) return;
    setSelectedVariantId(variant.id);
    setQty(1); // size badalte hi qty reset — naye size ka stock alag ho sakta hai
    setIsAdded(false);
  };

  const incrementQty = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const max = selectedVariant?.stock ?? 1;
    if (qty < max) setQty((q) => q + 1);
  };

  const decrementQty = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (qty > 1) setQty((q) => q - 1);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedVariant || selectedVariant.stock <= 0 || isAdding) return;
    setIsAdding(true);
    try {
      // jitni qty select ki hai, usi variant (size) ke against utni hi add hogi
      await cartService.addItem(selectedVariant.id, qty);
      setIsAdded(true);
      setQty(1);
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
          {isTrending(product.trending) && (
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

          {/* Size selector */}
          {hasMultipleSizes && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {sortedVariants.map((variant) => {
                const outOfStock = variant.stock <= 0;
                const isSelected = variant.id === selectedVariant?.id;
                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={(e) => handleSizeSelect(e, variant)}
                    disabled={outOfStock}
                    title={outOfStock ? `${variant.size} - Out of stock` : variant.size}
                    className={`h-8 min-w-[2.1rem] border px-2 font-sans text-[10px] font-semibold uppercase tracking-wide transition-colors ${
                      outOfStock
                        ? "cursor-not-allowed border-[#1B1B18]/10 text-[#1B1B18]/30 line-through"
                        : isSelected
                        ? "border-[#1B1B18] bg-[#1B1B18] text-white"
                        : "border-[#1B1B18]/25 text-[#1B1B18]/70 hover:border-[#1B1B18]"
                    }`}
                  >
                    {variant.size}
                  </button>
                );
              })}
            </div>
          )}

          {/* Quantity stepper */}
          {!isOutOfStock && selectedVariant && (
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center border border-[#1B1B18]/20">
                <button
                  type="button"
                  onClick={decrementQty}
                  disabled={qty <= 1}
                  className="flex h-8 w-8 items-center justify-center text-[#1B1B18]/70 hover:text-[#1B1B18] disabled:opacity-30"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-8 text-center font-sans text-[12px] text-[#1B1B18]">{qty}</span>
                <button
                  type="button"
                  onClick={incrementQty}
                  disabled={qty >= selectedVariant.stock}
                  className="flex h-8 w-8 items-center justify-center text-[#1B1B18]/70 hover:text-[#1B1B18] disabled:opacity-30"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
              <span className="font-sans text-[9px] uppercase tracking-[0.15em] text-[#1B1B18]/40">
                {selectedVariant.stock} in stock
              </span>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || !selectedVariant || selectedVariant.stock <= 0 || isAdding || isAdded}
            className={`mt-4 flex w-full items-center justify-center gap-2 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
              isAdded
                ? "bg-[#EBF3ED] text-[#1E4D2B]"
                : isOutOfStock || !selectedVariant || selectedVariant.stock <= 0
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
            ) : isOutOfStock || !selectedVariant || selectedVariant.stock <= 0 ? (
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