"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import Loader from "@/src/components/loader/Loader";
import { useLoader } from "@/src/hooks/useLoader";

interface PageRevealProps {
  children: ReactNode;
}

// Fired exactly once, right after this wrapper's transform/filter inline
// styles are cleared. ScrollTrigger-driven sections should listen for this
// to know the *real* moment the layout is stable — instead of guessing via
// window "load" or a timeout, which can fire too early while this wrapper's
// transform is still applied and throwing off getBoundingClientRect
// measurements for everything below it (this is why sections were staying
// invisible until something like a window resize forced GSAP to recompute).
export const PAGE_REVEALED_EVENT = "mehraj:page-revealed";

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
 * in the wrong place / gets clipped). It also skews `getBoundingClientRect()`
 * for every descendant below it, which throws off ScrollTrigger's
 * trigger-position math.
 *
 * Fix: always `clearProps` on the animated properties once the reveal is
 * done, so this wrapper goes back to having no filter/transform at all —
 * and broadcast PAGE_REVEALED_EVENT at that exact moment so anything
 * downstream (ScrollTrigger sections) can refresh itself correctly.
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
      window.dispatchEvent(new Event(PAGE_REVEALED_EVENT));
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      // Snap to final state, then immediately strip filter/transform so
      // this wrapper never becomes a fixed-position containing block or
      // skews descendant layout measurements.
      gsap.set(el, { opacity: 1, y: 0, filter: "blur(0px)" });
      gsap.set(el, { clearProps: "filter,transform" });
      setRevealed(true);
      window.dispatchEvent(new Event(PAGE_REVEALED_EVENT));
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
          // position against the viewport again, not against this div —
          // and so ScrollTrigger measurements below this wrapper are
          // accurate again.
          gsap.set(el, { clearProps: "filter,transform" });
          setRevealed(true);
          // Let every ScrollTrigger-based section know it's safe to
          // refresh its trigger positions now that layout is final.
          window.dispatchEvent(new Event(PAGE_REVEALED_EVENT));
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