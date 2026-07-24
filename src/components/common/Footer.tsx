import Link from "next/link";

const LINKS = [
  { label: "Services", href: "/services" },
  { label: "Shop",     href: "/shop" },
  { label: "About",    href: "/about" },
  { label: "Contact",  href: "/contact" },
];

const LEGAL = [
  { label: "Privacy Policy",   href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[#E7E3D8] bg-white overflow-hidden">
      {/* Subtle ambient backdrop */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[220px] w-[500px] -translate-x-1/2 rounded-full opacity-60"
        style={{
          background: "radial-gradient(circle at center, rgba(31,74,56,0.04) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-24">
        <div className="grid grid-cols-1 gap-16 sm:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div className="sm:col-span-1 lg:col-span-2">
            <span className="font-display text-2xl font-bold tracking-[0.3em] text-[#1F4A38]">PAS</span>
            <p className="mt-6 max-w-sm font-body text-[13px] font-light leading-[1.8] tracking-wide text-[#6B685F]">
              Engineering absolute performance and elite automotive tailoring for discerning
              connoisseurs who demand uncompromising precision and craftsmanship.
            </p>
            <div className="mt-8 h-px w-12 bg-gradient-to-r from-[#1F4A38]/30 to-transparent" />
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-[10px] font-semibold uppercase tracking-[0.35em] text-[#171712]/50">
              Navigation
            </h4>
            <ul className="mt-6 space-y-4" role="list">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group relative inline-block font-body text-[13px] font-normal tracking-wide text-[#6B685F] transition-colors duration-300 hover:text-[#1F4A38]"
                  >
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-[10px] font-semibold uppercase tracking-[0.35em] text-[#171712]/50">
              Contact
            </h4>
            <ul className="mt-6 space-y-4" role="list">
              <li>
                <a href="tel:+910000000000" className="group block font-body text-[13px] font-normal tracking-wide text-[#6B685F] transition-colors duration-300 hover:text-[#1F4A38]">
                  <span className="block transition-transform duration-300 group-hover:translate-x-1">+91 00000 00000</span>
                </a>
              </li>
              <li>
                <a href="mailto:support@pas-cars.com" className="group block font-body text-[13px] font-normal tracking-wide text-[#6B685F] transition-colors duration-300 hover:text-[#1F4A38]">
                  <span className="block transition-transform duration-300 group-hover:translate-x-1">support@pas-cars.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Brand emblem */}
          <div className="flex items-start justify-start lg:justify-end">
            <div className="border border-[#1F4A38]/15 bg-[#F7F7F4] px-5 py-4 text-center">
              <span className="block font-display text-[9px] font-medium uppercase tracking-[0.45em] text-[#A9773C]">
                Est. 2024
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 flex flex-col items-start gap-6 border-t border-[#E7E3D8] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-[11px] font-normal tracking-wide text-[#B8B4A8]">
            &copy; {new Date().getFullYear()} PAS &mdash; Premium Automotive Solutions. All rights reserved.
          </p>
          <div className="flex gap-6">
            {LEGAL.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-body text-[11px] font-normal tracking-wide text-[#B8B4A8] transition-colors duration-300 hover:text-[#6B685F]"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}