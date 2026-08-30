const GOLD_LIGHT = "#C6A15B";
const INK_GRADIENT = "linear-gradient(135deg, #1E0808 0%, #0D0301 100%)";
const ON_DARK_FAINT = "rgba(254,253,250,0.16)";

const GALLERY = [
  { image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=900", label: "Hand Finishing" },
  { image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=900", label: "The Cutting Table" },
  { image: "https://images.unsplash.com/photo-1544966503-7cc531ecfd9d?auto=format&fit=crop&q=80&w=900", label: "Fabric Library" },
  { image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&q=80&w=900", label: "Final Fitting" },
];

export default function AtelierGallery() {
  return (
    <section className="relative py-24 md:py-28" style={{ background: INK_GRADIENT }}>
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-12 text-center">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em]" style={{ color: GOLD_LIGHT }}>
            Inside The Atelier
          </span>
        </div>
        <div className="atl-gallery grid grid-cols-2 gap-4 md:grid-cols-4">
          {GALLERY.map((item) => (
            <div
              key={item.label}
              className="atl-gallery-item group relative aspect-3/4 overflow-hidden border transition-colors duration-500"
              style={{ borderColor: ON_DARK_FAINT }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = GOLD_LIGHT)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = ON_DARK_FAINT)}
            >
              <img
                src={item.image}
                alt={item.label}
                loading="lazy"
                className="h-full w-full object-cover opacity-85 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute bottom-3 left-3 font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-white">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}