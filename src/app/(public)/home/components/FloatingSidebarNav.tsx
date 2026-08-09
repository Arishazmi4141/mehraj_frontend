"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "the-house", label: "The House" },
  { id: "collections", label: "Collections" },
  { id: "the-atelier", label: "The Atelier" },
  { id: "the-salon", label: "The Salon" },
  { id: "the-craft", label: "The Craft" },
  { id: "the-journal", label: "The Journal" },
  { id: "client-services", label: "Client Services" },
];

export default function FloatingSidebarNav() {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string>("the-house");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Show sidebar only once the visitor has scrolled past the Hero —
  // the Hero should stay fully immersive with nothing competing for attention.
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setVisible(true);
      return;
    }

    const heroObserver = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-10% 0px 0px 0px" }
    );
    heroObserver.observe(hero);
    return () => heroObserver.disconnect();
  }, []);

  // Track which section is currently in view to highlight the active item
  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visibleEntry) setActiveId(visibleEntry.target.id);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-15% 0px -50% 0px" }
    );

    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Section navigation"
      className={`fixed left-8 top-1/2 z-[80] hidden -translate-y-1/2 transition-opacity duration-[1200ms] ease-out lg:block ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ul
        className="flex flex-col gap-1 rounded-2xl border border-[#A6906F]/25 px-2 py-3 shadow-[0_15px_45px_rgba(27,27,24,0.08)] backdrop-blur-md"
        style={{ background: "rgba(246,242,233,0.88)" }}
      >
        {SECTIONS.map((s) => {
          const isActive = activeId === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={handleClick(s.id)}
                className={`group flex items-center gap-2.5 rounded-xl px-4 py-2.5 font-sans text-[10px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${
                  isActive ? "text-[#1B1B18]" : "text-[#A6906F] hover:bg-[#EDE6D8] hover:text-[#1B1B18]"
                }`}
              >
                <span
                  className={`h-1 w-1 shrink-0 rounded-full transition-all duration-300 ${
                    isActive ? "scale-100 bg-[#A6906F]" : "scale-0 bg-[#A6906F]"
                  }`}
                />
                <span className="whitespace-nowrap">{s.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}