"use client";

/**
 * /about — MehRāj
 * Palette: Wine (#3D1214) as primary accent, Taupe/Brass (#756961) as secondary accent.
 * Layout/design unchanged — only content replaced. Story-style flow, no numbered points.
 */

type Block =
  | { t: "p"; text: string }
  | { t: "quote"; text: string; accent?: boolean }
  | { t: "lines"; items: string[] }
  | { t: "verse"; text: string; note: string };

const STORY: Block[][] = [
  [
    { t: "p", text: "No matter how large a line becomes, it begins with a single point. The Ganga, too, begins at its source as a small stream." },
    { t: "p", text: "MehRāj began with a simple idea." },
    { t: "quote", text: "“What if Indian heritage were not merely remembered but worn?”" },
    { t: "p", text: "Some things reveal their true scale only when seen from a distance. When MehRāj founders Palash Soni and Tayyab Khan travelled to the United Kingdom to pursue their Master’s degrees, being away from home gave them the opportunity to look at India and its way of dressing from a different perspective. Distance offered them a fresh way of seeing the fashion, traditions and clothing they had grown up with." },
    { t: "p", text: "And they began to realise something important. Clothes are not merely meant to cover the body. They shape the way we present ourselves, express our personality and become a part of how the world sees us." },
    { t: "p", text: "Indian men wanted to dress well to look refined, confident and well put together. They wanted their clothes to express their individuality and sense of identity. They did not simply want to follow fashion; they wanted to understand it. But where does one begin? Every body and every personality is different." },
    {
      t: "lines",
      items: [
        "What would suit them?",
        "Which colours would bring out their best?",
        "What should they wear for a particular occasion?",
        "How can traditional clothing be worn in a contemporary way?",
        "Which garments and traditions belong to which part of India?",
        "How can Indian clothing evolve without losing its cultural soul?",
      ],
    },
    { t: "p", text: "And the questions did not end with Indian clothing. There was an equally strong need to understand Western clothing the Oxford shirt, trousers, suit and tie and to develop a sense of ease, refinement and personal style around them." },
    { t: "p", text: "Gradually, it became clear that the question was not about one garment or one category of clothing. It was about the entire wardrobe of the modern Indian man. And that is where the idea of MehRāj began to take shape." },
  ],
  [
    { t: "quote", text: "“THE CENTRAL IDEA HERITAGE MUST BE LIVED”" },
    { t: "p", text: "Heritage remains alive only when it becomes a part of life. It is not an inanimate object kept behind glass in a museum, nor merely a memory preserved in history books. It is meant to be embraced. To be lived with. To be worn. To be experienced." },
    { t: "p", text: "For MehRāj, preserving tradition does not mean reproducing the past exactly as it was. It means understanding its essence and finding ways to make it meaningful in the present. A traditional garment can be worn in a new way. Centuries old craftsmanship can find a place in contemporary clothing. An Indian silhouette can be refined for the modern man without losing what makes it Indian." },
    { t: "p", text: "MehRāj seeks to carry forward Indian craftsmanship, traditional clothing, textile traditions, embroidery, tailoring techniques and our distinctive sense of aesthetics to the generations ahead allowing them to evolve with time while retaining their cultural soul." },
  ],
  [
    { t: "quote", text: "“TRADITION AND EVOLUTION”" },
    { t: "p", text: "Keeping tradition alive does not mean freezing it in time. Time changes. Life changes. Needs change. Naturally, the way we dress changes too. But evolution does not have to mean abandoning identity. MehRāj does not seek to imitate the past. It seeks to carry forward the spirit that has kept Indian clothing alive for centuries." },
    { t: "p", text: "Tradition is not stagnant water. It is a river. And the true way to preserve a river is to let it flow." },
    { t: "p", text: "Tradition is not about going back. It is about moving forward without losing where you came from." },
  ],
  [
    { t: "quote", text: "“SLOW FASHION CLOTHING THAT CAN BECOME A STORY”" },
    { t: "p", text: "In a world that changes rapidly, fashion changes just as quickly. Sometimes it feels as though we have barely put on a new outfit and tied our shoelaces before the trend has already moved on. But clothes are not newspapers. They should not become yesterday’s news by evening. They should be more like stories ones that do not become old with time, but become more personal." },
    { t: "p", text: "Buy less. Choose thoughtfully. Wear longer." },
    { t: "p", text: "A garment should not be just another thing hanging in a wardrobe. Over time, it should gather your memories, experiences and sense of self. That is when a garment stops being merely clothing. It becomes yours." },
  ],
  [
    { t: "quote", text: "“RESPONSIBILITY TOWARDS NATURE”" },
    {
      
      t: "verse",
      text: "तेन त्यक्तेन भुञ्जीथाः",
      note: "This ancient Sanskrit principle from the Isha Upanishad speaks of consuming with a sense of restraint, responsibility and detachment taking from the world with an awareness that it does not belong to us alone.",
    },
    { t: "p", text: "The Indian philosophical tradition has long viewed nature not merely as something to be consumed, but as part of the larger fabric of life. Centuries later, Mahatma Gandhi expressed a similar thought in a modern context:" },
    { t: "p", text: "“The Earth provides enough for every person’s need, but not for every person’s greed.”" },
    { t: "p", text: "Sustainability is therefore not a suddenly discovered modern idea for us. It may have acquired new language, technologies and contexts today, but the consciousness of restraint and responsible consumption has existed in Indian thought for a very long time." },
    { t: "p", text: "MehRāj seeks to bring that consciousness into the way we work. Avoiding unnecessary production. Choosing responsible and more sustainable materials wherever feasible. Reducing our dependence on plastic and unnecessary synthetic materials. Creating garments that are made to last. And bringing the same thoughtfulness to packaging." },
    { t: "p", text: "Where possible, we seek alternatives to plastic such as paper boxes and fabric bags. We also see an opportunity to give leftover fabric from ethnic wear another life by turning it into useful bags, so that less of the material goes to waste." },
    { t: "p", text: "We would rather make honest claims than make grand environmental promises. Because for MehRāj, sustainability is not a marketing strategy. It is a way of working." },
  ],
  [
    { t: "quote", text: "“WHY WE CHOOSE LIMITED PRODUCTION”" },
    { t: "p", text: "Behind a garment there is more than a machine. There are years of practice. Experienced hands. Patience. Skill. And countless thoughtful decisions made over the smallest details." },
    { t: "p", text: "MehRāj respects the craftsmanship of people who have spent years refining their skills whether in fine tailoring, hand embroidery, traditional weaving or any of the many disciplines through which Indian clothing is created. Behind these crafts lies more than technique. There is knowledge passed down through generations. A living heritage. Some skills cannot be learned from books. They travel from hand to hand, from one generation to the next." },
    { t: "p", text: "Machines may assist the process, but the character of a garment comes from human experience, judgement and craftsmanship. We want you to feel something of those hands in what you wear the precision, sensitivity and care that make a garment more than something simply made to be worn." },
    { t: "p", text: "That is why we do not want to join the race towards indiscriminate mass production. Limited production also creates space for craftsmen to find meaningful work and opportunity, while allowing their skills and traditional knowledge to remain alive. We do not want a MehRāj garment to disappear into a crowd of anonymous products something bought today and forgotten tomorrow." },
  ],
  [
    { t: "quote", text: "“MEHRĀJ THE BEAUTY OF READY TO WEAR WITH A TAILORED FEEL”" },
    { t: "p", text: "Nature has an extraordinary way of creating. It uses every mould only once. So how can the people it creates possibly be expected to fit into one standard shape? One person is taller. Another has broader shoulders. Someone else has a different waist, posture or proportion. Every body has its own structure and its own beauty." },
    { t: "p", text: "That is why sometimes we may love a garment, its fabric or its colour, and yet feel that something is missing when we wear it. MehRāj respects every form of craftsmanship including nature’s. We believe every individual is unique, a one of a kind creation. So the garment should respect the person, rather than forcing the person to fit an arbitrary garment." },
    { t: "p", text: "The convenience of ready to wear has its place. But we want our garments to offer something more:" },
    { t: "p", text: "Ready to wear convenience, with the feeling that it was made for you." },
    { t: "p", text: "The classic design remains intact, while the fit comes as close as possible to the individual’s body, proportions and needs. Where feasible, personal preferences whether a small design detail, a colour choice or another minor change can also be considered. Not every request can always be accommodated, but listening to the customer and understanding what matters to them is important." },
    { t: "p", text: "This is where personal styling, occasion dressing, colour understanding, wardrobe guidance and thoughtful alterations become part of the experience. Because for MehRāj, it is not enough for a garment to look good. It should feel good on the person wearing it." },
    { t: "p", text: "That is the beauty we seek: The convenience of ready to wear, with the individuality of tailoring." },
  ],
  [
    { t: "quote", text: "“CLOTHING IS MORE THAN CLOTHING IT IS IDENTITY”" },
    { t: "p", text: "What we wear says something about us." },
    {
      t: "lines",
      items: ["Our taste.", "Our personality.", "Our culture.", "Our confidence.", "Our sense of refinement."],
    },
    { t: "p", text: "What we wear says something about us and sometimes, even our way of looking at life. For MehRāj, clothing is therefore more than a fashion statement. It is a part of identity. We want people not merely to follow a trend, but to understand why they have chosen something." },
    { t: "p", text: "Clothes should not overpower the person wearing them. They should bring the person into view." },
    { t: "p", text: "The best outfit is not the one that gets noticed the most. It is the one in which you are seen the most." },
  ],
  [
    { t: "quote", text: "“A WORLD IN YOUR WARDROBE”" },
    { t: "p", text: "We want your wardrobe to contain a world created for you. A world where India and Europe can exist side by side. Where the kurta and traditional Indian garments can sit comfortably alongside the Oxford shirt, trousers, suit and tie." },
    { t: "p", text: "The question is not whether a garment is Indian or Western. What matters is the understanding and ease with which you wear it. A modern Indian man can remain deeply connected to his heritage while feeling completely at home in contemporary Western clothing. MehRāj believes these worlds do not have to compete. They can belong in the same wardrobe." },
    { t: "p", text: "Because your wardrobe may contain the world, but the most important thing in it should always be you." },
  ],
  [
    { t: "quote", text: "“WHAT MAKES A GENTLEMAN?”" },
    { t: "p", text: "Is a gentleman someone who owns expensive, luxurious and imported clothes? MehRāj sees it differently. To us, a gentleman is someone whose clothing and character are not too far apart. His clothes reflect something of his personality, and his personality carries something of the dignity of what he wears." },
    { t: "p", text: "He understands how to present himself to the world. He knows who he is, understands his roots and knows what matters to him. He treats others with respect and grace. A gentleman’s confidence does not come from display. He does not need an expensive label or unnecessary glamour to prove his worth. He understands that expensive and good are not always the same thing, and he recognises true luxury in quality, craftsmanship, detail and thought. He knows why he chose what he wears." },
    { t: "p", text: "Because for MehRāj, a gentleman is not simply a man who dresses well. He carries a sense of refinement in his choices, his conduct and his character." },
  ],
  [
    { t: "quote", text: "“DOES LUXURY HAVE TO BE IMPORTED?”" },
    { t: "p", text: "Does something have to be foreign and expensive to be considered luxury? There is an old Indian saying:" },
    { t: "quote", text: "“Ghar ka jogi jogda, aan gaon ka sant.”", accent: true },
    { t: "p", text: "Literally, it speaks of the tendency to overlook the worthy person at home while holding an outsider in higher regard. Perhaps it captures something familiar about the way we sometimes value the best of what comes from elsewhere more than what comes from our own soil." },
    { t: "p", text: "Think of biryani. Rich with aroma, flavour, refinement and history, can it really be considered any less luxurious than the celebrated dishes of the world? Does a pizza or a burger automatically become more sophisticated simply because it comes from somewhere else? And yet, at times, the appeal of foreign fast food can become far greater in our minds than its actual qualities deserve." },
    { t: "p", text: "The same can happen with clothing. The softness, beauty, fine craftsmanship and elegance of Indian ethnic wear offer a sense of comfort, character and refinement that can stand confidently beside any luxury. And then imagine the same garment carrying a foreign label and a much higher price. Does that not turn the old wisdom on its head?" },
    { t: "p", text: "And this is not only about Indian ethnic wear. A beautifully made Oxford shirt, pair of trousers or suit can be every bit as luxurious when made in India with the same attention to quality, craftsmanship, fit and detail." },
    { t: "p", text: "Luxury is not defined by where something comes from or how much it costs. It is defined by quality, craftsmanship, detail, beauty, distinction and experience." },
    { t: "p", text: "India does not need to look elsewhere to learn what luxury is. We already have the traditions, skills and craftsmanship to create it. What we need is to look at them again with contemporary understanding and renewed confidence. That is the perspective MehRāj stands for." },
  ],
  [
    { t: "quote", text: "“BEYOND CLOTHING BECOMING PART OF A HERITAGE”" },
    { t: "p", text: "For MehRāj, a garment’s journey does not end when it is sold. A well made garment travels from the hands of a craftsman to someone’s wardrobe. And from there, it becomes part of a life a memory from a meeting, a special occasion, a journey, or simply an everyday moment." },
    { t: "p", text: "That is why MehRāj does not want to be merely a place that sells clothes. We want to build a community of people who value Indian craftsmanship, thoughtful dressing, refinement and their cultural identity." },
    { t: "p", text: "When you choose a MehRāj garment, you are choosing more than an object. You are valuing the skill of the person who made it. You are placing your trust in Indian talent and Indian manufacturing. And you are becoming part of keeping a living tradition relevant for the generations ahead." },
    { t: "p", text: "In that sense, the customer is not simply a customer. He becomes part of the MehRāj journey. A journey that begins with the hands of an Indian craftsman, reaches the wardrobe of the modern Indian man and continues from there." },
  ],
  [
    { t: "quote", text: "“IN THE END WHAT IS MEHRĀJ?”" },
    { t: "p", text: "For MehRāj, clothing is never just clothing. It is a conversation between tradition and modernity. A relationship between the craftsman and the wearer. A bridge between the past and the future. And above all, a way of allowing an individual to express who he is." },
    { t: "p", text: "We want to preserve tradition but not by keeping it behind glass. We want to honour craftsmanship but not by leaving it trapped in the past. We want to dress well but not merely to be seen. We want to be responsible towards nature but not simply by talking about it. And we want to support Indian talent and Indian manufacturing with the confidence that something does not need a foreign stamp to be truly exceptional." },
    {
      t: "lines",
      items: ["Create thoughtfully.", "Choose consciously.", "Wear meaningfully.", "And keep heritage alive in your own time."],
    },
    { t: "quote", text: "That is the MehRāj way." },
  ],
];

