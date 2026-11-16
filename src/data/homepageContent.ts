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
    src: "https://images.pexels.com/photos/18820283/pexels-photo-18820283.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Minimalist dark architectural interior illuminated by crisp natural window light and geometric shadow",
    aspect: "16 / 9",
    credit: "Pexels / Aleksandar Spasojevic",
    fallbackLabel: "Architectural Light Study",
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
        src: "https://images.pexels.com/photos/33682091/pexels-photo-33682091.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        alt: "Minimalist concrete architectural wall with angular natural skylight shadows",
        aspect: "3 / 4",
        credit: "Pexels / James Collington",
        fallbackLabel: "Editorial Architecture 01",
      },
    },
    {
      id: "gallery-02",
      code: "FIG. 02",
      caption: "Thoughtful digital interfaces",
      discipline: "Web Design & Development",
      parallaxSpeed: 22,
      media: {
        src: "https://images.pexels.com/photos/12882908/pexels-photo-12882908.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        alt: "Modern minimalist laptop arranged on sculpted stone inside a quiet design studio",
        aspect: "16 / 10",
        credit: "Pexels / Leonid Altman",
        fallbackLabel: "Digital Interface Studio 02",
      },
    },
    {
      id: "gallery-03",
      code: "FIG. 03",
      caption: "Visual content production",
      discipline: "Social Media Services",
      parallaxSpeed: -18,
      media: {
        src: "https://images.pexels.com/photos/33714923/pexels-photo-33714923.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        alt: "Creative production studio with directional lighting and photography equipment during an editorial shoot",
        aspect: "4 / 3",
        credit: "Pexels / Matheus Bertelli",
        fallbackLabel: "Content Production Studio 03",
      },
    },
    {
      id: "gallery-04",
      code: "FIG. 04",
      caption: "Organized operational workflows",
      discipline: "Medical Billing Support",
      parallaxSpeed: 26,
      media: {
        src: "https://images.pexels.com/photos/8296953/pexels-photo-8296953.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        alt: "Neatly organized administrative workspace featuring a laptop, calculator, and structured billing documents",
        aspect: "16 / 10",
        credit: "Pexels / Mikhail Nilov",
        fallbackLabel: "Administrative Workspace 04",
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
        src: "https://images.pexels.com/photos/7172661/pexels-photo-7172661.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        alt: "Modern dark studio desk with dual widescreen monitors arranged for website design and development",
        aspect: "16 / 10",
        credit: "Pexels / Matheus Bertelli",
        fallbackLabel: "Web Design & Development",
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
        src: "https://images.pexels.com/photos/15977090/pexels-photo-15977090.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        alt: "Monochromatic creative production setup with camera, lenses, tablet, and laptop for social content creation",
        aspect: "16 / 10",
        credit: "Pexels / Kawê Rodrigues",
        fallbackLabel: "Social Media Services",
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
        src: "https://images.pexels.com/photos/10376254/pexels-photo-10376254.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        alt: "Overhead view of a specialist reviewing structured administrative records with a laptop and tablet at an organized desk",
        aspect: "16 / 10",
        credit: "Pexels / RDNE Stock project",
        fallbackLabel: "Medical Billing Services",
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
    src: "https://images.pexels.com/photos/35399293/pexels-photo-35399293.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Minimalist concrete architectural staircase defined by crisp directional light and balanced geometry",
    aspect: "3 / 4",
    credit: "Pexels / Liuuu _61",
    fallbackLabel: "Architectural Perspective",
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
