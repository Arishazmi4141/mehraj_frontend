export type TierCategory = {
  index: string; // "2.1" style label shown as a small tag
  heading: string;
  flagship?: boolean;
  scope: string[];
  approach: string[];
  advantages: string[];
  involves: string[]; // reframed "disadvantages/risks" as honest expectations
  successLooksLike: string;
  weAvoid: string;
  howWeProtectYou: string;
};

export type TierCommitments = {
  will: string[];
  wont: string[];
};

export type TierData = {
  slug: "tier-1" | "tier-2" | "tier-3";
  number: string; // "01"
  label: string; // "Tier 1"
  name: string; // "Dynamics, Comfort & Vehicle Transformation"
  eyebrow: string;
  philosophyHeading: string;
  philosophy: string;
  heroImageAlt: string;
  categories: TierCategory[];
  commitments: TierCommitments;
  closingHeading: string;
  closing: string;
  prev?: { slug: string; label: string };
  next?: { slug: string; label: string };
};

export const TIER_SUMMARIES = [
  {
    slug: "tier-1",
    number: "01",
    label: "Tier 1",
    name: "Dynamics, Comfort & Transformation",
    blurb:
      "Engineering-driven handling, comfort, and full vehicle transformation programs — where Petrolheads' identity is defined.",
    imageAlt: "Vehicle undergoing suspension and dynamics work",
  },
  {
    slug: "tier-2",
    number: "02",
    label: "Tier 2",
    name: "Aesthetics & Safety",
    blurb:
      "Visible, tangible upgrades — premium coatings, detailing, and safety systems customers feel from the very first drive.",
    imageAlt: "Ceramic coating and detailing work on a vehicle",
  },
  {
    slug: "tier-3",
    number: "03",
    label: "Tier 3",
    name: "Diagnostics & Maintenance",
    blurb:
      "The engineering-first foundation — full diagnostic transparency and preventive care that earns trust before anything else.",
    imageAlt: "Technician running full ECU diagnostics",
  },
];

export const TIER_1: TierData = {
  slug: "tier-1",
  number: "01",
  label: "Tier 1",
  name: "Dynamics, Comfort & Vehicle Transformation",
  eyebrow: "Petrolheads Service Tiers",
  philosophyHeading: "Why Tier 1 Exists",
  philosophy:
    "Tier 1 is where we work on how a car actually behaves — its handling, its comfort, its entire driving character. This is the ground most traditional garages don't cover, and it's where we build the kind of relationship that lasts well beyond a single visit.",
  heroImageAlt: "Precision suspension and handling work in progress",
  categories: [
    {
      index: "01",
      heading: "Vehicle Dynamics & Handling Engineering",
      scope: [
        "Suspension geometry optimisation",
        "Ride height and damping balance",
        "Steering response tuning",
        "Brake balance optimisation",
        "Tyre selection, pressure, and alignment strategy",
      ],
      approach: [
        "We start with baseline diagnostics and real measurements",
        "Stability and predictability come before aggression",
        "Every setup is validated with alignment data and test drives",
        "You receive a full setup report at the end",
      ],
      advantages: [
        "A genuinely rare service in independent garages",
        "Backed by real engineering credibility, not guesswork",
      ],
      involves: [
        "This is expert-level, hands-on work — it takes time to do properly",
        "We set clear expectations upfront so there are no surprises",
      ],
      successLooksLike: "A precise diagnosis and a clearly defined scope before we touch the car.",
      weAvoid: "Over-promising outcomes we can't guarantee.",
      howWeProtectYou: "A signed setup intent and scope document before work begins.",
    },
    {
      index: "02",
      heading: "Comfort & NVH Engineering",
      scope: [
        "Cabin noise reduction",
        "Vibration and harshness control",
        "Ride comfort optimisation",
        "Long-drive fatigue reduction",
        "Acoustic and thermal comfort improvements",
      ],
      approach: [
        "We identify the dominant noise and vibration sources first",
        "Layered damping is applied selectively, not blanket-style",
        "We avoid over-insulation and unnecessary added weight",
        "Every improvement is validated with real test drives",
      ],
      advantages: [
        "A strong, immediately felt luxury upgrade",
        "High emotional impact — customers notice it every single drive",
      ],
      involves: [
        "Labour-intensive work done in careful stages",
        "Comfort is subjective, so we listen closely to your feedback",
      ],
      successLooksLike: "Targeted treatment with a clear, felt outcome.",
      weAvoid: "Over-treatment that adds cost and complexity without benefit.",
      howWeProtectYou: "Comfort work is offered in clear, phased packages.",
    },
    {
      index: "03",
      heading: "Vehicle Transformation Program",
      flagship: true,
      scope: [
        "Exterior and interior refinement",
        "NVH and comfort engineering",
        "Handling and braking optimisation",
        "Drivability and efficiency optimisation",
        "A personalised setup philosophy built around you",
      ],
      approach: [
        "Every program begins with a mandatory consultation and diagnostics phase",
        "Transformation goals are agreed with you in writing",
        "Execution happens in phases, so cost and expectations stay in control",
        "A final validation drive and full documentation close every program",
      ],
      advantages: [
        "Our flagship offering, and the highest expression of what we do",
        "A deeply personal, high-touch project built around your car",
      ],
      involves: [
        "A serious undertaking with a longer timeline",
        "Constant communication with you throughout, by design",
      ],
      successLooksLike: "A well-defined scope, billed in clear phases.",
      weAvoid: "Scope creep and unclear expectations.",
      howWeProtectYou: "A written transformation roadmap with your sign-off at every phase.",
    },
  ],
  commitments: {
    will: [
      "Take on a limited number of projects at a time, to protect quality",
      "Document every stage of the work",
      "Educate you thoroughly before, during, and after",
    ],
    wont: [
      "Chase volume over craftsmanship",
      "Promise racing-level performance we can't responsibly deliver",
      "Compromise on safety or legality, ever",
    ],
  },
  closingHeading: "Final Positioning",
  closing:
    "Tier 1 is the identity of Petrolheads. It isn't about selling parts or chasing speed — it's engineering-driven transformation, executed properly. Done right, this is what earns long-term trust and turns a garage into a brand people talk about.",
  next: { slug: "tier-2", label: "Aesthetics & Safety" },
};

