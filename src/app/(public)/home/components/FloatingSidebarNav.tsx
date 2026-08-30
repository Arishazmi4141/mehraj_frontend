"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Kept in the exact order they're rendered in page.tsx, and only the ids
// that actually exist on the page — Hero is intentionally excluded since
// the sidebar only appears after scrolling past it.
const SECTIONS = [
  { id: "the-house", label: "The House" },
  { id: "collections", label: "Collections" },
  { id: "shop-the-edit", label: "Shop The Edit" },
  { id: "the-atelier", label: "The Atelier" },
  { id: "the-salon", label: "The Salon" },
  { id: "the-craft", label: "The Craft" },
  { id: "the-blogs", label: "The Blogs" },
  { id: "client-services", label: "Client Services" },
];

export default function FloatingSidebarNav() {
  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [activeId, setActiveId] = useState<string>("the-house");
  const [sections, setSections] = useState(SECTIONS);
  const [indicator, setIndicator] = useState<{ top: number; height: number }>({
    top: 0,
    height: 0,
  });

  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

  // Self-heal against drift from page.tsx: only show nav items whose section
  // actually exists in the DOM, so a removed/renamed section never leaves a dead link.
  useEffect(() => {
    const present = SECTIONS.filter((s) => document.getElementById(s.id));
    setSections(present);
    if (present.length > 0 && !present.some((s) => s.id === activeId)) {
      setActiveId(present[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show sidebar only once the visitor has scrolled past the Hero
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

  // Reset to expanded each time the nav leaves view
  useEffect(() => {
    if (!visible) setCollapsed(false);
  }, [visible]);

  // Track active section on scroll
  useEffect(() => {
    if (sections.length === 0) return;

    let rafId = 0;

    const updateActive = () => {
      rafId = 0;
      const referenceY = window.innerHeight * 0.3;

      let current = sections[0].id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= referenceY) {
          current = s.id;
        } else {
          break;
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [sections]);

  // Measure active indicator position
  const measureIndicator = () => {
    const el = itemRefs.current[activeId];
    if (el) {
      setIndicator({ top: el.offsetTop, height: el.offsetHeight });
    }
  };

  useLayoutEffect(() => {
    measureIndicator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, collapsed]);

  useEffect(() => {
    window.addEventListener("resize", measureIndicator);
    return () => window.removeEventListener("resize", measureIndicator);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Section navigation"
      className={`fixed top-1/2 z-[80] hidden -translate-y-1/2 transition-all duration-500 ease-out lg:block ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      } ${collapsed ? "left-0" : "left-8"}`}
    >
      <div className="relative">
        <ul
          ref={listRef}
          className={`relative flex flex-col gap-1 rounded-2xl border py-3 pl-5 pr-3 shadow-[0_15px_45px_rgba(33,29,24,0.08)] backdrop-blur-md transition-all duration-500 ease-out ${
            collapsed
              ? "pointer-events-none -translate-x-[120%] opacity-0"
              : "translate-x-0 opacity-100"
          }`}
          style={{
            background: "rgba(254,253,250,0.9)",
            borderColor: "var(--color-border)",
          }}
        >
          {/* static track line */}
          <span
            className="absolute left-1.5 top-3 bottom-3 w-px"
            style={{ background: "var(--color-border)" }}
            aria-hidden="true"
          />
          {/* moving active indicator */}
          <span
            className="absolute left-1.5 w-[2px] rounded-full transition-[top,height] duration-400 ease-out"
            style={{
              top: indicator.top,
              height: indicator.height,
              background: "var(--color-green)",
            }}
            aria-hidden="true"
          />

          {sections.map((s) => {
            const isActive = activeId === s.id;
            return (
              <li
                key={s.id}
                ref={(el) => {
                  itemRefs.current[s.id] = el;
                }}
              >
                <a
                  href={`#${s.id}`}
                  onClick={handleClick(s.id)}
                  className="block whitespace-nowrap rounded-xl px-4 py-2.5 font-sans text-[10px] font-medium uppercase tracking-[0.15em] transition-colors duration-300"
                  style={{
                    color: isActive ? "var(--color-ink)" : "var(--color-ink-faint)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--color-ink)";
                      e.currentTarget.style.background = "var(--color-surface-alt)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--color-ink-faint)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Collapse / expand handle — docks to screen left edge when collapsed */}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Show section navigation" : "Hide section navigation"}
          aria-expanded={!collapsed}
          className={`absolute top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center border shadow-[0_4px_14px_rgba(33,29,24,0.12)] transition-all duration-500 ease-out hover:scale-105 ${
            collapsed
              ? "left-0 rounded-r-xl rounded-l-none border-l-0"
              : "-right-3.5 rounded-full"
          }`}
          style={{
            background: "var(--color-surface)",
            borderColor: "var(--color-border)",
            color: "var(--color-ink-muted)",
          }}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 10 10"
            fill="none"
            className={`transition-transform duration-500 ease-out ${collapsed ? "rotate-180" : ""}`}
          >
            <path
              d="M6.5 1.5L2.5 5L6.5 8.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}