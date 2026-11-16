import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_CONTENT } from "../data/homepageContent";
import { prefersReducedMotion, scrollToAnchor } from "../utils/smoothScroll";
import { EditorialImage } from "./ui/EditorialImage";
import { EditorialTag } from "./ui/EditorialTag";
import { KineticButton } from "./ui/KineticButton";
import { SiteLink } from "./ui/SiteLink";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgMediaRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect so the entrance timeline is set before first paint (no flash).
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Master initial page-load entrance choreography
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      if (bgMediaRef.current) {
        tl.fromTo(
          bgMediaRef.current,
          { scale: 1.12, opacity: 0.55 },
          { scale: 1.02, opacity: 1, duration: 1.75, ease: "power2.out" },
          0
        );
      }

      tl.fromTo(
        ".hero-meta",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.08 },
        0.15
      )
        .fromTo(
          ".hero-line",
          { yPercent: 112 },
          { yPercent: 0, duration: 1.05, stagger: 0.11, ease: "power4.out" },
          0.26
        )
        .fromTo(
          ".hero-body",
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, stagger: 0.1 },
          0.58
        )
        .fromTo(
          ".hero-divider",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.0, ease: "expo.out" },
          0.65
        )
        .fromTo(
          ".hero-pillar",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
          0.78
        );

      // Subtle scroll parallax into next section (lighter on mobile)
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      if (bgMediaRef.current && isDesktop) {
        gsap.to(bgMediaRef.current, {
          yPercent: 15,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      data-surface="dark"
      aria-label="Hero"
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-[#151817] text-white"
    >
      {/* Full-Bleed Architectural Background Media */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div ref={bgMediaRef} className="h-full w-full will-change-transform">
          <EditorialImage
            src={HERO_CONTENT.media.src}
            alt=""
            fallbackLabel={HERO_CONTENT.media.fallbackLabel}
            priority
            className="h-full w-full"
            imgClassName="object-center contrast-[1.04]"
          />
        </div>

        {/* Directional Dark Overlay for High Text Contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(21,24,23,0.72) 0%, rgba(21,24,23,0.52) 42%, rgba(21,24,23,0.88) 84%, rgba(21,24,23,0.98) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(21,24,23,0.72) 0%, rgba(21,24,23,0.22) 65%, rgba(21,24,23,0.45) 100%)",
          }}
        />
      </div>

      {/* Main Hero Content */}
      <div className="so-container relative z-10 flex flex-1 flex-col justify-end pt-28 pb-10 sm:pt-36 sm:pb-12 lg:pt-40 lg:pb-14">
        {/* Eyebrow + Stodio-Inspired Minimal Technical Label */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="hero-meta">
            <EditorialTag tone="dark">{HERO_CONTENT.eyebrow}</EditorialTag>
          </div>
          <p
            aria-hidden="true"
            className="hero-meta hidden items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/50 sm:inline-flex"
          >
            <span className="text-[#B7F536]">+</span>
            <span>SOLVINGODDS / [01—03]</span>
          </p>
        </div>

        {/* Oversized Editorial Headline (Single H1 on Page) */}
        <h1 className="heading-hero mt-6 max-w-[18ch] text-white sm:mt-7">
          {HERO_CONTENT.headlineLines.map((line, index) => (
            <span key={line} className="line-mask">
              <span className="hero-line line-inner">
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
        </h1>

        {/* Supporting Copy + Dual CTAs */}
        <div className="mt-8 grid gap-7 sm:mt-10 lg:mt-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <p className="hero-body type-lead max-w-xl leading-[1.55] text-white/82 lg:col-span-6">
            {HERO_CONTENT.description}
          </p>

          <div className="hero-body flex flex-wrap items-center gap-3.5 lg:col-span-6 lg:justify-end">
            <KineticButton
              label={HERO_CONTENT.primaryCta.label}
              href={HERO_CONTENT.primaryCta.href}
              variant="accent"
              size="md"
            />
            <KineticButton
              label={HERO_CONTENT.secondaryCta.label}
              href={HERO_CONTENT.secondaryCta.href}
              variant="outlineOnDark"
              size="md"
            />
          </div>
        </div>
      </div>

      {/* Bottom Service Pillars Strip & Scroll Cue */}
      <div className="so-container relative z-10 pb-6 sm:pb-8">
        <div className="hero-divider divider-draw h-px w-full bg-white/18" />

        <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <ul
            aria-label="Core service pillars"
            className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-6 lg:gap-10"
          >
            {HERO_CONTENT.serviceLabels.map((pillar) => (
              <li key={pillar.number} className="hero-pillar">
                <SiteLink
                  href={pillar.href}
                  className="group inline-flex items-center gap-2.5 py-0.5 text-[0.78rem] tracking-[0.01em] text-[#A8AEA8] transition-colors duration-200 hover:text-white"
                >
                  <span className="font-mono text-[0.7rem] text-[#B7F536]">
                    [{pillar.number}]
                  </span>
                  <span className="font-medium transition-transform duration-300 group-hover:translate-x-0.5">
                    {pillar.label}
                  </span>
                </SiteLink>
              </li>
            ))}
          </ul>

          <a
            href="#about"
            aria-label="Scroll to agency introduction"
            onClick={(e) => scrollToAnchor("#about", e)}
            className="hero-pillar hidden items-center gap-3 self-end text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#A8AEA8] transition-colors hover:text-white lg:inline-flex"
          >
            <span>Scroll</span>
            <span
              aria-hidden="true"
              className="relative h-6 w-px overflow-hidden bg-white/20"
            >
              <span className="animate-scroll-line block h-full w-full bg-[#B7F536]" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
