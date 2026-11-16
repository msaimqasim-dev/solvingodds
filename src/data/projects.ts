export interface DemoProject {
  id: string;
  index: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  imageAlt: string;
  imageCredit: string;
  fallbackLabel: string;
  /**
   * Verified external live website URL (must begin with https:// or http://).
   * Leave as "" until the real demo URL is confirmed so the card remains
   * cleanly inactive rather than linking to "#" or an unverified domain.
   */
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
  note: "Portfolio demonstration concepts showcasing our approach to web design and frontend execution. Live external links activate automatically as each demo URL is added.",
};

/**
 * Centralized Homepage Selected Work data (3 demo website projects).
 *
 * CONFIGURATION NEEDED:
 * - Replace each empty `liveUrl` ("") with the verified external demo URL.
 * - Replace each temporary Pexels `image` and `imageAlt` with an actual screenshot
 *   of the deployed demo website (e.g. "/images/projects/project-01.jpg").
 * - Update `title` and `summary` if the deployed demo uses a different name.
 */
export const DEMO_PROJECTS: DemoProject[] = [
  {
    id: "project-01",
    index: "01",
    title: "Kestrel Architectural Practice", // Confirm against final demo 01 title
    category: "Web Design & Development",
    summary:
      "An editorial architecture website concept focused on spatial grid structure, calm typographic hierarchy, and fluid responsive browsing.",
    image:
      "https://images.pexels.com/photos/31172528/pexels-photo-31172528.jpeg?auto=compress&cs=tinysrgb&w=1800", // Temporary image — replace with Demo 01 website screenshot
    imageAlt:
      "Minimalist curved architectural interior representing the Kestrel Architectural Practice concept website preview",
    imageCredit: "Pexels / RUI YANG",
    fallbackLabel: "Concept Project 01 — Web Design & Development",
    liveUrl: "", // MISSING: Add verified external live URL for project-01
    type: "Concept Project",
    featured: true,
  },
  {
    id: "project-02",
    index: "02",
    title: "Forma Everyday Objects", // Confirm against final demo 02 title
    category: "Web Design & Development",
    summary:
      "A modern storefront concept pairing restrained product presentation, clear navigation, and responsive frontend interactions.",
    image:
      "https://images.pexels.com/photos/6446678/pexels-photo-6446678.jpeg?auto=compress&cs=tinysrgb&w=1800", // Temporary image — replace with Demo 02 website screenshot
    imageAlt:
      "Minimalist laptop and sculpted ceramic vessel on a natural wood studio table representing the Forma Everyday Objects concept website",
    imageCredit: "Pexels / gravity cut",
    fallbackLabel: "Concept Project 02 — Web Design & Development",
    liveUrl: "", // MISSING: Add verified external live URL for project-02
    type: "Concept Project",
  },
  {
    id: "project-03",
    index: "03",
    title: "Solstice Stoneware & Roast", // Confirm against final demo 03 title
    category: "Web Design & Development",
    summary:
      "A hospitality and craft goods website concept combining editorial storytelling, structured menus, and mobile-first usability.",
    image:
      "https://images.pexels.com/photos/8533387/pexels-photo-8533387.jpeg?auto=compress&cs=tinysrgb&w=1800", // Temporary image — replace with Demo 03 website screenshot
    imageAlt:
      "Clean daylight desk setup with a modern laptop, ceramic mug, and botanical vase representing the Solstice Stoneware & Roast concept website",
    imageCredit: "Pexels / Hanna Pad",
    fallbackLabel: "Concept Project 03 — Web Design & Development",
    liveUrl: "", // MISSING: Add verified external live URL for project-03
    type: "Concept Project",
  },
];
