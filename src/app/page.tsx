import { pageMetadata } from "@/lib/metadata";
import { Home } from "@/screens/Home";
import { HERO_CONTENT } from "@/data/homepageContent";

export const metadata = pageMetadata({
    title: "SolvingOdds — Creative, Digital & Business Support Agency",
    description:
      "SolvingOdds designs and develops custom websites, helps brands grow their social presence, and supports healthcare practices with medical billing solutions.",
    path: "/",
    image: HERO_CONTENT.media.src,
  });

export default Home;
