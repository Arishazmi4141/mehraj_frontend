export interface JournalArticle {
  slug: string;
  title: string;
  kicker: string;
  image: string;
  excerpt: string;
  body: string[];
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "art-of-the-bandhgala",
    title: "The Art of the Bandhgala",
    kicker: "Style Guide",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=1200",
    excerpt: "How a single garment came to define formal Indian menswear — and how to wear it today.",
    body: [
      "The bandhgala has stood at the intersection of ceremony and style for over a century, its high collar and structured line borrowed from royal courts and refined for the modern wardrobe.",
      "At MehRāj, every bandhgala begins with the collar — the detail that separates a costume from a garment. We construct ours with a firm interlining that holds its shape through a full evening, never softening into a slouch.",
      "Pair it minimally: a single pocket square, no tie, and let the silhouette do the work.",
    ],
  },
  {
    slug: "inside-the-embroidery-room",
    title: "Inside the Embroidery Room",
    kicker: "Craftsmanship",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200",
    excerpt: "A look at the hands behind every hand-worked motif in the Heritage Collection.",
    body: [
      "Behind every embroidered panel at MehRāj is a craftsperson trained for years before touching a client-facing piece. Nothing here is machine-replicated.",
      "A single sleeve of fine zardozi work can take upward of eighteen hours — time that shows in how the thread catches light differently from every angle.",
      "This is the labour we ask you to feel, not just see.",
    ],
  },
  {
    slug: "a-history-of-the-sherwani",
    title: "A History of the Sherwani",
    kicker: "Cultural History",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Tracing the sherwani from Mughal courts to the modern Indian wedding.",
    body: [
      "The sherwani's silhouette carries four centuries of history — a garment shaped by courtly tradition and reshaped, generation after generation, for new occasions.",
      "What has stayed constant is the intent: a garment meant to be noticed without needing to announce itself.",
      "Our Heritage Collection draws directly from archival silhouettes, reworked in fabrics suited to a contemporary wardrobe.",
    ],
  },
];