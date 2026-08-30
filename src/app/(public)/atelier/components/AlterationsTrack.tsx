import AlterationsIllustration from "./AlterationsIllustration";

const INK = "#3D1214";
const INK_MUTED = "#756961";
const BG = "#FEFDFA";
const BORDER_STRONG = "#C6A15B";
const GOLD = "#A9853F";
const GOLD_GRADIENT = "linear-gradient(135deg, #A9853F 0%, #C6A15B 100%)";

const GRADIENT_TEXT: React.CSSProperties = {
  backgroundImage: GOLD_GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

const POINTS = ["Resizing — take in or let out", "Collar, cuff & hem adjustment", "Re-colouring & re-lining", "Repairs & re-stitching"];

export default function AlterationsTrack() {
  return (
    <section className="relative py-24 md:py-32" style={{ background: BG }}>
      <div className="atl-track-1 mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="order-2 flex items-center justify-center md:order-1">
            <AlterationsIllustration className="h-auto w-full max-w-md" />
          </div>
          <div className="order-1 md:order-2">
            <span className="font-serif text-xs italic" style={{ color: BORDER_STRONG }}>
              01
            </span>
            <h2 className="mt-2 font-serif text-3xl font-light leading-[1.15] md:text-[2.5rem]" style={{ color: INK }}>
              Alterations &{" "}
              <span className="italic" style={GRADIENT_TEXT}>
                Customisation
              </span>
            </h2>
            <p className="mt-5 max-w-md font-sans text-sm leading-[1.9]" style={{ color: INK_MUTED }}>
              Bring in a shirt, kurta, sherwani, or pair of trousers — ours
              or from any other brand — and our tailors will make it yours
              again.
            </p>
            <ul className="mt-7 flex flex-col gap-2.5">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5 font-sans text-[13px]" style={{ color: INK_MUTED }}>
                  <span className="mt-1.75 h-0.75 w-0.75 shrink-0 rounded-full" style={{ background: GOLD }} />
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