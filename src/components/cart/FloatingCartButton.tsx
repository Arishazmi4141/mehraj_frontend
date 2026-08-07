"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/src/context/CartContext";

export default function FloatingCartButton() {
  const { totalCount } = useCart();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const prevCount = useRef(totalCount);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && totalCount > 0 && buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [mounted, totalCount > 0]);

  useEffect(() => {
    if (mounted && badgeRef.current && totalCount !== prevCount.current) {
      gsap.fromTo(badgeRef.current, { scale: 1.5 }, { scale: 1, duration: 0.4, ease: "back.out(3)" });
      prevCount.current = totalCount;
    }
  }, [mounted, totalCount]);

  if (!mounted || totalCount === 0) return null;

  return createPortal(
    <Link
      ref={buttonRef}
      href="/cart"
      aria-label={`View cart, ${totalCount} items`}
      className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2.5 rounded-full bg-[#1B1B18] px-5 py-3.5 shadow-[0_15px_40px_rgba(27,27,24,0.3)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#2E4B3F]"
    >
      <span className="relative flex items-center justify-center">
        <ShoppingBag className="h-5 w-5 text-[#F6F2E9]" />
        <span
          ref={badgeRef}
          className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#A6906F] font-sans text-[9px] font-bold text-[#1B1B18]"
        >
          {totalCount}
        </span>
      </span>
      <span className="font-sans text-[10px] font-semibold uppercase tracking-widest text-[#F6F2E9]">
        View Cart
      </span>
    </Link>,
    document.body
  );
}