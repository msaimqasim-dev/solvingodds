import { Hero } from "../components/Hero";
import { AboutIntro } from "../components/AboutIntro";
import { ServicesShowcase } from "../components/ServicesShowcase";
import { SelectedWork } from "../components/SelectedWork";
import { OurApproach } from "../components/OurApproach";
import { WhySolvingOdds } from "../components/WhySolvingOdds";
import { FAQ } from "../components/FAQ";
import { FinalCTA } from "../components/FinalCTA";

export function Home() {
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
