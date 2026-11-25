export interface DemoProject {
  id: string;
  index: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  imageAlt: string;
  fallbackLabel: string;
  liveUrl: string;
  type: "Concept Project";
  featured?: boolean;
}

export function getValidExternalProjectUrl(liveUrl: string): string | null {
  const trimmed = liveUrl.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "https:" || parsed.protocol === "http:") {
      return parsed.href;
    }
    return null;
  } catch {
    return null;
  }
}

export const SELECTED_WORK_SECTION = {
  eyebrow: "SELECTED WORK",
  headlineLines: ["A little of what", "we can create."],
  description:
    "A selection of website concepts exploring creative design, thoughtful user experiences, and modern frontend development.",
  metaLabel: "CONCEPT PROJECTS (03)",
  note: "Explore the live concept websites to see our approach to web design and frontend development.",
};

export const DEMO_PROJECTS: DemoProject[] = [
  {
    id: "project-01",
    index: "01",
    title: "MAVRYO",
    category: "Web Design & Development",
    summary:
      "A creative agency concept with a responsive service and work showcase, editorial case studies, and an interactive website audit demo.",
    image: "/images/projects/mavryo.webp",
    imageAlt:
      "MAVRYO desktop and mobile homepages showing the agency headline and interactive audit demo",
    fallbackLabel: "MAVRYO concept website",
    liveUrl: "https://mavryo.vercel.app/",
    type: "Concept Project",
    featured: true,
  },
  {
    id: "project-02",
    index: "02",
    title: "Meridian Estate",
    category: "Web Design & Development",
    summary:
      "A boutique Lahore property studio concept with an editorial property gallery, featured listings, advisory services, and a viewing inquiry flow.",
    image: "/images/projects/meridian-estate.webp",
    imageAlt:
      "Meridian Estate desktop and mobile homepages showing an architectural photo gallery and property browsing action",
    fallbackLabel: "Meridian Estate concept website",
    liveUrl: "https://meridianestate.vercel.app/",
    type: "Concept Project",
  },
  {
    id: "project-03",
    index: "03",
    title: "LittleCare",
    category: "Web Design & Development",
    summary:
      "A pediatric clinic concept that helps families explore care services, meet the sample care team, prepare for a visit, and find the appointment inquiry form.",
    image: "/images/projects/littlecare.webp",
    imageAlt:
      "LittleCare desktop and mobile homepages showing pediatric care information and an appointment inquiry action",
    fallbackLabel: "LittleCare concept website",
    liveUrl: "https://littlecareweb.vercel.app/",
    type: "Concept Project",
  },
];
