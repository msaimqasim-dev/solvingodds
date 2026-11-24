import type { MetadataRoute } from "next";
import { SERVICE_LIST, servicePath } from "@/data/services";
import { siteUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/services", ...SERVICE_LIST.map(({ slug }) => servicePath(slug)), "/about", "/contact"];
  return paths.map((path) => ({ url: new URL(path, siteUrl).href }));
}
