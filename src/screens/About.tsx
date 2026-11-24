"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT_PAGE } from "../data/about";
import { useEditorialMotion } from "../hooks/useEditorialMotion";
import { EditorialHeading } from "../components/services/EditorialHeading";
import { ServiceCTA } from "../components/services/ServiceCTA";
import { EditorialImage } from "../components/ui/EditorialImage";
import { EditorialTag } from "../components/ui/EditorialTag";
import { KineticButton } from "../components/ui/KineticButton";
import { SiteLink } from "../components/ui/SiteLink";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [hoveredDiscipline, setHoveredDiscipline] = useState<string | null>(
    null,
  );
  const [activeStage, setActiveStage] = useState<number>(0);

  useEditorialMotion(pageRef);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo(
            ".about-hero-meta",
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
            0.1,
          )
          .fromTo(
            ".about-hero-line",
            { yPercent: 112 },
            { yPercent: 0, duration: 1.08, stagger: 0.11, ease: "power4.out" },
            0.2,
          )
          .fromTo(
            ".about-hero-rule",
            { scaleX: 0 },
            { scaleX: 1, duration: 1.0, ease: "expo.out" },
            0.48,
          )
          .fromTo(
            ".about-hero-copy",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.85, stagger: 0.1 },
            0.55,
          )
          .fromTo(
            ".about-hero-frame",
            { clipPath: "inset(10% 0% 0% 0%)", opacity: 0.35 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              duration: 1.2,
              ease: "power4.out",
            },
            0.5,
          )
          .fromTo(
            ".about-hero-image-inner",
            { scale: 1.1 },
            { scale: 1.03, duration: 1.6, ease: "power2.out" },
            0.5,
          );
      });

      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            ".about-hero-image-inner",
            { yPercent: -3 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: ".about-hero-frame",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
              },
            },
          );
        },
      );
    }, hero);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  const { hero, story, expertise, principles, approach, cta } = ABOUT_PAGE;

  return (
    <div ref={pageRef} className="services-page" data-page="about">
      {/* SECTION 01 — Editorial Hero */}
      <section
        ref={heroRef}
        id="page-top"
        data-surface="dark"
        aria-labelledby="page-heading"
        className="relative overflow-hidden bg-[#151817] pt-28 pb-16 text-white sm:pt-36 sm:pb-22 lg:pt-40 lg:pb-26"
      >
        <div className="so-container">
          <nav
            aria-label="Breadcrumb"
            className="about-hero-meta service-breadcrumb"
          >
            <ol>
              <li>
                <SiteLink href="/" className="inline-block py-1">
                  Home
                </SiteLink>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span aria-current="page">About Us</span>
              </li>
            </ol>
          </nav>

          <div className="about-hero-meta flex flex-wrap items-center justify-between gap-4">
            <EditorialTag tone="dark">{hero.eyebrow}</EditorialTag>
            <span
              aria-hidden="true"
              className="hidden font-mono text-[0.68rem] uppercase tracking-[0.15em] text-[#A8AEA8] sm:inline"
            >
              + CLARITY · CREATIVITY · PURPOSE
            </span>
          </div>

          <h1
            id="page-heading"
            className="heading-hero mt-6 max-w-[18ch] text-white sm:mt-8"
          >
            {hero.headlineLines.map((line, index) => (
              <span key={line} className="line-mask">
                <span
                  className={`about-hero-line line-inner ${
                    index === hero.headlineLines.length - 1
                      ? "text-[#B7F536]"
                      : ""
                  }`}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <div className="about-hero-rule divider-draw mt-9 h-px w-full bg-white/15 sm:mt-12" />

          <div className="mt-7 grid grid-cols-1 gap-6 lg:mt-9 lg:grid-cols-12 lg:items-end">
            <p className="about-hero-copy hidden font-mono text-[0.68rem] uppercase tracking-[0.15em] text-[#A8AEA8] lg:col-span-4 lg:block">
              CREATIVE, DIGITAL &amp; BUSINESS SUPPORT
            </p>
            <p className="about-hero-copy type-lead max-w-2xl leading-[1.62] text-white/82 lg:col-span-8">
              {hero.description}
            </p>
          </div>

          {/* Wide Panoramic Architectural Frame */}
          <figure className="about-hero-frame relative mt-10 overflow-hidden rounded-[2px] border border-white/12 bg-[#242824] sm:mt-14 lg:mt-16">
            <div className="about-hero-image-inner h-full w-full will-change-transform">
              <EditorialImage
                src={hero.image.src}
                alt={hero.image.alt}
                fallbackLabel={hero.image.fallbackLabel}
                priority
                className="aspect-[16/10] w-full sm:aspect-[16/8] lg:aspect-[21/9]"
                imgClassName="object-center saturate-[0.75] contrast-[1.04]"
              />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(21,24,23,0.12) 0%, rgba(21,24,23,0.45) 100%)",
              }}
            />
            <figcaption className="absolute right-3.5 bottom-3.5 left-3.5 flex items-center justify-between gap-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/80 sm:right-5 sm:bottom-4 sm:left-5">
              <span>SOLVINGODDS</span>
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-[1px] bg-[#B7F536]"
                />
                <span>[01 — 03] DISCIPLINES</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* SECTION 02 — Who We Are */}
      <section
        data-surface="light"
        aria-labelledby="about-story-heading"
        className="so-section service-light"
      >
        <div className="so-container">
          <div className="service-section-top">
            <EditorialTag tone="light">{story.eyebrow}</EditorialTag>
            <span className="service-index">[01] WHO WE ARE</span>
          </div>

          <EditorialHeading
            id="about-story-heading"
            lines={story.headlineLines}
            className="mt-9 max-w-[19ch] text-[#151817] sm:mt-12"
          />

          {/* Asymmetrical Editorial Text & Image Storytelling */}
          <div className="mt-12 grid grid-cols-1 gap-10 sm:mt-16 lg:mt-20 lg:grid-cols-12 lg:items-start lg:gap-12">
            <figure
              data-reveal-image
              data-parallax-frame
              className="overflow-hidden rounded-[2px] bg-[#E5E7DE] lg:col-span-5"
            >
              <div className="editorial-parallax h-full w-full">
                <EditorialImage
                  src={story.primaryImage.src}
                  alt={story.primaryImage.alt}
                  fallbackLabel={story.primaryImage.fallbackLabel}
                  tone="light"
                  className="aspect-[4/5] w-full sm:aspect-[16/11] lg:aspect-[4/5]"
                />
              </div>
            </figure>

            <div className="flex flex-col justify-between gap-10 lg:col-span-6 lg:col-start-7 lg:pt-6">
              <div className="space-y-6">
                <p
                  data-reveal
                  className="font-display text-[clamp(1.25rem,2vw,1.72rem)] font-medium leading-[1.42] tracking-[-0.024em] text-[#151817]"
                >
                  {story.paragraphs[0]}
                </p>
                <p
                  data-reveal
                  className="type-lead leading-[1.7] text-[#525852]"
                >
                  {story.paragraphs[1]}
                </p>
              </div>

              <figure className="pt-2 lg:pt-6">
                <div
                  data-reveal-image
                  data-parallax-frame
                  className="overflow-hidden rounded-[2px] bg-[#E5E7DE]"
                >
                  <div className="editorial-parallax h-full w-full">
                    <EditorialImage
                      src={story.secondaryImage.src}
                      alt={story.secondaryImage.alt}
                      fallbackLabel={story.secondaryImage.fallbackLabel}
                      tone="light"
                      className="aspect-[16/10] w-full"
                    />
                  </div>
                </div>
                <figcaption className="mt-3 flex items-center justify-between gap-4 border-t border-[#151817]/13 pt-2.5 font-mono text-[0.66rem] uppercase tracking-[0.13em] text-[#525852]">
                  <span>UNDERSTAND FIRST</span>
                  <span>CLEAR, PURPOSEFUL SOLUTIONS</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03 — What We Do */}
      <section
        data-surface="dark"
        aria-labelledby="about-expertise-heading"
        className="so-section service-dark"
      >
        <div className="so-container">
          <div className="service-section-top">
            <EditorialTag tone="dark">{expertise.eyebrow}</EditorialTag>
            <span className="service-index">[02] WHAT WE DO</span>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-8 sm:mt-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <EditorialHeading
                id="about-expertise-heading"
                lines={expertise.headlineLines}
                className="max-w-[19ch] text-white"
              />
            </div>
            <div data-reveal className="lg:col-span-4 lg:flex lg:justify-end">
              <KineticButton
                label="All Services"
                href="/services"
                variant="editorialDark"
              />
            </div>
          </div>

          {/* Large Interactive Editorial Discipline Rows */}
          <div className="mt-14 sm:mt-18 lg:mt-22">
            {expertise.items.map((item) => {
              const isHovered = hoveredDiscipline === item.slug;
              const isDimmed =
                hoveredDiscipline !== null && hoveredDiscipline !== item.slug;

              return (
                <article
                  key={item.slug}
                  onMouseEnter={() => setHoveredDiscipline(item.slug)}
                  onMouseLeave={() => setHoveredDiscipline(null)}
                  onFocus={() => setHoveredDiscipline(item.slug)}
                  onBlur={() => setHoveredDiscipline(null)}
                  className={`transition-colors duration-500 ${
                    isHovered ? "bg-[#242824]/50" : "bg-transparent"
                  }`}
                >
                  <div
                    className={`editorial-rule transition-colors duration-500 ${
                      isHovered ? "is-active" : ""
                    }`}
                  />
                  <SiteLink
                    href={item.href}
                    data-reveal
                    className={`group grid grid-cols-1 gap-6 py-9 transition-opacity duration-500 sm:py-12 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-4 lg:py-13 ${
                      isDimmed ? "lg:opacity-55" : "opacity-100"
                    }`}
                  >
                    <div className="lg:col-span-5">
                      <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.13em]">
                        <span
                          className={`transition-colors duration-300 ${
                            isHovered ? "text-[#B7F536]" : "text-[#A8AEA8]"
                          }`}
                        >
                          [{item.number}]
                        </span>
                        <span className="text-[#A8AEA8]">
                          {item.discipline}
                        </span>
                      </div>
                      <h3 className="font-display mt-3 text-[clamp(1.65rem,3vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.034em] text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:translate-x-1.5">
                        {item.title}
                      </h3>
                    </div>

                    <p className="type-body max-w-md leading-[1.68] text-[#A8AEA8] transition-colors duration-300 group-hover:text-white/85 lg:col-span-4">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between gap-4 lg:col-span-3 lg:justify-end">
                      <div
                        className={`overflow-hidden rounded-[2px] border transition-[border-color,opacity,filter] duration-500 ${
                          isHovered
                            ? "border-[#B7F536]/65 opacity-100 grayscale-0"
                            : "border-white/12 opacity-90 lg:opacity-75 lg:grayscale-[35%]"
                        } w-36 sm:w-44 lg:w-40`}
                      >
                        <EditorialImage
                          src={item.image.src}
                          alt={item.image.alt}
                          fallbackLabel={item.image.fallbackLabel}
                          className="aspect-[16/10] w-full"
                          imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                        />
                      </div>

                      <span
                        aria-hidden="true"
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[2px] border transition-colors duration-300 ${
                          isHovered
                            ? "border-[#B7F536] bg-[#B7F536] text-[#151817]"
                            : "border-white/20 text-white"
                        }`}
                      >
                        <span className="arrow-relay h-4 w-4">
                          <svg
                            viewBox="0 0 14 14"
                            fill="none"
                            className="arrow-relay-first h-3.5 w-3.5"
                          >
                            <path
                              d="M2.5 11.5L11.5 2.5M11.5 2.5H4.25M11.5 2.5V9.75"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="square"
                            />
                          </svg>
                          <svg
                            viewBox="0 0 14 14"
                            fill="none"
                            className="arrow-relay-second h-3.5 w-3.5"
                          >
                            <path
                              d="M2.5 11.5L11.5 2.5M11.5 2.5H4.25M11.5 2.5V9.75"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="square"
                            />
                          </svg>
                        </span>
                      </span>
                    </div>
                  </SiteLink>
                </article>
              );
            })}
            <div className="editorial-rule" />
          </div>
        </div>
      </section>

      {/* SECTION 04 — What Guides Our Work (Typography-Led Principles) */}
      <section
        data-surface="light"
        aria-labelledby="about-principles-heading"
        className="so-section service-light"
      >
        <div className="so-container">
          <div className="service-section-top">
            <EditorialTag tone="light">{principles.eyebrow}</EditorialTag>
            <span className="service-index">[03] WHAT GUIDES US</span>
          </div>

          <EditorialHeading
            id="about-principles-heading"
            lines={principles.headlineLines}
            className="mt-9 max-w-[20ch] text-[#151817] sm:mt-12"
          />

          <ol className="mt-14 sm:mt-18 lg:mt-22">
            {principles.items.map((principle) => (
              <li key={principle.title} className="group">
                <div className="editorial-rule" />
                <div
                  data-reveal
                  className="grid grid-cols-1 gap-4 py-10 sm:py-13 lg:grid-cols-12 lg:items-baseline lg:gap-10 lg:py-16"
                >
                  <div className="flex items-center gap-3 lg:col-span-2">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-[1px] bg-[#B7F536] ring-1 ring-[#151817]/30"
                    />
                    <span className="font-mono text-xs tracking-[0.14em] text-[#525852]">
                      [{principle.number}]
                    </span>
                  </div>

                  <h3 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.042em] text-[#151817] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:col-span-5 lg:group-hover:translate-x-1.5">
                    {principle.title}
                    <span className="text-[#525852]">.</span>
                  </h3>

                  <p className="type-lead max-w-xl leading-[1.65] text-[#525852] lg:col-span-5">
                    {principle.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="editorial-rule" />
        </div>
      </section>

      {/* SECTION 05 — Our Approach (Distinct Split Vertical Progression) */}
      <section
        data-surface="dark"
        aria-labelledby="about-approach-heading"
        className="so-section service-secondary"
      >
        <div className="so-container">
          <div className="service-section-top">
            <EditorialTag tone="dark">{approach.eyebrow}</EditorialTag>
            <span className="service-index">[04] FOUR STAGES</span>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-12 sm:mt-14 lg:grid-cols-12 lg:items-start lg:gap-14">
            {/* Sticky Editorial Intro & Visual */}
            <div className="lg:sticky lg:top-28 lg:col-span-5">
              <EditorialHeading
                id="about-approach-heading"
                lines={approach.headlineLines}
                className="text-white"
              />
              <p
                data-reveal
                className="type-body mt-6 max-w-md leading-[1.7] text-[#A8AEA8]"
              >
                {approach.intro}
              </p>

              <figure
                data-reveal-image
                className="mt-8 overflow-hidden rounded-[2px] border border-white/12 bg-[#151817]"
              >
                <EditorialImage
                  src={approach.image.src}
                  alt={approach.image.alt}
                  fallbackLabel={approach.image.fallbackLabel}
                  className="aspect-[16/10] w-full"
                  imgClassName="saturate-[0.7]"
                />
              </figure>
            </div>

            {/* Interactive Vertical Stage Rail */}
            <ol className="border-l border-white/14 lg:col-span-7">
              {approach.stages.map((stage, index) => {
                const isActive = activeStage === index;
                return (
                  <li
                    key={stage.number}
                    data-reveal
                    tabIndex={0}
                    onMouseEnter={() => setActiveStage(index)}
                    onFocus={() => setActiveStage(index)}
                    className={`relative border-b border-white/14 py-8 pr-4 pl-6 transition-colors duration-300 first:border-t sm:py-10 sm:pl-9 ${
                      isActive ? "bg-[#151817]/45" : "hover:bg-[#151817]/25"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute top-0 bottom-0 -left-px w-[2px] bg-[#B7F536] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${
                        isActive ? "scale-y-100" : "scale-y-0"
                      }`}
                    />

                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <span
                        className={`font-display text-[clamp(1.75rem,3vw,2.6rem)] font-semibold leading-none tracking-[-0.04em] transition-colors duration-300 ${
                          isActive ? "text-[#B7F536]" : "text-white/55"
                        }`}
                      >
                        {stage.number}
                      </span>
                      <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-[#A8AEA8]">
                        {stage.cue}
                      </span>
                    </div>

                    <h3 className="font-display mt-4 text-[clamp(1.35rem,2.1vw,1.85rem)] font-semibold leading-[1.15] tracking-[-0.028em] text-white">
                      {stage.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-[0.95rem] leading-[1.68] text-[#A8AEA8]">
                      {stage.description}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* SECTION 06 — Closing CTA */}
      <ServiceCTA
        eyebrow={cta.eyebrow}
        ctaHref={cta.href}
        content={{
          headline: cta.headlineLines,
          description: cta.description,
          label: cta.label,
        }}
      />
    </div>
  );
}
