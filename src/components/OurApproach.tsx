import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { APPROACH_CONTENT } from "../data/homepageContent";
import { prefersReducedMotion } from "../utils/smoothScroll";
import { EditorialTag } from "./ui/EditorialTag";

gsap.registerPlugin(ScrollTrigger);

export function OurApproach() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Heading line reveal
      gsap.fromTo(
        ".approach-line",
        { yPercent: 112 },
        {
          yPercent: 0,
          duration: 1.0,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".approach-header",
            start: "top 82%",
            once: true,
          },
        }
      );

      // Horizontal top bar draw
      gsap.fromTo(
        ".approach-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".approach-grid",
            start: "top 84%",
            once: true,
          },
        }
      );

      // Masked numeral entrances + staggered stage copy
      gsap.fromTo(
        ".approach-num",
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 0.95,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".approach-grid",
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".approach-card-body",
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".approach-grid",
            start: "top 78%",
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
      id="approach"
      data-surface="dark"
      aria-labelledby="approach-heading"
      className="so-section relative bg-[#151817] text-white"
    >
      <div className="so-container">
        {/* Header */}
        <div className="approach-header">
          <div className="flex items-center justify-between border-b border-white/14 pb-5">
            <EditorialTag tone="dark">{APPROACH_CONTENT.eyebrow}</EditorialTag>
            <span
              aria-hidden="true"
              className="hidden font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[#A8AEA8] sm:inline"
            >
              [01 — 04] PROCESS
            </span>
          </div>

          <h2
            id="approach-heading"
            className="heading-section mt-9 max-w-[21ch] text-white sm:mt-12"
          >
            {APPROACH_CONTENT.headlineLines.map((line, index) => (
              <span key={line} className="line-mask">
                <span className="approach-line line-inner">
                  {index === 1 ? (
                    <>
                      {line.slice(0, -1)}
                      <span className="text-[#B7F536]">.</span>
                    </>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* Four-Stage Editorial Architectural Sequence */}
        <div className="approach-grid mt-14 sm:mt-18 lg:mt-22">
          <div className="approach-rule divider-draw h-px w-full bg-white/15" />

          <ol className="grid grid-cols-1 divide-y divide-white/14 border-b border-white/14 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-white/14">
            {APPROACH_CONTENT.stages.map((stage, index) => {
              const isActive = activeIndex === index;
              // Tablet 2x2 subtle structural borders
              const tabletBorderClass =
                index % 2 === 1 ? "sm:border-l sm:border-white/14 lg:border-l-0" : "";
              const tabletTopClass =
                index >= 2 ? "sm:border-t sm:border-white/14 lg:border-t-0" : "";

              return (
                <li
                  key={stage.number}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`group relative flex flex-col justify-between py-9 transition-colors duration-500 sm:p-8 lg:min-h-[23rem] lg:px-7 lg:py-10 ${tabletBorderClass} ${tabletTopClass} ${
                    isActive ? "bg-[#242824]/65" : "bg-transparent hover:bg-[#242824]/35"
                  }`}
                >
                  {/* Active Parrot-Green Top Indicator Line */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-[#B7F536] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />

                  {/* Stage Display Numeral + Micro Label */}
                  <div className="flex items-start justify-between gap-4">
                    <span className="line-mask">
                      <span
                        className={`approach-num line-inner font-display type-step font-semibold leading-[0.92] tracking-[-0.045em] transition-colors duration-300 ${
                          isActive ? "text-[#B7F536]" : "text-white/40 group-hover:text-white/65"
                        }`}
                      >
                        {stage.number}
                      </span>
                    </span>

                    <span className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-[#A8AEA8]">
                      STAGE {stage.number}
                    </span>
                  </div>

                  {/* Stage Title + Description */}
                  <div className="approach-card-body mt-10 lg:mt-14">
                    <h3 className="font-display text-[1.45rem] font-semibold leading-[1.15] tracking-[-0.025em] text-white sm:text-[1.6rem]">
                      {stage.title}
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-[1.62] text-[#A8AEA8] transition-colors duration-300 group-hover:text-white/82">
                      {stage.description}
                    </p>
                    <p className="mt-6 border-t border-white/10 pt-3 font-mono text-[0.68rem] uppercase tracking-[0.13em] text-[#A8AEA8]">
                      {stage.detail}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
