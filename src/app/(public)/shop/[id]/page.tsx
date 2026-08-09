"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, Check, Loader2, Star, ChevronRight } from "lucide-react";
import { productService } from "@/src/services/product.service";
import { cartService } from "@/src/services/cart.service";
import { Product, ProductVariant } from "@/src/types/product";
import { IMAGE_BASE_URL } from "@/src/lib/api-client";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=900";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

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

  const resolveImageUrl = (url: string | undefined | null) => {
    if (!url) return FALLBACK_IMAGE;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${IMAGE_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const handleAddToCart = async () => {
    if (!selectedVariant || selectedVariant.stock <= 0 || isAdding) return;
    setIsAdding(true);
    try {
      await cartService.addItem(selectedVariant.id, 1);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2500);
    } catch {
      alert("Couldn't add this item to your bag — please try again.");
    } finally {
      setIsAdding(false);
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
            {product.category?.name && (
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#2E4B3F]">
                {product.category.name}
              </span>
            )}
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

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || !selectedVariant || isAdding || isAdded}
              className={`mt-9 flex w-full max-w-sm items-center justify-center gap-2 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 sm:w-auto sm:px-12 ${
                isAdded
                  ? "bg-[#EBF3ED] text-[#1E4D2B]"
                  : isOutOfStock
                  ? "cursor-not-allowed bg-[#EDE6D8] text-[#1B1B18]/40"
                  : "bg-[#1B1B18] text-[#F6F2E9] hover:bg-[#2E4B3F]"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="h-4 w-4" /> Added To Bag
                </>
              ) : isAdding ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isOutOfStock ? (
                "Out of Stock"
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" /> Add To Bag
                </>
              )}
            </button>
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