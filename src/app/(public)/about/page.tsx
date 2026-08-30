"use client";

import Link from "next/link";
import {
  Wrench,
  ShieldCheck,
  Clock,
  Award,
  CheckCircle2,
  Star,
  ArrowRight,
  Quote,
} from "lucide-react";

/**
 * /about — London Motor Sports
 * Palette: Wine (#3D1214) as primary accent, Taupe/Brass (#756961) as secondary accent.
 * Pure UI & Typography focused layout (Zero Image Dependencies).
 */

const STATS = [
  { label: "Years In Business", value: "15+" },
  { label: "Cars Serviced", value: "8,000+" },
  { label: "Certified Technicians", value: "12" },
  { label: "Customer Rating", value: "4.9/5" },
];

const VALUES = [
  {
    icon: Wrench,
    title: "Skilled Hands",
    body: "Every technician on the floor is factory-trained and certified, not just experienced.",
  },
  {
    icon: ShieldCheck,
    title: "Honest Diagnostics",
    body: "We show you what's wrong before we fix it — no upsells, no guesswork billed as work.",
  },
  {
    icon: Clock,
    title: "Respect For Your Time",
    body: "Most jobs are quoted with a clear turnaround, and we stick to it strictly.",
  },
  {
    icon: Award,
    title: "Parts You Can Trust",
    body: "OEM and top-tier aftermarket parts only — nothing that cuts corners on safety.",
  },
];

// EXTRA SECTION 1: Our Process
const PROCESS_STEPS = [
  {
    number: "01",
    title: "Digital Inspection",
    description: "Full diagnostic scan and visual report shared with you before any work starts.",
  },
  {
    number: "02",
    title: "Upfront Pricing",
    description: "Itemized quote provided. No hidden charges or unauthorized repairs, ever.",
  },
  {
    number: "03",
    title: "Precision Service",
    description: "Factory-grade tools and master technicians handle your vehicle with exact care.",
  },
  {
    number: "04",
    title: "Final Road Test",
    description: "Comprehensive quality check and road testing to ensure flawless performance.",
  },
];

