import RecreationIllustration from "./RecreationIllustration";

const INK_GRADIENT = "linear-gradient(135deg, #1E0808 0%, #0D0301 100%)";
const GOLD_GRADIENT = "linear-gradient(135deg, #A9853F 0%, #C6A15B 100%)";
const BG = "#FEFDFA";
const GOLD_LIGHT = "#C6A15B";
const ON_DARK = "rgba(254,253,250,0.62)";
const ON_DARK_FAINT = "rgba(254,253,250,0.16)";

const GRADIENT_TEXT: React.CSSProperties = {
  backgroundImage: GOLD_GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

const POINTS = [
  "Reference & silhouette matching",
  "Fabric selection to match the look",
  "Fully made-to-measure construction",
  "One-on-one design consultation",
];

export default function CustomRecreationTrack() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32" style={{ background: INK_GRADIENT }}>
      <div className="atl-track-2 mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <span className="font-serif text-xs italic" style={{ color: ON_DARK_FAINT }}>
              03
            </span>
            <h2 className="mt-2 font-serif text-3xl font-light leading-[1.15] md:text-[2.5rem]" style={{ color: BG }}>
              Custom{" "}
              <span className="italic" style={GRADIENT_TEXT}>
                Recreation
              </span>
            </h2>
            <p className="mt-5 max-w-md font-sans text-sm leading-[1.9]" style={{ color: ON_DARK }}>
              Seen a design you love — from another label, a photograph, or
              your own sketch? Our tailors study the silhouette and build it
              fresh, entirely to your measure.
            </p>
            <ul className="mt-7 flex flex-col gap-2.5">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5 font-sans text-[13px]" style={{ color: ON_DARK }}>
                  <span className="mt-1.75 h-0.75 w-0.75 shrink-0 rounded-full" style={{ background: GOLD_LIGHT }} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <RecreationIllustration className="h-auto w-full max-w-md" />
          </div>
        </div>
      </div>
    </section>
  );
}