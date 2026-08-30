import NeedleMonogram from "./NeedleMonogram";

const BG = "#FEFDFA";
const GOLD_LIGHT = "#C6A15B";
const INK_GRADIENT = "linear-gradient(135deg, #1E0808 0%, #0D0301 100%)";
const GOLD_GRADIENT = "linear-gradient(135deg, #A9853F 0%, #C6A15B 100%)";
const ON_DARK = "rgba(254,253,250,0.62)";

const GRADIENT_TEXT: React.CSSProperties = {
  backgroundImage: GOLD_GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

export default function AtelierHero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32" style={{ background: INK_GRADIENT }}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, ${BG} 1px, transparent 1px)`,
          backgroundSize: "90px 100%",
        }}
        aria-hidden="true"
      />
      <div className="atl-hero relative z-10 mx-auto max-w-3xl px-6 text-center">
        <NeedleMonogram className="mx-auto mb-8 h-16 w-16 md:h-20 md:w-20" />
        <div className="mb-5 flex items-center justify-center gap-3">
          <span className="h-px w-8" style={{ background: GOLD_GRADIENT }} />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em]" style={{ color: GOLD_LIGHT }}>
            The Atelier
          </span>
          <span className="h-px w-8" style={{ background: GOLD_GRADIENT }} />
        </div>
        <h1 className="font-serif text-4xl font-light leading-[1.12] md:text-6xl" style={{ color: BG }}>
          Made For You,{" "}
          <span className="italic" style={GRADIENT_TEXT}>
            Three Ways
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-sans text-sm leading-[1.9] md:text-base" style={{ color: ON_DARK }}>
          The Atelier is where existing pieces get refit or reworked, and
          imagined ones get built. Whether you&apos;re bringing in a garment
          that needs work, one that just needs a new colour or size, or a
          look you&apos;ve always wanted made real — it starts with the same
          conversation with our master tailor — no charge, no obligation.
        </p>
      </div>
    </section>
  );
}