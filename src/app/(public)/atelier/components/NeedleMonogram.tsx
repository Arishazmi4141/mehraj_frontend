const GOLD = "#A9853F";
const GOLD_LIGHT = "#C6A15B";
const BG = "#FEFDFA";

export default function NeedleMonogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="atl-gold-grad" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor={GOLD} />
          <stop offset="100%" stopColor={GOLD_LIGHT} />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="38" stroke="url(#atl-gold-grad)" strokeWidth="1" />
      <circle cx="50" cy="50" r="31" stroke={GOLD_LIGHT} strokeWidth="0.6" strokeOpacity="0.6" />
      <path d="M32 62 L60 34" stroke={BG} strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M60 34 L65 29 C67 27 70 27 72 29 C74 31 74 34 72 36 L67 41"
        stroke={BG}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M32 62 C26 66 22 64 22 64" stroke="url(#atl-gold-grad)" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3 3" />
    </svg>
  );
}