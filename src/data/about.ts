import type { MediaAsset } from "./homepageContent";
import { servicePath } from "./services";

export interface AboutExpertiseItem {
  number: string;
  slug: string;
  title: string;
  discipline: string;
  description: string;
  href: string;
  image: MediaAsset;
}

export interface AboutPrinciple {
  number: string;
  title: string;
  description: string;
}

export interface AboutApproachStage {
  number: string;
  title: string;
  description: string;
  cue: string;
}

export const ABOUT_PAGE = {
  seo: {
    title: "About Us | SolvingOdds",
    description:
      "SolvingOdds brings together website design and development, social media services, and medical billing support with clarity, creativity, and practical purpose.",
  },
  hero: {
    eyebrow: "ABOUT SOLVINGODDS",
    headlineLines: ["Different perspectives.", "One purpose."],
    description:
      "SolvingOdds brings together creative digital services and specialized business support to help organizations address challenges with clarity, creativity, and practical solutions.",
    image: {
      src: "/images/about/hero-creative-team.webp",
      alt: "Creative team meeting in a modern studio",
      aspect: "21 / 9",
      credit: "Pexels",
      fallbackLabel: "Creative team meeting in a modern studio",
    } as MediaAsset,
  },
  story: {
    eyebrow: "OUR STORY",
    headlineLines: ["Built around solving", "what matters."],
    paragraphs: [
      "SolvingOdds is an agency bringing together website design and development, social media services, and medical billing support.",
      "Our approach starts with understanding what a business needs. From there, we focus on creating clear, purposeful solutions rather than making things unnecessarily complicated.",
    ],
    primaryImage: {
      src: "/images/about/story-brainstorming.webp",
      alt: "Person arranging ideas on a wall of sticky notes",
      aspect: "4 / 5",
      credit: "Pexels",
      fallbackLabel: "Person arranging ideas on a wall of sticky notes",
    } as MediaAsset,
    secondaryImage: {
      src: "/images/about/story-collaboration.webp",
      alt: "Colleagues brainstorming together",
      aspect: "16 / 10",
      credit: "Pexels",
      fallbackLabel: "Colleagues brainstorming together",
    } as MediaAsset,
  },
  expertise: {
    eyebrow: "OUR EXPERTISE",
    headlineLines: ["Different disciplines.", "Shared direction."],
    items: [
      {
        number: "01",
        slug: "web-design-development",
        title: "Web Design & Development",
        discipline: "DIGITAL EXPERIENCES",
        description:
          "Digital experiences that combine thoughtful design, intuitive usability, and modern development.",
        href: servicePath("web-design-development"),
        image: {
          src: "/images/about/expertise-web-development.webp",
          alt: "Person using a desktop computer and laptop",
          aspect: "16 / 10",
          credit: "Pexels",
          fallbackLabel: "Person using a desktop computer and laptop",
        },
      },
      {
        number: "02",
        slug: "social-media-services",
        title: "Social Media Services",
        discipline: "BRAND COMMUNICATION",
        description:
          "Creative content, visual communication, and social media management for a consistent online presence.",
        href: servicePath("social-media-services"),
        image: {
          src: "/images/about/expertise-social-production.webp",
          alt: "Film crew working behind the scenes",
          aspect: "16 / 10",
          credit: "Pexels",
          fallbackLabel: "Film crew working behind the scenes",
        },
      },
      {
        number: "03",
        slug: "medical-billing",
        title: "Medical Billing Services",
        discipline: "REVENUE CYCLE SUPPORT",
        description:
          "Administrative revenue cycle support covering provider enrollment, billing, claim production, and accounts receivable work.",
        href: servicePath("medical-billing"),
        image: {
          src: "/images/about/expertise-billing-documents.webp",
          alt: "Person holding paperwork",
          aspect: "16 / 10",
          credit: "Pexels",
          fallbackLabel: "Person holding paperwork",
        },
      },
    ] as AboutExpertiseItem[],
  },
  principles: {
    eyebrow: "OUR PRINCIPLES",
    headlineLines: ["Thoughtful work starts", "with a clear direction."],
    items: [
      {
        number: "01",
        title: "Clarity",
        description:
          "We believe good solutions begin with understanding the challenge and communicating clearly.",
      },
      {
        number: "02",
        title: "Creativity",
        description:
          "We bring thoughtful ideas and fresh perspectives to the work we do.",
      },
      {
        number: "03",
        title: "Purpose",
        description:
          "We focus on solutions that fit the needs of the people and businesses we support.",
      },
    ] as AboutPrinciple[],
  },
  approach: {
    eyebrow: "HOW WE THINK",
    headlineLines: ["A simpler way", "forward."],
    intro:
      "Whether a project involves building a website, shaping social communication, or organizing healthcare billing workflows, our work follows four grounded stages.",
    image: {
      src: "/images/about/approach-planning.webp",
      alt: "Technical plan beside a tablet and laptop",
      aspect: "4 / 3",
      credit: "Pexels",
      fallbackLabel: "Technical plan beside a tablet and laptop",
    } as MediaAsset,
    stages: [
      {
        number: "01",
        title: "Listen & Understand",
        description:
          "We begin by listening closely to your goals, existing setup, and the specific challenge you want to address.",
        cue: "Context & Goals",
      },
      {
        number: "02",
        title: "Explore & Plan",
        description:
          "We weigh practical approaches, define the scope together, and set out clear priorities and next steps.",
        cue: "Direction & Scope",
      },
      {
        number: "03",
        title: "Create & Execute",
        description:
          "We move into focused delivery—designing, developing, producing content, or supporting agreed billing workflows.",
        cue: "Focused Delivery",
      },
      {
        number: "04",
        title: "Refine & Support",
        description:
          "We review the work carefully, adjust where needed, and stay aligned as your priorities evolve.",
        cue: "Review & Continuity",
      },
    ] as AboutApproachStage[],
  },
  cta: {
    eyebrow: "WORK WITH US",
    headlineLines: ["Let's build something", "meaningful."],
    description:
      "Have a challenge, an idea, or a project in mind? Tell us what you're working on.",
    label: "Let's Talk",
    href: "/contact",
  },
};
