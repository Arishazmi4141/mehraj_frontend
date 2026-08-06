"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PAGE_REVEALED_EVENT } from "@/src/components/common/PageRevealProvider";

type GsapCallback = (context: gsap.Context) => void;
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

    const refresh = () => {
      // Double rAF: one frame for layout to settle, one for paint to commit,
      // before asking ScrollTrigger to remeasure trigger positions.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    };

    window.addEventListener(PAGE_REVEALED_EVENT, refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener(PAGE_REVEALED_EVENT, refresh);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}