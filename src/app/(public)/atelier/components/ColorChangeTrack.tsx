"use client";

/**
 * ColorChangeTrack — companion section to RedesignTrack.
 * Makes explicit that a client can choose ANY ONE of these independently:
 *  - Colour change only (size stays same)
 *  - Size change only (colour stays same)
 *  - Both together
 * Design/print/construction always stays untouched in every option.
 */

const INK = "#3D1214";
const INK_MUTED = "#756961";
const BG = "#FEFDFA";
const SURFACE = "#FAF6EE";
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

const OPTIONS = [
  {
    tag: "Colour Only",
    title: "Just The Colour",
    body: "Love the fit and design exactly as it is? We'll rework only the colour — dye, overdye, or panel re-colouring — and leave the size untouched.",
    swatches: ["#3D1214", "#A9853F", "#756961", "#1B1B18"],
  },
  {
    tag: "Size Only",
    title: "Just The Size",
    body: "Colour is perfect, fit isn't. We'll resize the piece up or down to match you exactly, keeping the same colour and design intact.",
    swatches: null,
  },
  {
    tag: "Both Together",
    title: "Colour & Size",
    body: "Want a fresh colour and a better fit at the same time? Both changes are made together in a single visit, with the original design kept as-is.",
    swatches: ["#3D1214", "#A9853F"],
  },
];

export default function ColorChangeTrack() {
  return (
    <section className="relative py-24 md:py-32" style={{ background: SURFACE }}>
      <div className="atl-track-color mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-14 text-center md:mb-16">
          <span className="font-serif text-xs italic" style={{ color: BORDER_STRONG }}>
            02.1
          </span>
          <h2
            className="mt-2 font-serif text-3xl font-light leading-[1.15] md:text-[2.5rem]"
            style={{ color: INK }}
          >
            Colour Doesn&apos;t Have To{" "}
            <span className="italic" style={GRADIENT_TEXT}>
              Come With Size
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-sans text-sm leading-[1.9]" style={{ color: INK_MUTED }}>
            You don&apos;t need to change both. Pick exactly what your piece
            needs — the design always stays the way you first fell for it.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {OPTIONS.map((opt) => (
            <div
              key={opt.tag}
              className="flex flex-col border p-7"
              style={{ borderColor: "rgba(61,18,20,0.1)", background: BG }}
            >
              <span
                className="mb-4 inline-block w-fit font-sans text-[10px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: GOLD }}
              >
                {opt.tag}
              </span>

              <h3 className="font-serif text-lg italic" style={{ color: INK }}>
                {opt.title}
              </h3>

              <p className="mt-3 font-sans text-[12.5px] leading-[1.8]" style={{ color: INK_MUTED }}>
                {opt.body}
              </p>

              {opt.swatches && (
                <div className="mt-6 flex items-center gap-2">
                  {opt.swatches.map((c) => (
                    <span
                      key={c}
                      className="h-6 w-6 rounded-full border"
                      style={{ background: c, borderColor: "rgba(61,18,20,0.15)" }}
                    />
                  ))}
                  <span className="ml-1 font-sans text-[10px] uppercase tracking-widest" style={{ color: INK_MUTED }}>
                    Sample tones
                  </span>
                </div>
              )}

              {!opt.swatches && (
                <div className="mt-6 flex items-center gap-3">
                  <span
                    className="flex h-6 items-center rounded-full border px-3 font-sans text-[10px] uppercase tracking-widest"
                    style={{ borderColor: GOLD_LIGHT, color: GOLD }}
                  >
                    S
                  </span>
                  <span className="font-sans text-xs" style={{ color: INK_MUTED }}>
                    →
                  </span>
                  <span
                    className="flex h-6 items-center rounded-full border px-3 font-sans text-[10px] uppercase tracking-widest"
                    style={{ borderColor: GOLD_LIGHT, color: GOLD }}
                  >
                    L
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}