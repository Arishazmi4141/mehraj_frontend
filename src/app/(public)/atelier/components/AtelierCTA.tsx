import Link from "next/link";
import { MessageCircle } from "lucide-react";

const INK = "#3D1214";
const BG = "#FEFDFA";
const BORDER_STRONG = "#C6A15B";
const GOLD = "#A9853F";
const INK_GRADIENT = "linear-gradient(135deg, #1E0808 0%, #0D0301 100%)";
const GOLD_GRADIENT = "linear-gradient(135deg, #A9853F 0%, #C6A15B 100%)";

const GRADIENT_TEXT: React.CSSProperties = {
  backgroundImage: GOLD_GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

export default function AtelierCTA() {
  return (
    <section className="relative py-24 text-center md:py-28" style={{ background: BG }}>
      <div className="atl-cta mx-auto max-w-xl px-6">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: GOLD }}>
          No Charge, No Obligation
        </p>
        <h2 className="mt-4 font-serif text-2xl font-light leading-[1.2] md:text-3xl" style={{ color: INK }}>
          Bring It In, Or{" "}
          <span className="italic" style={GRADIENT_TEXT}>
            Bring It To Life
          </span>
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300"
            style={{ background: INK_GRADIENT, color: BG }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = GOLD_GRADIENT;
              e.currentTarget.style.color = INK;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = INK_GRADIENT;
              e.currentTarget.style.color = BG;
            }}
          >
            Request a Consultation
          </Link>
          <Link
            href="https://wa.me/910000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300"
            style={{ borderColor: BORDER_STRONG, color: INK }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = GOLD;
              e.currentTarget.style.color = GOLD;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = BORDER_STRONG;
              e.currentTarget.style.color = INK;
            }}
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
            Message Us Directly
          </Link>
        </div>
      </div>
    </section>
  );
}