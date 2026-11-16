import { HERO_CONTENT } from "../data/homepageContent";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { Hero } from "../components/Hero";
import { AboutIntro } from "../components/AboutIntro";
import { ServicesShowcase } from "../components/ServicesShowcase";
import { SelectedWork } from "../components/SelectedWork";
import { OurApproach } from "../components/OurApproach";
import { WhySolvingOdds } from "../components/WhySolvingOdds";
import { FAQ } from "../components/FAQ";
import { FinalCTA } from "../components/FinalCTA";

export function Home() {
  usePageMetadata({
    title: "SolvingOdds — Creative, Digital & Business Support Agency",
    description:
      "SolvingOdds designs and develops custom websites, helps brands grow their social presence, and supports healthcare practices with medical billing solutions.",
    path: "/",
    image: HERO_CONTENT.media.src,
  });

  return (
    <>
      <Hero />
      <AboutIntro />
      <ServicesShowcase />
      <SelectedWork />
      <OurApproach />
      <WhySolvingOdds />
      <FAQ />
      <FinalCTA />
    </>
  );
}