export const TIER_2: TierData = {
  slug: "tier-2",
  number: "02",
  label: "Tier 2",
  name: "Aesthetics & Safety",
  eyebrow: "Petrolheads Service Tiers",
  philosophyHeading: "Why Tier 2 Exists",
  philosophy:
    "Tier 2 is where value is visible and immediate. Aesthetic and safety upgrades satisfy something emotional — pride, confidence — while staying entirely rational purchases. It's craftsmanship you can see and protection you can trust.",
  heroImageAlt: "Ceramic coating being applied to vehicle paintwork",
  categories: [
    {
      index: "01",
      heading: "Aesthetics",
      scope: [
        "Premium ceramic and graphene coatings",
        "Paint Protection Film (PPF)",
        "Exterior paint enhancement and correction",
        "Deep interior detailing and leather treatment",
        "Engine bay detailing",
      ],
      approach: [
        "We sell the outcome — finish, durability, ease of care — never just the chemical",
        "Strict surface preparation standards on every car",
        "Structured packages, not race-to-the-bottom discounts",
        "We limit daily intake to protect the quality of every job",
      ],
      advantages: [
        "A strong, visible result that's easy to show off and refer",
        "High social visibility — the work speaks for itself",
      ],
      involves: [
        "Genuinely labour-intensive, done right",
        "Consistency requires discipline — we don't cut corners to move faster",
      ],
      successLooksLike: "Premium materials applied through a disciplined, unhurried workflow.",
      weAvoid: "Underpricing and rushing jobs to fit more in.",
      howWeProtectYou: "Fewer jobs, held to a higher standard.",
    },
    {
      index: "02",
      heading: "Safety & Confidence",
      scope: [
        "Brake upgrade programs (pads, fluids, lines)",
        "Tyre selection and upgrade consultation",
        "Suspension safety upgrades (OEM+)",
        "Alignment, balancing, and stability optimisation",
        "Visibility and lighting upgrades (fully legal)",
      ],
      approach: [
        "We recommend upgrades only when they're genuinely needed",
        "Every inspection and improvement is documented for you",
      ],
      advantages: [
        "Builds real, lasting trust",
        "The foundation of repeat business and long-term loyalty",
        "Lower compliance risk, done properly the first time",
      ],
      involves: [
        "High responsibility work — we take it seriously",
        "Only skilled labour and quality parts, no shortcuts",
      ],
      successLooksLike: "Upgrades that are genuinely needed and clearly explained.",
      weAvoid: "Recommending work that isn't necessary.",
      howWeProtectYou: "A documented inspection and improvement record for every visit.",
    },
  ],
  commitments: {
    will: [
      "Maintain a premium standard on every job",
      "Document every job, start to finish",
      "Educate you on safety and long-term value",
    ],
    wont: [
      "Compete on the lowest price",
      "Promise unrealistic outcomes",
      "Compromise on safety, ever",
    ],
  },
  closingHeading: "Where This Fits",
  closing:
    "Tier 2 is where visible craftsmanship meets everyday confidence — the upgrades you notice and feel every time you get behind the wheel, backed by the same discipline that defines everything we do.",
  prev: { slug: "tier-1", label: "Dynamics & Transformation" },
  next: { slug: "tier-3", label: "Diagnostics & Maintenance" },
};

