export default function IdeaToGarmentIllustration({ className }: { className?: string }) {
  const GOLD = "#A9853F";
  const GOLD_LIGHT = "#C6A15B";
  const BG = "#FEFDFA";
  const ON_DARK_FAINT = "rgba(254,253,250,0.16)";

  return (
    <svg
      viewBox="0 0 280 280"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of an idea sketch transforming into a finished, hand-made garment"
    >
      <circle cx="140" cy="140" r="110" stroke={ON_DARK_FAINT} strokeWidth="1" strokeDasharray="2 6" />
      <circle cx="140" cy="140" r="90" stroke={GOLD_LIGHT} strokeWidth="0.6" strokeOpacity="0.35" />

      {/* Idea bubble / sketch card */}
      <g transform="translate(36,74) rotate(-5)">
        <rect x="0" y="0" width="84" height="104" rx="2" stroke={GOLD} strokeWidth="1.6" />
        {/* squiggly sketch lines */}
        <path
          d="M14 30 C24 20, 34 40, 44 28 C54 18, 62 34, 70 26"
          stroke={GOLD}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.75"
        />
        <path
          d="M14 50 L70 50"
          stroke={GOLD}
          strokeWidth="1"
          strokeDasharray="3 3"
          strokeOpacity="0.5"
        />
        <path
          d="M14 66 L58 66"
          stroke={GOLD}
          strokeWidth="1"
          strokeDasharray="3 3"
          strokeOpacity="0.5"
        />
        <circle cx="60" cy="86" r="9" stroke={GOLD_LIGHT} strokeWidth="1.2" strokeOpacity="0.8" />
        {/* small pencil */}
        <path d="M14 14 L24 4" stroke={GOLD_LIGHT} strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* Arrow */}
      <path
        d="M132 132 C152 118 170 118 188 132"
        stroke={GOLD_LIGHT}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
      <path
        d="M182 126 L190 132 L183 139"
        stroke={GOLD_LIGHT}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Finished garment on hanger */}
      <g transform="translate(154,54)">
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

        {/* small sparkle marks near finished garment = "made real" */}
        <path d="M-14 10 L-10 10 M-12 8 L-12 12" stroke={GOLD_LIGHT} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M92 96 L97 96 M94.5 93.5 L94.5 98.5" stroke={GOLD_LIGHT} strokeWidth="1.2" strokeLinecap="round" />
      </g>
    </svg>
  );
}