import { pageMetadata } from "@/lib/metadata";
import { About } from "@/screens/About";
import { ABOUT_PAGE } from "@/data/about";

export const metadata = pageMetadata({
  ...ABOUT_PAGE.seo,
  path: "/about",
  image: ABOUT_PAGE.hero.image.src,
});

export default About;
