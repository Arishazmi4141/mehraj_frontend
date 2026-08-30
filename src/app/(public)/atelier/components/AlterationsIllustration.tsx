const INK = "#3D1214";
const GOLD = "#A9853F";
const BORDER_STRONG = "#C6A15B";

export default function AlterationsIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of a shirt with alteration points marked at collar, sleeve, waist, and hem">
      <circle cx="140" cy="140" r="110" stroke={BORDER_STRONG} strokeWidth="1" strokeDasharray="2 6" />
      <path
        d="M100 58 L84 44 L54 58 L44 92 L64 104 L72 90 L72 220 C72 230 80 238 90 238 L190 238 C200 238 208 230 208 220 L208 90 L216 104 L236 92 L226 58 L196 44 L180 58 C180 58 168 68 140 68 C112 68 100 58 100 58 Z"
        stroke={INK}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M140 68 V238" stroke={INK} strokeWidth="1" strokeOpacity="0.35" />
      {[92, 122, 152, 182, 212].map((y) => (
        <circle key={y} cx="140" cy={y} r="2" fill={INK} fillOpacity="0.4" />
      ))}

      <line x1="106" y1="52" x2="128" y2="52" stroke={INK} strokeWidth="1.4" strokeDasharray="4 4" />
      <circle cx="106" cy="52" r="2.8" fill={INK} />
      <circle cx="128" cy="52" r="2.8" fill={INK} />
      <text x="117" y="40" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fill={INK} letterSpacing="0.5">
        COLLAR
      </text>

      <line x1="48" y1="96" x2="66" y2="92" stroke={GOLD} strokeWidth="1.4" strokeDasharray="4 4" />
      <circle cx="48" cy="96" r="2.8" fill={GOLD} />
      <circle cx="66" cy="92" r="2.8" fill={GOLD} />
      <text x="34" y="114" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fill={GOLD} letterSpacing="0.5">
        SLEEVE
      </text>

      <line x1="80" y1="164" x2="200" y2="164" stroke={INK} strokeWidth="1.4" strokeDasharray="4 4" />
      <circle cx="80" cy="164" r="2.8" fill={INK} />
      <circle cx="200" cy="164" r="2.8" fill={INK} />
      <text x="140" y="180" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fill={INK} letterSpacing="0.5">
        WAIST
      </text>

      <line x1="76" y1="230" x2="204" y2="230" stroke={GOLD} strokeWidth="1.4" strokeDasharray="4 4" />
      <circle cx="76" cy="230" r="2.8" fill={GOLD} />
      <circle cx="204" cy="230" r="2.8" fill={GOLD} />
      <text x="140" y="248" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fill={GOLD} letterSpacing="0.5">
        HEM
      </text>
    </svg>
  );
}