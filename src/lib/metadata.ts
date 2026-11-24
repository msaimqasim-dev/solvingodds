import type { Metadata } from "next";
import { BRAND, HERO_CONTENT } from "@/data/homepageContent";

export const siteUrl = new URL(BRAND.websiteUrl);

export function pageMetadata({ title, description, path, image = HERO_CONTENT.media.src }: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: BRAND.name, type: "website", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