const FOUNDERS = [
  { name: "Tayyab Khan", designation: "Co-Founder", photo: "/images/tayyab-khan.jpg" },
  { name: "Palash Soni", designation: "Co-Founder", photo: "/images/palash-soni.jpg" },
];

function Divider() {
  return (
    <div className="mx-auto my-14 flex items-center justify-center gap-3" aria-hidden>
      <span className="h-px w-8" style={{ background: "var(--color-border-strong)" }} />
      <span className="h-1.5 w-1.5 rotate-45" style={{ background: "#756961" }} />
      <span className="h-px w-8" style={{ background: "var(--color-border-strong)" }} />
    </div>
  );
}

function RenderBlock({ b }: { b: Block }) {
  if (b.t === "p")
    return (
      <p className="font-body text-[14.5px] leading-[1.9]" style={{ color: "var(--color-ink-muted)" }}>
        {b.text}
      </p>
    );

  if (b.t === "quote" && b.accent)
    return (
      <blockquote
        className="my-2 py-1 text-center font-display text-[19px] font-semibold leading-[1.6] md:text-[21px]"
        style={{ color: "#8C6A2F" }}
      >
        {b.text}
      </blockquote>
    );

  if (b.t === "quote")
    return (
      <blockquote
        className="my-2 border-l-2 py-1 pl-6 font-display text-[19px] font-semibold leading-[1.6] md:text-[21px]"
        style={{ borderColor: "#3D1214", color: "#3D1214" }}
      >
        {b.text}
      </blockquote>
    );

  if (b.t === "lines")
    return (
      <div
        className="flex flex-col gap-2.5 rounded-lg border p-7 md:p-8"
        style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
      >
        {b.items.map((item) => (
          <p key={item} className="font-body text-[14px] font-medium" style={{ color: "var(--color-ink)" }}>
            {item}
          </p>
        ))}
      </div>
    );

  return (
    <div className="flex flex-col items-center gap-4 py-2 text-center">
      <p className="font-display text-2xl font-bold md:text-3xl" style={{ color: "#2F6B4F" }}>
        {b.text}
      </p>
      <p className="font-body text-[14px] leading-[1.85]" style={{ color: "var(--color-ink-muted)" }}>
        {b.note}
      </p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen selection:bg-[#3D1214] selection:text-white" style={{ background: "var(--color-bg)" }}>
      {/* Hero */}
      <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-105 w-180 -translate-x-1/2 -translate-y-1/3 rounded-full"
          style={{ background: "rgba(61,18,20,0.06)", filter: "blur(60px)" }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center md:px-12">
          <h1
            className="font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] md:text-[3.5rem]"
            style={{ color: "var(--color-ink)" }}
          >
            MehRāj
          </h1>
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-8" style={{ background: "var(--color-border-strong)" }} aria-hidden />
            <span
              className="font-body text-[12px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#3D1214" }}
            >
              An Idea, A Heritage, A Way of Being
            </span>
            <span className="h-px w-8" style={{ background: "var(--color-border-strong)" }} aria-hidden />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 pb-20 md:px-12 md:pb-28">
        <article className="mx-auto max-w-2xl">
          {STORY.map((group, gi) => (
            <div key={gi}>
              <div className="flex flex-col gap-6">
                {group.map((b, bi) => (
                  <RenderBlock key={bi} b={b} />
                ))}
              </div>
              {gi < STORY.length - 1 && <Divider />}
            </div>
          ))}

          <div className="mt-16 text-center">
            <p
              className="font-display text-xl font-bold tracking-[0.04em] md:text-2xl"
              style={{ color: "#3D1214" }}
            >
              Designed in India. Made in India. Made for India.
            </p>
          </div>
        </article>
      </section>

      {/* Founders */}
      <section
        className="border-t px-6 py-20 md:px-12 md:py-28"
        style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-14 text-center">
            <span
              className="font-body text-[10px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: "#756961" }}
            >
              The Founders
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {FOUNDERS.map((f) => (
              <div
                key={f.name}
                className="flex flex-col items-center rounded-lg border p-8 text-center"
                style={{ background: "var(--color-bg)", borderColor: "var(--color-border)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.photo}
                  alt={f.name}
                  className="h-44 w-44 rounded-full border object-cover"
                  style={{ borderColor: "rgba(61,18,20,0.15)" }}
                />
                <p className="mt-6 font-display text-[18px] font-bold" style={{ color: "var(--color-ink)" }}>
                  {f.name}
                </p>
                <p
                  className="mt-1 font-body text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "#756961" }}
                >
                  {f.designation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}