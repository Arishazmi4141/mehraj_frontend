import gsap from "gsap";

export interface LoaderRefs {
  veil:         HTMLDivElement | null;
  orb:          HTMLDivElement | null;
  maskReveal:   HTMLDivElement | null;   // clip wrapper around "PAS"
  logoText:     HTMLSpanElement | null;
  shine:        HTMLDivElement | null;   // metallic sweep overlay
  taglineWords: HTMLSpanElement[];       // each word of the tagline
  arcCircle:    SVGCircleElement | null; // the SVG progress arc
  arcTrack:     SVGCircleElement | null;
  counterEl:    HTMLSpanElement | null;
  counterProxy: { value: number };
  onCounterUpdate: (v: number) => void;
}

export interface LoaderTimelineOptions {
  onComplete: () => void;
}

const ARC_CIRCUMFERENCE = 2 * Math.PI * 38; // radius = 38

export function buildLoaderTimeline(
  refs: LoaderRefs,
  { onComplete }: LoaderTimelineOptions
): gsap.core.Timeline {
  const prefersReduced = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  const tl = gsap.timeline({ onComplete });

  // ── 0. Initial state ────────────────────────────────────────────────────────
  gsap.set(refs.veil,        { opacity: 1 });
  gsap.set(refs.orb,         { opacity: 0, scale: 0.6 });
  gsap.set(refs.maskReveal,  { clipPath: "inset(0 100% 0 0)" });
  gsap.set(refs.logoText,    { opacity: 1 });
  gsap.set(refs.shine,       { x: "-110%", opacity: 1 });
  gsap.set(refs.taglineWords, { opacity: 0, y: 10 });
  gsap.set(refs.counterEl,   { opacity: 0 });
  if (refs.arcCircle) {
    gsap.set(refs.arcCircle, {
      strokeDasharray:  ARC_CIRCUMFERENCE,
      strokeDashoffset: ARC_CIRCUMFERENCE,
    });
  }
  if (refs.arcTrack) {
    gsap.set(refs.arcTrack, {
      strokeDasharray:  ARC_CIRCUMFERENCE,
      strokeDashoffset: 0,
      opacity: 0.08,
    });
  }

  if (prefersReduced) {
    // Skip directly to content
    gsap.set([refs.orb, refs.maskReveal, refs.counterEl, ...refs.taglineWords], {
      opacity: 1, clipPath: "inset(0 0% 0 0)", y: 0,
    });
    tl.to({}, { duration: 1.5 })
      .to(refs.veil, { opacity: 0, duration: 0.4 });
    return tl;
  }

  // ── 1. Ambient orb blooms (0s → 0.7s) ──────────────────────────────────────
  tl.to(refs.orb, {
    opacity: 1,
    scale: 1,
    duration: 0.9,
    ease: "power2.out",
  });

  // ── 2. "PAS" mask reveal — right curtain wipes left (0.5s → 1.15s) ─────────
  tl.to(refs.maskReveal, {
    clipPath: "inset(0 0% 0 0)",
    duration: 0.75,
    ease: "expo.out",
  }, "-=0.35");

  // ── 3. Metallic shine sweep across logo (1.1s → 1.5s) ──────────────────────
  tl.to(refs.shine, {
    x: "110%",
    duration: 0.55,
    ease: "power2.inOut",
  }, "-=0.1");

  // ── 4. Tagline words stagger in (1.4s → 1.9s) ──────────────────────────────
  tl.to(refs.taglineWords, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.09,
  }, "-=0.2");

  // ── 5. Counter fades in, arc track appears (1.6s) ───────────────────────────
  tl.to(refs.counterEl, { opacity: 1, duration: 0.35, ease: "power1.out" }, "-=0.2");
  tl.to(refs.arcTrack, { opacity: 0.08, duration: 0.35 }, "<");

  // ── 6. Arc + counter climb 0 → 100 (1.7s → 3.5s, ~1.8s duration) ──────────
  const climbDuration = 1.8;

  tl.to(refs.counterProxy, {
    value: 100,
    duration: climbDuration,
    ease: "power1.inOut",
    onUpdate: () => refs.onCounterUpdate(Math.round(refs.counterProxy.value)),
  }, "-=0.1");

  if (refs.arcCircle) {
    tl.to(refs.arcCircle, {
      strokeDashoffset: 0,
      duration: climbDuration,
      ease: "power1.inOut",
    }, "<");
  }

  // ── 7. Brief hold at 100 (3.5s → 3.8s) ─────────────────────────────────────
  tl.to({}, { duration: 0.3 });

  // ── 8. Logo scales subtly, second shine sweep (3.8s → 4.1s) ────────────────
  tl.set(refs.shine, { x: "-110%" });
  tl.to(refs.logoText, { scale: 1.04, duration: 0.3, ease: "power1.out" });
  tl.to(refs.shine,    { x: "110%", duration: 0.4, ease: "power2.inOut" }, "<");

  // ── 9. Everything fades + veil wipes upward ─────────────────────────────────
  tl.to(
    [refs.orb, refs.maskReveal, refs.counterEl, ...refs.taglineWords, refs.arcTrack, refs.arcCircle].filter(Boolean),
    { opacity: 0, duration: 0.4, ease: "power1.in" },
    "+=0.1"
  );

  tl.to(refs.veil, {
    yPercent: -100,
    duration: 0.85,
    ease: "expo.inOut",
  }, "-=0.15");

  return tl;
}