export const TIER_3: TierData = {
  slug: "tier-3",
  number: "03",
  label: "Tier 3",
  name: "Diagnostics & Maintenance",
  eyebrow: "Petrolheads Service Tiers",
  philosophyHeading: "Why Tier 3 Exists",
  philosophy:
    "Tier 3 isn't about competing with the local garage down the road. It's where we position ourselves as an engineering-first automotive consultant — structured understanding of your vehicle, explained honestly, every time.",
  heroImageAlt: "Full ECU diagnostics session on a vehicle",
  categories: [
    {
      index: "01",
      heading: "Advanced Diagnostics",
      scope: [
        "Full ECU diagnostics and fault code analysis",
        "Live sensor data review",
        "Brake, suspension, and steering inspection",
        "Electrical and battery health assessment",
        "Test drive for NVH and drivability evaluation",
      ],
      approach: [
        "Diagnostics are always a paid, professional service — never a loss-leader",
        "You receive a full written diagnostic health report",
        "Findings are used to educate you, not pressure you",
        "We recommend phased solutions rather than pushing a sale",
      ],
      advantages: [
        "High trust and credibility, backed by real data",
        "Low consumable cost, high diagnostic value",
        "Often the clearest entry point into deeper engineering work",
      ],
      involves: [
        "Skilled interpretation, not just a code readout",
        "Your report is real documentation you can act on immediately or keep",
      ],
      successLooksLike: "A clear, high-value report you can act on right away — or use as the foundation for further work.",
      weAvoid: "Treating diagnostics as a one-off, throwaway transaction.",
      howWeProtectYou: "Every report is priced and treated as genuine professional documentation.",
    },
    {
      index: "02",
      heading: "Preventive Maintenance",
      scope: [
        "Engine oil, brake fluid, and coolant replacement",
        "Air, oil, and cabin filter replacement",
        "Brake servicing",
        "Suspension wear inspection",
        "Long-drive reliability checks",
      ],
      approach: [
        "Maintenance is sold as clear packages, not itemised guesswork",
        "We focus on reliability and longevity over cutting corners",
        "Heavy repairs outside our scope are referred out honestly",
      ],
      advantages: [
        "Keeps you coming back for the right reasons",
        "Predictable, dependable care you can plan around",
      ],
      involves: [
        "Labour-dependent work, done to a consistent standard",
        "Margins reflect the quality of parts used, not the cheapest option",
      ],
      successLooksLike: "Package-based pricing built around OEM+ consumables.",
      weAvoid: "Competing purely on price with volume garages.",
      howWeProtectYou: "Premium positioning maintained on every single visit.",
    },
  ],
  commitments: {
    will: [
      "Document every inspection, in detail",
      "Educate you at every step of the process",
      "Treat Tier 3 as your doorway into deeper engineering work, when you're ready",
    ],
    wont: [
      "Offer free diagnostics that cut corners on quality",
      "Operate like a mass-service centre",
    ],
  },
  closingHeading: "Final Positioning",
  closing:
    "Diagnostics and maintenance aren't an afterthought here — they're where trust gets built, one honest, documented inspection at a time. It's the foundation everything else at Petrolheads stands on.",
  prev: { slug: "tier-2", label: "Aesthetics & Safety" },
};

export const ALL_TIERS: Record<string, TierData> = {
  "tier-1": TIER_1,
  "tier-2": TIER_2,
  "tier-3": TIER_3,
};