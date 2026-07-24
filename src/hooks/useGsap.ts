"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";

type GsapCallback = (context: gsap.Context) => void;

/**
 * useGsap
 * Custom hook wrapping GSAP's context API for automatic component-level
 * cleanup on unmount, preventing animation leaks across Next.js route transitions.
 */
export function useGsap<T extends HTMLElement = HTMLDivElement>(
  callback: GsapCallback,
  deps: unknown[] = []
): RefObject<T | null> {
  const scopeRef = useRef<T>(null);

  useEffect(() => {
    if (!scopeRef.current) return;

    // Isolate all contextual animations under the targeted DOM reference scope
    const ctx = gsap.context(() => {}, scopeRef.current);
    ctx.add(() => callback(ctx));

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}