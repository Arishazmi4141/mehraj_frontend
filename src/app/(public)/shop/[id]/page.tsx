"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShoppingBag,
  Zap,
  Check,
  Loader2,
  Star,
  ChevronRight,
  ChevronDown,
  Minus,
  Plus,
  UserRound,
} from "lucide-react";
import { productService } from "@/src/services/product.service";
import { cartService } from "@/src/services/cart.service";
import { Product, ProductVariant } from "@/src/types/product";
import { IMAGE_BASE_URL } from "@/src/lib/api-client";
import { isTrending } from "@/src/lib/utils";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=900";

// Length ke 3 hi type: label + inch
const LENGTH_MAP: Record<string, { label: string; inch: number }> = {
  short: { label: "Short", inch: 28 },
  regular: { label: "Regular", inch: 30 },
  long: { label: "Long", inch: 32 },
};
const LENGTH_ORDER = ["short", "regular", "long"];

// Height -> recommended length (doc section 8)
const HEIGHT_OPTIONS = [
  { label: `5'0" – 5'5"`, key: "short" },
  { label: `5'6" – 5'9"`, key: "regular" },
  { label: `6'1" – 6'3"`, key: "long" },
];

// Backend value ("Regular", "regular", 30, "30\"") ko key (short/regular/long) mein badalta hai
const normalizeLength = (val: unknown): string | null => {
  if (val === null || val === undefined || val === "") return null;
  const s = String(val).trim().toLowerCase();
  if (LENGTH_MAP[s]) return s;
  const n = parseFloat(s.replace(/[^0-9.]/g, ""));
  if (n === 28) return "short";
  if (n === 30) return "regular";
  if (n === 32) return "long";
  return null;
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = Number(params.id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [qty, setQty] = useState(1);

  // Length
  const [length, setLength] = useState<string | null>(null);
  const [heightIdx, setHeightIdx] = useState("");
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [actionError, setActionError] = useState("");

  // Review form
  const [reviewerName, setReviewerName] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(5);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    if (!productId) return;
    productService
      .getProductById(productId)
      .then((data) => {
        setProduct(data);
        const firstAvailable = data.variants?.find((v) => v.stock > 0) || data.variants?.[0];
        setSelectedVariant(firstAvailable || null);
      })
      .catch((err) => console.error("Product fetch failed", err))
      .finally(() => setLoading(false));
  }, [productId]);

  // Variant badalte hi qty reset karo — naye size ka stock alag ho sakta hai
  useEffect(() => {
    setQty(1);
  }, [selectedVariant?.id]);

  // ---- LENGTHS: sirf backend se (variants[].length ya product.lengths) ----
  // ---- LENGTHS: selected size (variant) ki comma-separated lengths, e.g. "Short,Regular,Long" ----
  const availableLengths = useMemo<string[]>(() => {
    if (!selectedVariant) return [];
    const rawLength = (selectedVariant as any).length;
    if (rawLength === null || rawLength === undefined || rawLength === "") return [];

    const tokens = String(rawLength).split(",");
    const keys = tokens.map(normalizeLength).filter((k): k is string => k !== null);
    return LENGTH_ORDER.filter((k) => keys.includes(k)); // fixed order: short, regular, long
  }, [selectedVariant]);

  const hasLengths = availableLengths.length > 0;

  // Default: regular available ho to wahi, warna pehli available
  useEffect(() => {
    if (!hasLengths) {
      setLength(null);
      return;
    }
    setLength((prev) =>
      prev && availableLengths.includes(prev)
        ? prev
        : availableLengths.includes("regular")
        ? "regular"
        : availableLengths[0]
    );
  }, [hasLengths, availableLengths]);

  const handleSuggest = () => {
    if (heightIdx === "") return;
    if (availableLengths.length === 0) return;
    const target = HEIGHT_OPTIONS[Number(heightIdx)].key;
    const targetInch = LENGTH_MAP[target].inch;
    // Backend ki available lengths mein se sabse nazdeek wali
    const rec = availableLengths.reduce((best, cur) =>
      Math.abs(LENGTH_MAP[cur].inch - targetInch) < Math.abs(LENGTH_MAP[best].inch - targetInch)
        ? cur
        : best
    );
    setSuggestion(rec);
    setLength(rec);
  };

  const resolveImageUrl = (url: string | undefined | null) => {
    if (!url) return FALLBACK_IMAGE;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${IMAGE_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const incrementQty = () => {
    const max = selectedVariant?.stock ?? 1;
    if (qty < max) setQty((q) => q + 1);
  };

  const decrementQty = () => {
    if (qty > 1) setQty((q) => q - 1);
  };

  const handleAddToCart = async () => {
    if (!selectedVariant || selectedVariant.stock <= 0 || isAdding || isBuyingNow) return;
    setIsAdding(true);
    setActionError("");
    try {
      // TODO: length production ke liye zaroori hai — cartService.addItem ko
      // third param support karwa ke yahan `length` pass karein.
      await cartService.addItem(selectedVariant.id, qty);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2500);
    } catch (err: any) {
      setActionError(err?.message || "Couldn't add this item to your bag — please try again.");
      setTimeout(() => setActionError(""), 3500);
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!selectedVariant || selectedVariant.stock <= 0 || isAdding || isBuyingNow) return;
    setIsBuyingNow(true);
    setActionError("");
    try {
      await cartService.addItem(selectedVariant.id, qty);
      router.push("/cart");
    } catch (err: any) {
      setActionError(err?.message || "Couldn't proceed — please try again.");
      setTimeout(() => setActionError(""), 3500);
      setIsBuyingNow(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewMsg.trim() || !product) return;
    setSubmittingReview(true);
    try {
      await productService.submitReview({
        productId: product.id,
        reviewerName: reviewerName.trim(),
        reviewMsg: reviewMsg.trim(),
        rating,
      });
      setReviewSubmitted(true);
      setReviewerName("");
      setReviewMsg("");
      setRating(5);
    } catch {
      alert("Couldn't submit your review — please try again.");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F6F2E9]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#1B1B18]/20 border-t-[#2E4B3F]" />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F6F2E9] px-6 text-center">
        <p className="font-serif text-xl text-[#1B1B18]">Product not found.</p>
        <Link href="/collections" className="font-sans text-sm text-[#2E4B3F] underline">
          Browse Collections
        </Link>
      </main>
    );
  }

  const images = product.productImages?.length
    ? product.productImages.map((img) => img.imageUrl)
    : [""];
  const isOutOfStock = !product.variants?.some((v) => v.stock > 0);
  const isSelectedOutOfStock = !selectedVariant || selectedVariant.stock <= 0;
  const actionsDisabled = isOutOfStock || isSelectedOutOfStock || isAdding || isBuyingNow;

  return (
    <main className="min-h-screen bg-[#F6F2E9] pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Breadcrumb */}
        <div className="mb-10 flex items-center gap-2 font-sans text-[9px] font-medium uppercase tracking-[0.35em] text-[#1B1B18]/40">
          <Link href="/" className="hover:text-[#1B1B18]/60">Home</Link>
          <ChevronRight size={9} className="text-[#A6906F]" />
          <Link href="/collections" className="hover:text-[#1B1B18]/60">Collections</Link>
          <ChevronRight size={9} className="text-[#A6906F]" />
          <span className="text-[#2E4B3F]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="aspect-[3/4] w-full overflow-hidden border border-[#1B1B18]/10 bg-[#EDE6D8]">
              <img
                src={resolveImageUrl(images[activeImage])}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square overflow-hidden border bg-[#EDE6D8] transition-colors ${
                      activeImage === i ? "border-[#2E4B3F]" : "border-[#1B1B18]/10"
                    }`}
                  >
                    <img src={resolveImageUrl(img)} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2">
              {product.category?.name && (
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#2E4B3F]">
                  {product.category.name}
                </span>
              )}
              {isTrending(product.trending) && (
                <span className="bg-[#5C2A32] px-2 py-1 font-sans text-[8px] font-semibold uppercase tracking-[0.2em] text-white">
                  Trending
                </span>
              )}
            </div>

            <h1 className="mt-3 font-serif text-3xl font-light leading-[1.15] text-[#1B1B18] md:text-4xl">
              {product.name}
            </h1>

            {selectedVariant && (
              <p className="mt-5 font-serif text-2xl font-normal text-[#1B1B18]">
                ₹{selectedVariant.price.toLocaleString()}
              </p>
            )}

            <p className="mt-6 max-w-md font-sans text-sm leading-[1.9] text-[#1B1B18]/65">
              {product.description}
            </p>

            {/* Size / variant selector */}
            {product.variants?.length > 0 && (
              <div className="mt-8">
                <p className="mb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18]/55">
                  Select Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      disabled={v.stock <= 0}
                      className={`border px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                        v.stock <= 0
                          ? "cursor-not-allowed border-[#1B1B18]/10 text-[#1B1B18]/30 line-through"
                          : selectedVariant?.id === v.id
                          ? "border-[#1B1B18] bg-[#1B1B18] text-[#F6F2E9]"
                          : "border-[#1B1B18]/25 text-[#1B1B18] hover:border-[#1B1B18]"
                      }`}
                    >
                      {v.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Select Length — sirf backend se aayi lengths dikhengi */}
            {hasLengths && (
              <div className="mt-8">
                <p className="mb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18]/55">
                  Select Length
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableLengths.map((key) => {
                    const { label, inch } = LENGTH_MAP[key];
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setLength(key)}
                        className={`flex min-w-[6rem] flex-col items-center border px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                          length === key
                            ? "border-[#1B1B18] bg-[#1B1B18] text-[#F6F2E9]"
                            : "border-[#1B1B18]/25 text-[#1B1B18] hover:border-[#1B1B18]"
                        }`}
                      >
                        <span>{label}</span>
                        <span className="text-[10px] font-normal normal-case opacity-80">({inch}″)</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Not sure about your length? — hamesha dikhega */}
            <div className="mt-5 max-w-md border border-[#1B1B18]/10 bg-[#EDE6D8] p-4">
              <div className="flex items-start gap-3">
                <UserRound className="mt-0.5 h-5 w-5 shrink-0 text-[#1B1B18]" strokeWidth={1.3} />
                <div>
                  <p className="font-sans text-[12px] text-[#1B1B18]">Not sure about your length?</p>
                  <p className="font-sans text-[12px] text-[#1B1B18]/70">
                    Tell us your height and we’ll suggest the best fit for you.
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <div className="relative flex-1">
                  <select
                    value={heightIdx}
                    onChange={(e) => {
                      setHeightIdx(e.target.value);
                      setSuggestion(null);
                    }}
                    className="h-10 w-full appearance-none border border-[#1B1B18]/15 bg-white px-3 pr-8 font-sans text-[12px] text-[#1B1B18] outline-none focus:border-[#2E4B3F]"
                  >
                    <option value="">Select your height</option>
                    {HEIGHT_OPTIONS.map((h, i) => (
                      <option key={h.label} value={i}>
                        {h.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1B1B18]/60" />
                </div>
                <button
                  type="button"
                  onClick={handleSuggest}
                  disabled={heightIdx === ""}
                  className="bg-[#1B1B18] px-5 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-[#F6F2E9] transition-colors hover:bg-[#2E4B3F] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Suggest Length
                </button>
              </div>
              {suggestion && (
                <p className="mt-3 font-sans text-[12px] text-[#2E4B3F]">
                  Recommended length for you:{" "}
                  <strong>
                    {LENGTH_MAP[suggestion].label} ({LENGTH_MAP[suggestion].inch}″)
                  </strong>
                  {availableLengths.length > 1 && ". You can still choose a different length above."}
                </p>
              )}
            </div>

            {/* Quantity stepper */}
            {!isSelectedOutOfStock && selectedVariant && (
              <div className="mt-8">
                <p className="mb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18]/55">
                  Quantity
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#1B1B18]/20 w-fit">
                    <button
                      type="button"
                      onClick={decrementQty}
                      disabled={qty <= 1}
                      className="flex h-11 w-11 items-center justify-center text-[#1B1B18]/70 hover:text-[#1B1B18] disabled:opacity-30"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-10 text-center font-sans text-sm text-[#1B1B18]">{qty}</span>
                    <button
                      type="button"
                      onClick={incrementQty}
                      disabled={qty >= selectedVariant.stock}
                      className="flex h-11 w-11 items-center justify-center text-[#1B1B18]/70 hover:text-[#1B1B18] disabled:opacity-30"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.1em] text-[#1B1B18]/45">
                    {selectedVariant.stock} in stock
                  </span>
                </div>
              </div>
            )}

            {actionError && (
              <p className="mt-4 font-sans text-[11px] text-red-600">{actionError}</p>
            )}

            {/* Add to Cart + Buy Now */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:max-w-xl">
              <button
                onClick={handleAddToCart}
                disabled={actionsDisabled || isAdded}
                className={`flex flex-1 items-center justify-center gap-2 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                  isAdded
                    ? "bg-[#EBF3ED] text-[#1E4D2B]"
                    : actionsDisabled
                    ? "cursor-not-allowed bg-[#EDE6D8] text-[#1B1B18]/40"
                    : "border border-[#1B1B18] bg-transparent text-[#1B1B18] hover:bg-[#1B1B18] hover:text-[#F6F2E9]"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="h-4 w-4" /> Added To Bag
                  </>
                ) : isAdding ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isOutOfStock || isSelectedOutOfStock ? (
                  "Out of Stock"
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" /> Add To Cart
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={actionsDisabled}
                className={`flex flex-1 items-center justify-center gap-2 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                  actionsDisabled
                    ? "cursor-not-allowed bg-[#EDE6D8] text-[#1B1B18]/40"
                    : "bg-[#1B1B18] text-[#F6F2E9] hover:bg-[#2E4B3F]"
                }`}
              >
                {isBuyingNow ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isOutOfStock || isSelectedOutOfStock ? (
                  "Out of Stock"
                ) : (
                  <>
                    <Zap className="h-4 w-4" /> Buy Now
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Review form */}
        <div className="mx-auto mt-24 max-w-xl border-t border-[#1B1B18]/10 pt-14">
          <h2 className="font-serif text-xl font-light text-[#1B1B18]">Share Your Experience</h2>

          {reviewSubmitted ? (
            <p className="mt-6 font-sans text-sm text-[#2E4B3F]">
              Thank you — your review has been submitted.
            </p>
          ) : (
            <form onSubmit={handleSubmitReview} className="mt-6 flex flex-col gap-5">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} stars`}>
                    <Star
                      className={`h-5 w-5 ${n <= rating ? "fill-[#A6906F] text-[#A6906F]" : "text-[#1B1B18]/20"}`}
                    />
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="Your name"
                required
                className="h-11 border border-[#1B1B18]/15 bg-white px-3.5 font-sans text-sm text-[#1B1B18] outline-none focus:border-[#2E4B3F]"
              />
              <textarea
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
                placeholder="Tell us what you thought"
                rows={4}
                required
                className="border border-[#1B1B18]/15 bg-white px-3.5 py-3 font-sans text-sm text-[#1B1B18] outline-none focus:border-[#2E4B3F]"
              />
              <button
                type="submit"
                disabled={submittingReview}
                className="h-12 bg-[#1B1B18] font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F6F2E9] transition-colors disabled:opacity-60 hover:bg-[#2E4B3F]"
              >
                {submittingReview ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}