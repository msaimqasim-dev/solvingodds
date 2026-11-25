import { serviceForHomeId, servicePath } from "./services";

export interface MediaAsset {
  src: string;
  alt: string;
  aspect: string;
  credit: string;
  fallbackLabel: string;
}

export interface NavItem {
  label: string;
  href: string;
  index: string;
}

export interface GalleryItem {
  id: string;
  code: string;
  caption: string;
  discipline: string;
  parallaxSpeed: number;
  media: MediaAsset;
}

export interface ServiceItem {
  id: string;
  href: string;
  number: string;
  title: string;
  shortLabel: string;
  description: string;
  capabilities: string[];
  media: MediaAsset;
}



export interface ApproachStage {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface PrincipleItem {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export const BRAND = {
  name: "SolvingOdds",
  websiteLabel: "solvingodds.com",
  websiteUrl: "https://solvingodds.com/",
  tagline: "Creative, Digital, and Business Support Services",
  footerSummary:
    "SolvingOdds brings together custom web design and development, social media services, and medical billing support with clear thinking and practical execution.",
  // Populate with verified profile URLs once official accounts are confirmed
  socialLinks: [] as SocialLink[],
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", index: "01" },
  { label: "Services", href: "/services", index: "02" },
  { label: "Our Work", href: "/#work", index: "03" },
  { label: "About Us", href: "/about", index: "04" },
  { label: "Contact", href: "/contact", index: "05" },
];

export const HERO_CONTENT = {
  eyebrow: "CREATIVE & BUSINESS SOLUTIONS",
  headlineLines: ["Turning complexity", "into opportunity."],
  description:
    "We design and develop websites, help brands grow their social presence, and support healthcare practices with medical billing solutions.",
  primaryCta: {
    label: "Explore Our Services",
    href: "/services",
  },
  secondaryCta: {
    label: "Let's Talk",
    href: "/contact",
  },
  serviceLabels: [
    {
      number: "01",
      label: "Web Design & Development",
      href: servicePath(serviceForHomeId("service-01")!.slug),
    },
    {
      number: "02",
      label: "Social Media Services",
      href: servicePath(serviceForHomeId("service-02")!.slug),
    },
    {
      number: "03",
      label: "Medical Billing Services",
      href: servicePath(serviceForHomeId("service-03")!.slug),
    },
  ],
  media: {
    src: "/images/home/hero-development-studio.webp",
    alt: "Developer at work in a modern design studio",
    aspect: "16 / 9",
    credit: "Pexels",
    fallbackLabel: "Developer at work in a modern design studio",
  } as MediaAsset,
};

export const ABOUT_CONTENT = {
  eyebrow: "WHO WE ARE",
  headlineLines: ["Different challenges.", "One creative mindset."],
  description:
    "SolvingOdds brings together creative design, digital execution, and specialized business support. We focus on understanding the problem, simplifying the process, and creating solutions built around our clients' needs.",
  cta: {
    label: "Discover Our Approach",
    href: "#approach",
  },
  gallery: [
    {
      id: "gallery-01",
      code: "FIG. 01",
      caption: "Structured creative direction",
      discipline: "Perspective",
      parallaxSpeed: -28,
      media: {
        src: "/images/home/gallery-creative-direction.webp",
        alt: "Designers working together on a laptop",
        aspect: "3 / 4",
        credit: "Pexels",
        fallbackLabel: "Designers working together on a laptop",
      },
    },
    {
      id: "gallery-02",
      code: "FIG. 02",
      caption: "Thoughtful digital interfaces",
      discipline: "Web Design & Development",
      parallaxSpeed: 22,
      media: {
        src: "/images/home/gallery-digital-interfaces.webp",
        alt: "Digital drawing on a tablet beside a pencil",
        aspect: "16 / 10",
        credit: "Pexels",
        fallbackLabel: "Digital drawing on a tablet beside a pencil",
      },
    },
    {
      id: "gallery-03",
      code: "FIG. 03",
      caption: "Visual content production",
      discipline: "Social Media Services",
      parallaxSpeed: -18,
      media: {
        src: "/images/home/gallery-content-production.webp",
        alt: "Professional video production equipment in a studio",
        aspect: "4 / 3",
        credit: "Pexels",
        fallbackLabel: "Professional video production equipment in a studio",
      },
    },
    {
      id: "gallery-04",
      code: "FIG. 04",
      caption: "Organized operational workflows",
      discipline: "Medical Billing Support",
      parallaxSpeed: 26,
      media: {
        src: "/images/home/gallery-billing-workflows.webp",
        alt: "Laptop and insurance paperwork on a table",
        aspect: "16 / 10",
        credit: "Pexels",
        fallbackLabel: "Laptop and insurance paperwork on a table",
      },
    },
  ] as GalleryItem[],
};

export const SERVICES_CONTENT = {
  eyebrow: "WHAT WE DO",
  headlineLines: ["Solutions for", "what's next."],
  description:
    "From digital experiences to social media and healthcare revenue cycle support, we bring focused expertise to the challenges businesses face.",
  cta: {
    label: "Explore Services",
    href: "/services",
  },
  items: [
    {
      id: "service-01",
      href: servicePath(serviceForHomeId("service-01")!.slug),
      number: "01",
      title: "Web Design & Development",
      shortLabel: "Digital Experiences",
      description:
        "Custom website design and development focused on usability, visual quality, responsive performance, and meaningful digital experiences.",
      capabilities: [
        "Website Design",
        "Web Development",
        "Responsive Experiences",
        "E-commerce Development",
      ],
      media: {
        src: "/images/home/service-web-development.webp",
        alt: "Developer working on code in an office",
        aspect: "16 / 10",
        credit: "Pexels",
        fallbackLabel: "Developer working on code in an office",
      },
    },
    {
      id: "service-02",
      href: servicePath(serviceForHomeId("service-02")!.slug),
      number: "02",
      title: "Social Media Services",
      shortLabel: "Brand Communication",
      description:
        "Creative content, social media management, and consistent brand communication that help businesses build a stronger online presence.",
      capabilities: [
        "Social Media Management",
        "Content Creation",
        "Graphic Design",
        "Social Media Strategy",
      ],
      media: {
        src: "/images/home/service-social-media.webp",
        alt: "Team collaborating around printed charts",
        aspect: "16 / 10",
        credit: "Pexels",
        fallbackLabel: "Team collaborating around printed charts",
      },
    },
    {
      id: "service-03",
      href: servicePath(serviceForHomeId("service-03")!.slug),
      number: "03",
      title: "Medical Billing Services",
      shortLabel: "Revenue Cycle Support",
      description:
        "Billing and revenue cycle support designed to help healthcare practices manage claims, enrollment, and outstanding accounts.",
      capabilities: [
        "Provider Credentialing & Enrollment with Government and Commercial Insurances",
        "Medical Billing",
        "Claim Creation & Production",
        "Accounts Receivable (A/R) Follow-Up",
      ],
      media: {
        src: "/images/home/service-medical-billing.webp",
        alt: "Insurance paperwork beside a laptop",
        aspect: "16 / 10",
        credit: "Pexels",
        fallbackLabel: "Insurance paperwork beside a laptop",
      },
    },
  ] as ServiceItem[],
};



export const APPROACH_CONTENT = {
  eyebrow: "HOW WE WORK",
  headlineLines: ["Clear thinking.", "Thoughtful execution."],
  stages: [
    {
      number: "01",
      title: "Discover",
      description:
        "We start by understanding the business, its challenges, and what needs to be achieved.",
      detail: "Goals, context & requirements",
    },
    {
      number: "02",
      title: "Plan",
      description:
        "We define a clear direction, priorities, and practical next steps.",
      detail: "Scope, roadmap & structure",
    },
    {
      number: "03",
      title: "Create & Execute",
      description:
        "We turn the plan into carefully developed creative, digital, or operational solutions.",
      detail: "Design, build & operations",
    },
    {
      number: "04",
      title: "Refine & Support",
      description:
        "We review progress, make improvements, and support the next stage of work.",
      detail: "Review, iteration & continuity",
    },
  ] as ApproachStage[],
};

export const WHY_CONTENT = {
  eyebrow: "WHY SOLVINGODDS",
  headlineLines: ["Creative perspective.", "Practical solutions."],
  principles: [
    {
      number: "01",
      title: "Built Around Your Needs",
      description:
        "We begin with your goals instead of forcing every project into the same solution.",
    },
    {
      number: "02",
      title: "Clarity at Every Step",
      description:
        "We value straightforward communication and a process that is easy to follow.",
    },
    {
      number: "03",
      title: "Different Skills. One Direction.",
      description:
        "Our services bring together digital creativity, social media execution, and healthcare billing support.",
    },
  ] as PrincipleItem[],
  media: {
    src: "/images/home/team-brainstorming.webp",
    alt: "Team brainstorming in a meeting room",
    aspect: "3 / 4",
    credit: "Pexels",
    fallbackLabel: "Team brainstorming in a meeting room",
  } as MediaAsset,
};

export const FAQ_CONTENT = {
  eyebrow: "COMMON QUESTIONS",
  headlineLines: ["Good questions.", "Clear answers."],
  items: [
    {
      id: "faq-01",
      question: "What services does SolvingOdds provide?",
      answer:
        "SolvingOdds works across three dedicated areas: Web Design & Development, Social Media Services, and Medical Billing Services. Together, these pillars combine digital design and technical execution with brand communication and healthcare revenue cycle support.",
    },
    {
      id: "faq-02",
      question: "Can I hire SolvingOdds for just one service?",
      answer:
        "Yes. You can work with us on a single service—such as a website build, social media support, or a specific medical billing need—or combine services when your business benefits from a connected approach.",
    },
    {
      id: "faq-03",
      question: "Do you build custom and responsive websites?",
      answer:
        "Yes. We provide custom website design, web development, and e-commerce development tailored to your goals, with responsive layouts built to work smoothly across desktop, tablet, and mobile screens.",
    },
    {
      id: "faq-04",
      question: "What social media services do you offer?",
      answer:
        "Our social media services cover social media strategy, content creation, graphic design, and ongoing social media management to help brands communicate consistently and strengthen their online presence.",
    },
    {
      id: "faq-05",
      question: "Which medical billing services do you provide?",
      answer:
        "We support healthcare practices with provider credentialing and enrollment with government and commercial insurances, medical billing, claim creation and production, and accounts receivable (A/R) follow-up.",
    },
    {
      id: "faq-06",
      question: "How do we start a project?",
      answer:
        "Start a conversation and let us know what you are working on and which service you need. We begin by understanding your business and goals, then outline a clear plan and practical next steps before moving into execution.",
    },
  ] as FaqItem[],
};

export const FINAL_CTA_CONTENT = {
  eyebrow: "HAVE A PROJECT IN MIND?",
  headlineLines: ["Let's solve", "what's next."],
  description:
    "Whether you're building a website, strengthening your online presence, or looking for medical billing support, we'd love to hear what you're working on.",
  ctaLabel: "Start a Conversation",
};
