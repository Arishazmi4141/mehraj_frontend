import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[var(--color-bg)]">
      

 <Link href="/">
       <span className="eyebrow mb-6">MehRāj</span>
      </Link>


      <h1 className="font-display text-7xl md:text-9xl text-[var(--color-ink)] mb-4">
        404
      </h1>

      <div className="accent-rule max-w-xs mb-6" />

      <h2 className="font-display text-xl md:text-2xl text-[var(--color-ink)] mb-4">
        This Page Isn&apos;t Cut From Our Cloth
      </h2>

      <p className="font-body text-sm text-[var(--color-ink-muted)] max-w-md mb-10 leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back to the atelier.
      </p>

      <Link href="/" className="btn-gold">
        Return Home
      </Link>
    </div>
  );
}