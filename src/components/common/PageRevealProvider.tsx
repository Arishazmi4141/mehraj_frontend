"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import Loader from "@/src/components/loader/Loader";
import { useLoader } from "@/src/hooks/useLoader";

interface PageRevealProps {
  children: ReactNode;
}

/**
 * PageRevealProvider
 *
 * • Shows the premium Loader on first session visit only (sessionStorage gate).
 * • Content mounts immediately beneath the loader — zero layout shift.
 * • Once the loader's exit wipe completes, the page content reveals with an
 *   upward drift + filter:blur clear for a cinematic handoff.
 *
 * IMPORTANT:
 * GSAP leaves `filter` and `transform` as inline styles on the animated
 * element even after the tween finishes. If this wrapper is an ancestor of
 * any `position: fixed` element (e.g. Navbar's fullscreen menu curtain),
 * a lingering `filter`/`transform` turns this div into the *containing
 * block* for those fixed children — breaking `fixed inset-0` positioning
 * silently (no console error, DOM still shows opacity:1, but it renders
 * in the wrong place / gets clipped).
 *
 * Fix: always `clearProps` on the animated properties once the reveal is
 * done, so this wrapper goes back to having no filter/transform at all.
 */
export default function PageRevealProvider({ children }: PageRevealProps) {
  const { shouldShow, isComplete, handleComplete } = useLoader();
  const contentRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  // When loader says it's done → animate the page content in
  useEffect(() => {
    if (!isComplete || revealed) return;

    const el = contentRef.current;
    if (!el) {
      setRevealed(true);
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      // Snap to final state, then immediately strip filter/transform so
      // this wrapper never becomes a fixed-position containing block.
      gsap.set(el, { opacity: 1, y: 0, filter: "blur(0px)" });
      gsap.set(el, { clearProps: "filter,transform" });
      setRevealed(true);
      return;
    }

    // Staggered reveal: blur clears first, then content drifts up
    gsap.fromTo(
      el,
      { opacity: 0, y: 28, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "expo.out",
        onComplete: () => {
          // Critical: remove filter/transform inline styles so descendant
          // `position: fixed` elements (Navbar curtain, modals, drawers)
          // position against the viewport again, not against this div.
          gsap.set(el, { clearProps: "filter,transform" });
          setRevealed(true);
        },
      }
    );
  }, [isComplete, revealed]);

  return (
    <>
      {shouldShow && <Loader onFinish={handleComplete} />}

      <div
        ref={contentRef}
        aria-hidden={!isComplete}
        style={{
          // Hidden until reveal starts; pointer-events blocked while loader shows
          opacity:       isComplete ? undefined : 0,
          pointerEvents: isComplete ? undefined : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}