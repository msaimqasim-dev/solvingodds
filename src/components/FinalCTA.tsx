import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contactPath } from "../data/contact";
import { FINAL_CTA_CONTENT, SERVICES_CONTENT } from "../data/homepageContent";
import { prefersReducedMotion } from "../utils/smoothScroll";
import { EditorialTag } from "./ui/EditorialTag";
import { KineticButton } from "./ui/KineticButton";
import { SiteLink } from "./ui/SiteLink";

gsap.registerPlugin(ScrollTrigger);

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.05,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".cta-line",
        { yPercent: 112 },
        {
          yPercent: 0,
          duration: 1.05,
          stagger: 0.11,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".cta-fade",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-surface="accent"
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden bg-[#B7F536] py-[clamp(5.5rem,11vw,10rem)] text-[#151817]"
    >
      <div className="so-container">
        {/* Top Architectural Metadata Bar */}
        <div className="flex items-center justify-between pb-5">
          <EditorialTag tone="accent">{FINAL_CTA_CONTENT.eyebrow}</EditorialTag>
          <span
            aria-hidden="true"
            className="hidden font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-[#151817]/65 sm:inline"
          >
            + SOLVINGODDS.COM
          </span>
        </div>
        <div className="cta-rule divider-draw h-px w-full bg-[#151817]/22" />

        {/* Monumental Closing Headline */}
        <h2
          id="final-cta-heading"
          className="font-display mt-10 text-[clamp(2.85rem,8vw,7.4rem)] font-semibold leading-[0.94] tracking-[-0.044em] text-[#151817] sm:mt-14"
        >
          {FINAL_CTA_CONTENT.headlineLines.map((line) => (
            <span key={line} className="line-mask">
              <span className="cta-line line-inner">{line}</span>
            </span>
          ))}
        </h2>

        {/* Supporting Copy + Obvious High-Contrast Charcoal CTA */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-14 lg:grid-cols-12 lg:items-end">
          <p className="cta-fade type-lead max-w-xl leading-[1.58] text-[#151817]/86 lg:col-span-6">
            {FINAL_CTA_CONTENT.description}
          </p>

          <div className="cta-fade flex flex-wrap items-center gap-4 lg:col-span-6 lg:justify-end">
            <KineticButton
              label={FINAL_CTA_CONTENT.ctaLabel}
              href="/contact"
              variant="dark"
              size="lg"
            />
          </div>
        </div>

        {/* Direct Service Pillar Selector Bar */}
        <div className="cta-fade mt-14 border-t border-[#151817]/20 pt-6 sm:mt-18">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-[#151817]/65">
              SELECT A FOCUS TO BEGIN
            </span>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {SERVICES_CONTENT.items.map((service) => (
                <SiteLink
                  key={service.id}
                  href={contactPath(service.id)}
                  className="editorial-link inline-flex items-center gap-2 py-0.5 text-[0.82rem] font-medium text-[#151817]"
                >
                  <span className="font-mono text-[0.7rem] text-[#151817]/65">
                    [{service.number}]
                  </span>
                  <span>{service.title}</span>
                </SiteLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
