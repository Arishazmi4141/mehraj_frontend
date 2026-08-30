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

const STEPS = [
  { title: "Consultation", body: "Bring your piece or your reference. Your tailor discusses fit, fabric, and what needs to change." },
  { title: "Fabric & Fit", body: "Choose from our curated fabric library, or match your reference, and confirm every construction detail." },
  { title: "Construction", body: "Each piece is hand-worked in the Atelier, with a fitting before final delivery." },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 md:py-28" style={{ background: BG }}>
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <div className="mb-16 text-center">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em]" style={{ color: GOLD }}>
            How It Works
          </span>
          <h2 className="mt-3 font-serif text-2xl font-light md:text-3xl" style={{ color: INK }}>
            Three Steps, <span className="italic" style={GRADIENT_TEXT}>One Conversation</span>
          </h2>
        </div>

        <div className="atl-steps-row relative grid grid-cols-1 gap-10 sm:grid-cols-3">
          <span
            className="pointer-events-none absolute left-0 right-0 top-6 hidden sm:block"
            style={{ height: "1px", borderTop: `1px dashed ${BORDER_STRONG}` }}
            aria-hidden="true"
          />
          {STEPS.map((step, i) => (
            <div key={step.title} className="atl-step relative text-center">
              <div
                className="relative z-10 mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border font-serif text-sm italic"
                style={{ borderColor: GOLD, background: BG, color: INK }}
              >
                0{i + 1}
              </div>
              <h3 className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em]" style={{ color: INK }}>
                {step.title}
              </h3>
              <p className="mx-auto mt-3 max-w-xs font-sans text-[12.5px] leading-[1.8]" style={{ color: INK_MUTED }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}