// EXTRA SECTION 2: Client Reviews
const REVIEWS = [
  {
    author: "Richard Vance",
    vehicle: "Porsche 911 Carrera",
    text: "The transparency is unmatched. They walked me through the diagnostic report line by line. Wouldn't take my car anywhere else in London.",
  },
  {
    author: "Sophia Sterling",
    vehicle: "BMW M4 Competition",
    text: "Clear turnaround times and dealership-level precision without the ridiculous markup. Exceptional service every single time.",
  },
  {
    author: "David Miller",
    vehicle: "Audi RS6 Avant",
    text: "True craftspeople. They fixed an electrical issue two other garages couldn't figure out. Highly recommended.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen selection:bg-[#3D1214] selection:text-white" style={{ background: "var(--color-bg)" }}>
      {/* Hero */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-105 w-180 -translate-x-1/2 -translate-y-1/3 rounded-full"
          style={{ background: "rgba(61,18,20,0.06)", filter: "blur(60px)" }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center md:px-12">
          <span className="font-body text-[10px] uppercase tracking-[0.3em]" style={{ color: "#756961" }}>
            About Us
          </span>
          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-8" style={{ background: "var(--color-border-strong)" }} aria-hidden />
            <span className="font-body text-[12px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#3D1214" }}>
              London Motor Sports
            </span>
            <span className="h-px w-8" style={{ background: "var(--color-border-strong)" }} aria-hidden />
          </div>
          <h1
            className="mt-6 font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] md:text-[3rem]"
            style={{ color: "var(--color-ink)" }}
          >
            Built On Trust, Run On Craft
          </h1>
          <p
            className="mx-auto mt-6 max-w-xl font-body text-[14px] leading-[1.85]"
            style={{ color: "var(--color-ink-muted)" }}
          >
            London Motor Sports started as a two-bay workshop with one promise:
            fix it right the first time. Years on, that promise hasn&apos;t changed —
            only the number of cars we&apos;ve kept on the road because of it.
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="px-6 md:px-12">
        <div
          className="mx-auto grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-md border shadow-sm sm:grid-cols-4"
          style={{ borderColor: "var(--color-border)", background: "var(--color-border)" }}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center p-8 text-center transition-colors"
              style={{ background: "var(--color-surface)" }}
            >
              <p className="font-display text-3xl font-bold md:text-4xl" style={{ color: "#3D1214" }}>
                {s.value}
              </p>
              <p
                className="mt-2 font-body text-[10px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: "var(--color-ink-faint)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Story & Philosophy Section (Redesigned with clean text highlights) */}
      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#756961" }}>
              Our Story
            </span>
            <h2
              className="mt-4 font-display text-3xl font-bold leading-[1.2] tracking-[-0.02em] md:text-4xl"
              style={{ color: "var(--color-ink)" }}
            >
              A Workshop Built On Reputation, Not Advertising
            </h2>
            <div className="mt-6 flex flex-col gap-4 font-body text-[14.5px] leading-[1.85]" style={{ color: "var(--color-ink-muted)" }}>
              <p>
                We never set out to be the biggest garage in London — just the one
                drivers trusted enough to recommend to family and friends. That word-of-mouth standard remains our proudest achievement.
              </p>
              <p>
                From routine factory servicing to complex engine diagnostics, our team treats every vehicle with mechanical reverence — properly, and without cutting corners.
              </p>
            </div>
          </div>

          <div
            className="flex flex-col gap-6 rounded-lg border p-8 md:p-10"
            style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
          >
            <span className="font-body text-[10px] uppercase tracking-[0.25em]" style={{ color: "#756961" }}>
              The LMS Commitment
            </span>
            <ul className="flex flex-col gap-4">
              {[
                "100% Transparent Digital Diagnostics",
                "Factory-Trained Specialist Technicians",
                "OEM Guarantee On All Replacement Parts",
                "No Work Undertaken Without Approval",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-body text-[14px] font-medium" style={{ color: "var(--color-ink)" }}>
                  <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "#3D1214" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="px-6 py-20 md:px-12 md:py-28" style={{ background: "var(--color-surface)" }}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#756961" }}>
              What We Stand For
            </span>
            <h2
              className="mt-4 font-display text-3xl font-bold leading-[1.2] tracking-[-0.02em] md:text-4xl"
              style={{ color: "var(--color-ink)" }}
            >
              Why Drivers Choose LMS
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {VALUES.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="group flex gap-5 rounded-lg border p-8 transition-all hover:-translate-y-1 hover:shadow-md"
                style={{ background: "var(--color-bg)", borderColor: "var(--color-border)" }}
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors group-hover:bg-[#3D1214]"
                  style={{ background: "rgba(61,18,20,0.04)", borderColor: "rgba(61,18,20,0.15)" }}
                >
                  <Icon className="h-5 w-5 text-[#3D1214] group-hover:text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-display text-[17px] font-semibold" style={{ color: "var(--color-ink)" }}>
                    {title}
                  </p>
                  <p className="mt-2.5 font-body text-[13.5px] leading-[1.8]" style={{ color: "var(--color-ink-muted)" }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXTRA SECTION 1: How We Work (Process Flow) */}
      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#756961" }}>
              Service Standard
            </span>
            <h2
              className="mt-4 font-display text-3xl font-bold leading-[1.2] tracking-[-0.02em] md:text-4xl"
              style={{ color: "var(--color-ink)" }}
            >
              How We Service Your Vehicle
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="flex flex-col justify-between rounded-lg border p-7"
                style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
              >
                <div>
                  <span className="font-display text-2xl font-bold" style={{ color: "#756961" }}>
                    {step.number}
                  </span>
                  <h3 className="mt-4 font-display text-[16px] font-bold" style={{ color: "var(--color-ink)" }}>
                    {step.title}
                  </h3>
                  <p className="mt-2 font-body text-[13px] leading-[1.7]" style={{ color: "var(--color-ink-muted)" }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXTRA SECTION 2: Client Feedback */}
      <section className="border-t px-6 py-20 md:px-12 md:py-28" style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#756961" }}>
              Testimonials
            </span>
            <h2
              className="mt-4 font-display text-3xl font-bold leading-[1.2] tracking-[-0.02em] md:text-4xl"
              style={{ color: "var(--color-ink)" }}
            >
              Feedback From Our Clients
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {REVIEWS.map((rev, index) => (
              <div
                key={index}
                className="flex flex-col justify-between rounded-lg border p-8"
                style={{ background: "var(--color-bg)", borderColor: "var(--color-border)" }}
              >
                <div>
                  <Quote className="h-6 w-6 opacity-30 mb-4" style={{ color: "#3D1214" }} />
                  <p className="font-body text-[13.5px] italic leading-[1.8]" style={{ color: "var(--color-ink-muted)" }}>
                    "{rev.text}"
                  </p>
                </div>
                <div className="mt-8 border-t pt-4" style={{ borderColor: "var(--color-border)" }}>
                  <div className="flex text-[#3D1214] mb-2 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="font-display text-[14px] font-bold" style={{ color: "var(--color-ink)" }}>
                    {rev.author}
                  </p>
                  <p className="font-body text-[11px]" style={{ color: "#756961" }}>
                    {rev.vehicle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t px-6 py-20 text-center md:py-28" style={{ borderColor: "var(--color-border)" }}>
        <p className="font-body text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: "#756961" }}>
          Ready to experience the difference?
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl" style={{ color: "var(--color-ink)" }}>
          Book Your Workshop Appointment
        </h2>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-sm px-8 py-3.5 font-body text-[12px] font-semibold uppercase tracking-[0.14em] transition-all hover:scale-[1.02]"
            style={{ background: "#3D1214", color: "var(--color-surface)" }}
          >
            Get In Touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}