// (public)/journal/components/JournalMagazineToggle.tsx
"use client";

export type ContentTab = "journal" | "magazine";

function BookIcon({ active }: { active: boolean }) {
  const stroke = active ? "#F6F2E9" : "#5C2A32";
  return (
    <svg viewBox="0 0 32 24" className="h-4 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 5 C13 2 8 1.5 3 3 L3 19 C8 17.5 13 18 16 20" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 5 C19 2 24 1.5 29 3 L29 19 C24 17.5 19 18 16 20" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MagazineIcon({ active }: { active: boolean }) {
  const stroke = active ? "#F6F2E9" : "#5C2A32";
  return (
    <svg viewBox="0 0 26 26" className="h-[18px] w-[18px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="2.5" width="18" height="21" rx="1" stroke={stroke} strokeWidth="1.4" />
      <path d="M8 8 H18" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.8" />
      <path d="M8 12.5 H18" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.8" />
      <path d="M8 17 H14" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.8" />
      <path d="M18 2.5 L22 6.5 L18 6.5 Z" fill={stroke} fillOpacity="0.15" stroke={stroke} strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

export default function JournalMagazineToggle({
  active,
  onChange,
}: {
  active: ContentTab;
  onChange: (tab: ContentTab) => void;
}) {
  return (
    <div
      className="relative flex w-[300px] items-center rounded-full border p-1"
      style={{ borderColor: "rgba(27,27,24,0.12)", background: "#FFFFFF" }}
      role="tablist"
      aria-label="Journal or Magazine"
    >
      <span
        className="absolute top-1 bottom-1 rounded-full bg-[#1B1B18] transition-all duration-400 ease-out"
        style={{ left: active === "journal" ? "4px" : "50%", width: "calc(50% - 4px)" }}
        aria-hidden="true"
      />
      <button
        type="button"
        role="tab"
        aria-selected={active === "journal"}
        onClick={() => onChange("journal")}
        className="relative z-10 flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300"
        style={{ color: active === "journal" ? "#F6F2E9" : "#1B1B18" }}
      >
        <BookIcon active={active === "journal"} />
        Journal
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={active === "magazine"}
        onClick={() => onChange("magazine")}
        className="relative z-10 flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300"
        style={{ color: active === "magazine" ? "#F6F2E9" : "#1B1B18" }}
      >
        <MagazineIcon active={active === "magazine"} />
        Magazine
      </button>
    </div>
  );
}