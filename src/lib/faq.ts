/**
 * FAQ copy. The accordion and the FAQPage JSON-LD are both generated from
 * this, so the schema always matches the visible text (Google requires that).
 * `links` turn the first occurrence of `text` in the answer into a link;
 * `home` marks the six shown on the homepage; `start` the three on /start.
 */
export type FaqItem = {
  q: string;
  a: string;
  links?: { text: string; href: string }[];
  home?: boolean;
  start?: boolean;
};
export type FaqGroup = { group: string; items: FaqItem[] };

export const faq: FaqGroup[] = [
  {
    group: "About Foundhouse",
    items: [
      {
        q: "What is Foundhouse?",
        a: "Foundhouse is a software and product studio for founders. We take ideas from first concept to launch: consultation, mobile and web app development, go-to-market strategy, social media automation and analytics, all on one team with no handoffs between agencies. Foundhouse is led by founders who have built and launched their own products.",
        links: [{ text: "mobile and web app development", href: "/#services" }],
        home: true,
      },
      {
        q: "Who does Foundhouse work with?",
        a: "Foundhouse works with startup founders and growing businesses that want to turn an idea into a real digital product, whether you're launching something new, growing revenue from an existing product, or keeping a live product running. You don't need a technical team or a finished spec to start; scoping the first version is part of what we do.",
      },
      {
        q: "How is Foundhouse different from a typical development agency?",
        a: "Most agencies hand you code and leave the launch to you. Foundhouse is stacked end to end: strategy, design, development and launch sit on one team, and people who have sold their own products are in the room from day one. We run engagements like a startup and measure success by results, not by features shipped.",
      },
    ],
  },
  {
    group: "Services",
    items: [
      {
        q: "What services does Foundhouse offer?",
        a: "Foundhouse offers five services: Consultation to pressure-test your idea and scope the first version; Mobile and Web App Development with senior engineers on every build; Go-to-Market Strategy covering positioning, pricing and launch; Social Media Automation to keep your channels active; and Analytics that show what users actually do and turn it into decisions.",
        links: [{ text: "five services", href: "/#services" }],
        home: true,
      },
      {
        q: "Do I need a technical co-founder to build my app?",
        a: "No. Foundhouse acts as your product and engineering team. Senior engineers design, build and maintain the product, while founders on our side help with strategy, positioning and launch. Many clients come to us precisely because they don't have in-house engineers yet and want to launch without hiring a full team first.",
        home: true,
      },
      {
        q: "What has Foundhouse built?",
        a: "Foundhouse has shipped four products with 100% client satisfaction, including Kept House, an estate transition platform; AFMS, a farm workforce management system; and Obai, an AI platform for vehicle valuation and insurance claims. Each was taken from concept through launch by the same team.",
        links: [
          { text: "Kept House", href: "https://www.keptestate.com/" },
          { text: "Obai", href: "https://obai.app/" },
        ],
      },
    ],
  },
  {
    group: "Pricing & tiers",
    items: [
      {
        q: "How much does it cost to work with Foundhouse?",
        a: "Foundhouse works in three tiers. fullHouse is $10,000 a month and covers end-to-end product development and maintenance plus go-to-market, social launch strategy, automation and analytics. halfHouse is $5,000 a month and covers end-to-end product development and maintenance. tinyHouse is free and offers webinars and in-person classes for founders who want to learn before they build.",
        home: true,
        start: true,
      },
      {
        q: "What's the difference between fullHouse and halfHouse?",
        a: "Both tiers include end-to-end development and ongoing maintenance of your product. fullHouse adds the launch side: go-to-market strategy, a social media launch plan, content automation, and analytics. Choose halfHouse if marketing is already covered and you need a build team; choose fullHouse if you want one team responsible for both building and launching.",
        start: true,
      },
      {
        q: "Is there a free way to work with Foundhouse?",
        a: "Yes, two ways. The first consultation call is free no matter which tier you're considering. And tinyHouse is Foundhouse's free tier, with webinars and in-person classes for founders who want to learn the process before committing to a build.",
        links: [{ text: "first consultation call is free", href: "/start" }],
        start: true,
      },
    ],
  },
  {
    group: "Working together",
    items: [
      {
        q: "How do I get started with Foundhouse?",
        a: "Go to foundhouse.tech/start, tell us what you're building, choose the tier that fits, and answer a few questions about your goals and where you are today. You'll then book a call directly with the Foundhouse team member matched to your tier, so the first conversation is with the right person.",
        links: [{ text: "foundhouse.tech/start", href: "/start" }],
        home: true,
      },
      {
        q: "How long does it take to build an MVP?",
        a: "Most first versions take 4 to 8 weeks, depending on scope. In the first conversation Foundhouse pressure-tests the idea, defines the smallest version worth launching, and maps the fastest path from concept to launch, so you know the timeline before any build starts.",
      },
      {
        q: "What happens after my product launches?",
        a: "Launch isn't the finish line. Both paid tiers include ongoing maintenance, so the same engineers who built your product keep it running and improving. On fullHouse, analytics show how users actually behave and social automation keeps your channels active, so each next decision is based on real data.",
        home: true,
      },
      {
        q: "Who owns the code and the product?",
        a: "Code and product ownership is set out in each Foundhouse client agreement, and the terms are agreed before any build starts. Bring it up in your consultation and it will be spelled out in your proposal, so there are no surprises about what you own at the end of the engagement.",
      },
      {
        q: "Where is Foundhouse based, and do you work remotely?",
        a: "Foundhouse is based in Cincinnati, Ohio, and works with founders across the U.S. remotely, with in-person meetings available in the Cincinnati area. tinyHouse classes are held in person in Cincinnati, and webinars are open to anyone online.",
      },
    ],
  },
];

export const allFaqs = faq.flatMap((g) => g.items);

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}
