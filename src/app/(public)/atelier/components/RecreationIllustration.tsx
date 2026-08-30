const GOLD = "#A9853F";
const GOLD_LIGHT = "#C6A15B";
const BG = "#FEFDFA";
const ON_DARK_FAINT = "rgba(254,253,250,0.16)";

export default function RecreationIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of a reference photograph transforming into a finished, hand-tailored garment">
      <circle cx="140" cy="140" r="110" stroke={ON_DARK_FAINT} strokeWidth="1" strokeDasharray="2 6" />

      <g transform="translate(38,86) rotate(-6)">
        <rect x="0" y="0" width="86" height="106" rx="2" stroke={GOLD} strokeWidth="1.6" />
        <path d="M10 78 L32 52 L48 68 L62 44 L76 78 Z" stroke={GOLD} strokeWidth="1.2" strokeLinejoin="round" strokeOpacity="0.8" />
        <circle cx="62" cy="24" r="8" stroke={GOLD} strokeWidth="1.2" strokeOpacity="0.8" />
      </g>

      <path d="M140 130 C160 118 178 118 196 130" stroke={GOLD_LIGHT} strokeWidth="1.4" strokeLinecap="round" strokeDasharray="4 4" />
      <path d="M190 124 L198 130 L191 137" stroke={GOLD_LIGHT} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

      <g transform="translate(158,58)">
        <path d="M42 0 L42 10" stroke={BG} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="42" cy="-4" r="4" stroke={BG} strokeWidth="1.4" />
        <path d="M6 34 L42 10 L78 34" stroke={BG} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M14 34 L2 46 L14 56 L22 48 L22 132 C22 138 27 143 33 143 L51 143 C57 143 62 138 62 132 L62 48 L70 56 L82 46 L70 34 Z"
          stroke={BG}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M42 10 V143" stroke={BG} strokeWidth="1" strokeOpacity="0.3" />
        {[36, 58, 80, 102, 124].map((y) => (
          <circle key={y} cx="42" cy={y} r="1.6" fill={BG} fillOpacity="0.5" />
        ))}
        <circle cx="14" cy="56" r="2.4" fill={GOLD_LIGHT} />
        <circle cx="70" cy="56" r="2.4" fill={GOLD_LIGHT} />
      </g>
    </svg>
  );
}