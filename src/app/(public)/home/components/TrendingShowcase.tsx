"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { productService } from "@/src/services/product.service";
import { IMAGE_BASE_URL } from "@/src/lib/api-client";
import { Product } from "@/src/types/product";

function resolveImageUrl(url: string | undefined | null) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${IMAGE_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

function lowestPrice(product: Product) {
  if (!product.variants || product.variants.length === 0) return null;
  return Math.min(...product.variants.map((v) => v.price));
}

const VISIBLE_COUNT = 3;
const ROTATE_MS = 3800;

// staggered vertical offsets so the row doesn't feel like a flat grid
const CARD_OFFSET = ["mt-8", "mt-0", "mt-14"];

export default function TrendingShowcase() {
  const [pool, setPool] = useState<Product[]>([]);
  const [slots, setSlots] = useState<Product[]>([]); // the 3 currently visible
  const [nextPoolIdx, setNextPoolIdx] = useState(VISIBLE_COUNT); // pointer into pool for the next swap-in
  const [loading, setLoading] = useState(true);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Fetch trending, fallback to latest
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        let list = await productService.getTrendingProducts();
        if (!list || list.length === 0) {
          list = await productService.getRecentProducts();
        }
        const withImages = (list || []).filter((p) => p.productImages?.length);
        if (!cancelled) {
          setPool(withImages);
          setSlots(withImages.slice(0, VISIBLE_COUNT));
        }
      } catch {
        if (!cancelled) setPool([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Entry stagger once slots first populate
  useEffect(() => {
    if (slots.length === 0) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.fromTo(
      cardRefs.current.filter(Boolean),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: prefersReduced ? 0 : 0.8, stagger: prefersReduced ? 0 : 0.12, ease: "power3.out" }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots.length > 0]);

  // Round-robin: swap one slot at a time with the next pool item
  useEffect(() => {
    if (pool.length <= VISIBLE_COUNT) return; // nothing extra to rotate in
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let slotToSwap = 0;
    const id = setInterval(() => {
      const incoming = pool[nextPoolIdx % pool.length];
      const target = cardRefs.current[slotToSwap];

      const tl = gsap.timeline();
      if (target) {
        tl.to(target, { opacity: 0, y: -10, duration: 0.4, ease: "power2.in" });
      }
      tl.call(() => {
        setSlots((prev) => {
          const copy = [...prev];
          copy[slotToSwap] = incoming;
          return copy;
        });
      });
      if (target) {
        tl.fromTo(target, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
      }

      slotToSwap = (slotToSwap + 1) % VISIBLE_COUNT;
      setNextPoolIdx((i) => i + 1);
    }, ROTATE_MS);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool.length]);

  if (!loading && slots.length === 0) {
    return (
      <div className="relative mx-auto h-[320px] w-full max-w-md sm:h-[380px] lg:mx-0 lg:h-[460px] lg:max-w-none">
        <div
          className="absolute inset-0 rounded-sm border"
          style={{
            borderColor: "rgba(117,105,97,0.3)",
            background: "linear-gradient(160deg, rgba(61,18,20,0.5), #0A0200)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
      <div className="grid grid-cols-3 gap-4 sm:gap-5">
        {(loading ? Array.from({ length: VISIBLE_COUNT }) : slots).map((product, i) => {
          const p = product as Product | undefined;
          const price = p ? lowestPrice(p) : null;

          return (
            <div key={p?.id ?? `skeleton-${i}`} className={CARD_OFFSET[i] || ""}>
              <div
                ref={(el) => { cardRefs.current[i] = el; }}
                className="group relative aspect-[3/4] overflow-hidden rounded-sm shadow-2xl"
                style={{ background: "linear-gradient(160deg, rgba(117,105,97,0.25), #0A0200)" }}
              >
                {p ? (
                  <Link href={`/shop/${p.id}`} className="block h-full w-full">
                    <img
                      key={p.id}
                      src={resolveImageUrl(p.productImages[0]?.imageUrl)}
                      alt={p.name}
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* bottom gradient + tag */}
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
                      style={{ background: "linear-gradient(to top, rgba(10,2,0,0.92), rgba(10,2,0,0))" }}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <p
                        className="truncate font-serif text-[12px] italic leading-tight sm:text-[13px]"
                        style={{ color: "#EDE7DF" }}
                      >
                        {p.name}
                      </p>
                      {price != null && (
                        <span
                          className="mt-1 block font-sans text-[11px] font-semibold sm:text-[12px]"
                          style={{ color: "#C99A6A" }}
                        >
                          ₹{price.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </Link>
                ) : (
                  <div className="h-full w-full animate-pulse" style={{ background: "rgba(117,105,97,0.15)" }} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}