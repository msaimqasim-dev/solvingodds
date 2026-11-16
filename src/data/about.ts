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
      src: "https://images.pexels.com/photos/39863282/pexels-photo-39863282.jpeg?auto=compress&cs=tinysrgb&w=1800",
      alt: "Sunlit modern architectural interior with geometric skylight beams casting crisp shadows across quiet walls",
      aspect: "21 / 9",
      credit: "Pexels / Adrien Olichon",
      fallbackLabel: "SolvingOdds Architectural Perspective",
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
      src: "https://images.pexels.com/photos/32510767/pexels-photo-32510767.jpeg?auto=compress&cs=tinysrgb&w=1400",
      alt: "Minimalist architectural corridor shaped by clean geometry, warm directional light, and balanced shadow",
      aspect: "4 / 5",
      credit: "Pexels / Can Ceylan",
      fallbackLabel: "Architectural Form & Light",
    } as MediaAsset,
    secondaryImage: {
      src: "https://images.pexels.com/photos/4466711/pexels-photo-4466711.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Minimalist concrete passageway illuminated by measured lines of natural daylight",
      aspect: "16 / 10",
      credit: "Pexels / Andreas Maier",
      fallbackLabel: "Clarity & Direction",
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
          src: "https://images.pexels.com/photos/7172661/pexels-photo-7172661.jpeg?auto=compress&cs=tinysrgb&w=1400",
          alt: "Dark design studio workspace with dual monitors prepared for website design and frontend development",
          aspect: "16 / 10",
          credit: "Pexels / Matheus Bertelli",
          fallbackLabel: "Web Design & Development",
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
          src: "https://images.pexels.com/photos/15977090/pexels-photo-15977090.jpeg?auto=compress&cs=tinysrgb&w=1400",
          alt: "Camera, lenses, digital tablet, and laptop arranged for creative social media content production",
          aspect: "16 / 10",
          credit: "Pexels / Kawê Rodrigues",
          fallbackLabel: "Social Media Services",
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
          src: "https://images.pexels.com/photos/10376254/pexels-photo-10376254.jpeg?auto=compress&cs=tinysrgb&w=1400",
          alt: "Overhead view of structured administrative records, laptop, and tablet on an organized desk",
          aspect: "16 / 10",
          credit: "Pexels / RDNE Stock project",
          fallbackLabel: "Medical Billing Services",
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
      src: "https://images.pexels.com/photos/7870751/pexels-photo-7870751.jpeg?auto=compress&cs=tinysrgb&w=1400",
      alt: "Minimalist sunlit interior column casting quiet directional shadows across a clean architectural surface",
      aspect: "4 / 3",
      credit: "Pexels / cottonbro studio",
      fallbackLabel: "Considered Way Forward",
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
