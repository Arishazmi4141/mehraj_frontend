"use client";

/**
 * RedesignTrack — second Atelier offering.
 * Distinct from:
 *  - Alterations (fit-only: hem, waist, sleeve)
 *  - Custom Recreation (a brand-new garment built from a reference)
 * This track is for a client's OWN existing product where the design
 * stays exactly as-is, but colour and/or size are reworked.
 */


const INK = "#3D1214";
const INK_MUTED = "#756961";
const BG = "#FEFDFA";
const GOLD = "#A9853F";
const GOLD_LIGHT = "#C6A15B";
const BORDER_STRONG = "#C6A15B";

const GOLD_GRADIENT = "linear-gradient(135deg, #A9853F 0%, #C6A15B 100%)";

const GRADIENT_TEXT: React.CSSProperties = {
  backgroundImage: GOLD_GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

const POINTS = [
  "Colour rework — dye, overdye, or panel re-colouring",
  "Resize up or down — without changing the silhouette",
  "Original design, print & construction stay untouched",
  "One-on-one review before any work begins",
];

export default function RedesignTrack() {
  return (
    <section className="relative py-24 md:py-32" style={{ background: BG }}>
      <div className="atl-track-redesign mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="order-2 flex items-center justify-center md:order-1">
            <RedesignIllustration className="h-auto w-full max-w-md" />
          </div>

          <div className="order-1 md:order-2">
            <span className="font-serif text-xs italic" style={{ color: BORDER_STRONG }}>
              02
            </span>
            <h2
              className="mt-2 font-serif text-3xl font-light leading-[1.15] md:text-[2.5rem]"
              style={{ color: INK }}
            >
              Redesign Your{" "}
              <span className="italic" style={GRADIENT_TEXT}>
                Own Piece
              </span>
            </h2>
            <p className="mt-5 max-w-md font-sans text-sm leading-[1.9]" style={{ color: INK_MUTED }}>
              Already own something you love, but it&apos;s the wrong colour
              or no longer the right fit? Bring it in as-is — we&apos;ll rework
              the colour and resize it exactly to you, while keeping the
              design you fell in love with completely intact.
            </p>

            <ul className="mt-7 flex flex-col gap-2.5">
              {POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 font-sans text-[13px]"
                  style={{ color: INK_MUTED }}
                >
                  <span
                    className="mt-1.75 h-0.75 w-0.75 shrink-0 rounded-full"
                    style={{ background: GOLD }}
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Illustration: same product silhouette, before/after colour + size ── */

function RedesignIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 280"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of the same garment shown before and after a colour and size rework, with the design kept identical"
    >
      <circle cx="140" cy="140" r="110" stroke={BORDER_STRONG} strokeWidth="1" strokeDasharray="2 6" />

      {/* Before — smaller, muted outline */}
      <g transform="translate(46,64) scale(0.82)">
        <path
          d="M60 10 L44 -2 L18 10 L10 34 L26 44 L32 32 L32 130 C32 138 38 144 46 144 L120 144 C128 144 134 138 134 130 L134 32 L140 44 L156 34 L148 10 L122 -2 L108 10 C108 10 98 18 76 18 C54 18 60 10 60 10 Z"
          stroke={INK_MUTED}
          strokeWidth="1.6"
          strokeOpacity="0.55"
          strokeLinejoin="round"
        />
        <text
          x="83"
          y="168"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontSize="9"
          fill={INK_MUTED}
          letterSpacing="1"
        >
          BEFORE
        </text>
      </g>

      {/* Arrow */}
      <path
        d="M132 132 C150 120 168 120 184 132"
        stroke={GOLD_LIGHT}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
      <path
        d="M178 126 L186 132 L179 139"
        stroke={GOLD_LIGHT}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* After — larger, gold-filled, same silhouette */}
      <g transform="translate(118,52) scale(1.05)">
        <path
          d="M60 10 L44 -2 L18 10 L10 34 L26 44 L32 32 L32 130 C32 138 38 144 46 144 L120 144 C128 144 134 138 134 130 L134 32 L140 44 L156 34 L148 10 L122 -2 L108 10 C108 10 98 18 76 18 C54 18 60 10 60 10 Z"
          fill="rgba(198,161,91,0.14)"
          stroke={GOLD}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M83 18 V144" stroke={GOLD} strokeWidth="1" strokeOpacity="0.35" />
        {[46, 68, 90, 112].map((y) => (
          <circle key={y} cx="83" cy={y} r="2" fill={GOLD} fillOpacity="0.6" />
        ))}
        <text
          x="83"
          y="168"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontSize="9"
          fill={GOLD}
          letterSpacing="1"
        >
          AFTER
        </text>
      </g>
    </svg>
  );
}