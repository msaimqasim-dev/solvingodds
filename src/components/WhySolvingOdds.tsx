import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WHY_CONTENT } from "../data/homepageContent";
import { prefersReducedMotion } from "../utils/smoothScroll";
import { EditorialImage } from "./ui/EditorialImage";
import { EditorialTag } from "./ui/EditorialTag";

gsap.registerPlugin(ScrollTrigger);

export function WhySolvingOdds() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Section headline masked reveal
      gsap.fromTo(
        ".why-line",
        { yPercent: 112 },
        {
          yPercent: 0,
          duration: 1.0,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".why-header",
            start: "top 82%",
            once: true,
          },
        }
      );

      // Anchor image curtain reveal + subtle internal parallax
      gsap.fromTo(
        ".why-visual-clip",
        { clipPath: "inset(14% 0% 0% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".why-visual-clip",
            start: "top 84%",
            once: true,
          },
        }
      );

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          ".why-visual-img",
          { scale: 1.12, yPercent: -5 },
          {
            scale: 1.12,
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: ".why-visual-clip",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          }
        );
      });

      // Principle items + divider draws
      const items = gsap.utils.toArray<HTMLElement>(".why-principle");
      items.forEach((item) => {
        const divider = item.querySelector<HTMLElement>(".why-rule");
        const body = item.querySelector<HTMLElement>(".why-principle-body");

        if (divider) {
          gsap.fromTo(
            divider,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.0,
              ease: "expo.out",
              scrollTrigger: {
                trigger: item,
                start: "top 86%",
                once: true,
              },
            }
          );
        }

        if (body) {
          gsap.fromTo(
            body,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 84%",
                once: true,
              },
            }
          );
        }
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-solvingodds"
      data-surface="light"
      aria-labelledby="why-heading"
      className="so-section relative bg-[#F6F7F2] text-[#151817]"
    >
      <div className="so-container">
        {/* Header */}
        <div className="why-header">
          <div className="flex items-center justify-between border-b border-[#151817]/13 pb-5">
            <EditorialTag tone="light">{WHY_CONTENT.eyebrow}</EditorialTag>
            <span
              aria-hidden="true"
              className="hidden font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[#525852] sm:inline"
            >
              CORE PRINCIPLES
            </span>
          </div>

          <h2
            id="why-heading"
            className="heading-section mt-9 max-w-[21ch] text-[#151817] sm:mt-12"
          >
            {WHY_CONTENT.headlineLines.map((line) => (
              <span key={line} className="line-mask">
                <span className="why-line line-inner">{line}</span>
              </span>
            ))}
          </h2>
        </div>

        {/* Asymmetric Visual + Bold Typographic Principles */}
        <div className="mt-14 grid grid-cols-1 gap-12 sm:mt-18 lg:mt-22 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Left Sticky Editorial Visual */}
          <figure className="lg:sticky lg:top-28 lg:col-span-5">
            <div className="why-visual-clip overflow-hidden rounded-[2px]">
              <EditorialImage
                src={WHY_CONTENT.media.src}
                alt={WHY_CONTENT.media.alt}
                fallbackLabel={WHY_CONTENT.media.fallbackLabel}
                tone="light"
                className="aspect-[4/5] w-full sm:aspect-[16/11] lg:aspect-[3/4]"
                imgClassName="why-visual-img will-change-transform"
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-between border-t border-[#151817]/13 pt-2.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#525852]">
              <span>SOLVINGODDS</span>
              <span>PERSPECTIVE &amp; EXECUTION</span>
            </figcaption>
          </figure>

          {/* Right Typographic Ledger */}
          <div className="lg:col-span-6 lg:col-start-7">
            {WHY_CONTENT.principles.map((principle) => (
              <div
                key={principle.number}
                className="why-principle group pb-10 sm:pb-14 lg:pb-16"
              >
                <div className="why-rule divider-draw h-px w-full bg-[#151817]/16 transition-colors duration-300 group-hover:bg-[#151817]" />

                <div className="why-principle-body pt-8 sm:pt-10">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-[1px] bg-[#B7F536] ring-1 ring-[#151817]/25"
                    />
                    <span className="font-mono text-xs font-medium tracking-[0.12em] text-[#525852]">
                      PRINCIPLE {principle.number}
                    </span>
                  </div>

                  <h3 className="font-display mt-4 text-[clamp(1.65rem,3vw,2.55rem)] font-semibold leading-[1.08] tracking-[-0.032em] text-[#151817]">
                    {principle.title}
                  </h3>

                  <p className="type-lead mt-4 max-w-lg leading-[1.6] text-[#151817]/78">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="h-px w-full bg-[#151817]/16" />
          </div>
        </div>
      </div>
    </section>
  );
}
