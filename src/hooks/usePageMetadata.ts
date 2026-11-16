import { useEffect } from "react";
import { BRAND } from "../data/homepageContent";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

export function usePageMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
}: PageMetadata) {
  useEffect(() => {
    document.title = title;
    const canonicalUrl = new URL(path, BRAND.websiteUrl).href;
    const setMeta = (
      attribute: "name" | "property",
      key: string,
      value: string,
    ) => {
      let node = document.head.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${key}"]`,
      );
      if (!node) {
        node = document.createElement("meta");
        node.setAttribute(attribute, key);
        document.head.append(node);
      }
      node.content = value;
    };
    setMeta("name", "description", description);
    setMeta("name", "robots", noIndex ? "noindex, follow" : "index, follow");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    if (image) {
      setMeta("property", "og:image", image);
      setMeta("name", "twitter:image", image);
    } else {
      document.head.querySelector('meta[property="og:image"]')?.remove();
      document.head.querySelector('meta[name="twitter:image"]')?.remove();
    }
    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;
  }, [title, description, path, image, noIndex]);
}
