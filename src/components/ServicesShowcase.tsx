"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES_CONTENT } from "../data/homepageContent";
import { prefersReducedMotion } from "../utils/smoothScroll";
import { EditorialImage } from "./ui/EditorialImage";
import { EditorialTag } from "./ui/EditorialTag";
import { KineticButton } from "./ui/KineticButton";
import { SiteLink } from "./ui/SiteLink";

gsap.registerPlugin(ScrollTrigger);

export function ServicesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pointerOffset, setPointerOffset] = useState<Record<string, number>>(
    {},
  );
  // Coalesce high-frequency pointermove updates into one state write per frame.
  const pendingOffset = useRef<Record<string, number>>({});
  const offsetRaf = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (offsetRaf.current !== null) {
        cancelAnimationFrame(offsetRaf.current);
      }
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Section header reveal
      gsap.fromTo(
        ".services-line",
        { yPercent: 112 },
        {
          yPercent: 0,
          duration: 1.05,
          stagger: 0.11,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".services-header",
            start: "top 82%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".services-intro",
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-header",
            start: "top 78%",
            once: true,
          },
        },
      );

      // Subtle scroll rotation on title architectural emblem
      gsap.to(".services-title-mark", {
        rotation: 90,
        ease: "none",
        scrollTrigger: {
          trigger: ".services-header",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // Individual service row entrances + horizontal divider draws
      const rows = gsap.utils.toArray<HTMLElement>(".service-row");
      rows.forEach((row) => {
        const line = row.querySelector<HTMLElement>(".service-divider");
        const content = row.querySelectorAll<HTMLElement>(".service-row-anim");

        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.05,
              ease: "expo.out",
              scrollTrigger: {
                trigger: row,
                start: "top 86%",
                once: true,
              },
            },
          );
        }

        gsap.fromTo(
          content,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 84%",
              once: true,
            },
          },
        );
      });

      gsap.fromTo(
        ".service-bottom-divider",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.05,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".service-bottom-divider",
            start: "top 92%",
            once: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleRowPointerMove = (
    id: string,
    e: React.MouseEvent<HTMLElement>,
  ) => {
    if (
      prefersReducedMotion() ||
      !window.matchMedia("(min-width: 1024px) and (hover: hover)").matches
    ) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    pendingOffset.current[id] = relY * 18;
    if (offsetRaf.current !== null) return;
    offsetRaf.current = requestAnimationFrame(() => {
      offsetRaf.current = null;
      const next = { ...pendingOffset.current };
      setPointerOffset((prev) => {
        for (const key of Object.keys(next)) {
          if (Math.abs((prev[key] ?? 0) - next[key]) >= 0.5) {
            return { ...prev, ...next };
          }
        }
        return prev;
      });
    });
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      data-surface="dark"
      aria-labelledby="services-heading"
      className="so-section relative bg-[#151817] text-white"
    >
      <div className="so-container">
        {/* Stodio-Inspired Monumental Section Header */}
        <div className="services-header">
          <div className="flex items-center justify-between border-b border-white/14 pb-5">
            <EditorialTag tone="dark">{SERVICES_CONTENT.eyebrow}</EditorialTag>
            <span
              aria-hidden="true"
              className="hidden font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[#A8AEA8] sm:inline"
            >
              [03 PILLARS]
            </span>
          </div>

          <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2 id="services-heading" className="heading-display text-white">
                <span className="line-mask">
                  <span className="services-line line-inner inline-flex flex-wrap items-center gap-x-4">
                    <span>{SERVICES_CONTENT.headlineLines[0]}</span>
                    <span
                      aria-hidden="true"
                      className="services-title-mark hidden h-[0.58em] w-[0.58em] items-center justify-center rounded-[2px] border border-[#B7F536]/50 text-[#B7F536] sm:inline-flex"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-[58%] w-[58%]"
                      >
                        <path
                          d="M12 2V22M2 12H22M5.5 5.5L18.5 18.5M18.5 5.5L5.5 18.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                      </svg>
                    </span>
                  </span>
                </span>
                <span className="line-mask">
                  <span className="services-line line-inner">
                    {SERVICES_CONTENT.headlineLines[1].slice(0, -1)}
                    <span className="text-[#B7F536]">.</span>
                  </span>
                </span>
              </h2>
            </div>

            <div className="lg:col-span-4">
              <p className="services-intro type-body leading-[1.65] text-[#A8AEA8]">
                {SERVICES_CONTENT.description}
              </p>
              <div className="services-intro mt-6">
                <KineticButton
                  label={SERVICES_CONTENT.cta.label}
                  href={SERVICES_CONTENT.cta.href}
                  variant="editorialDark"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Service Rows: 01 / 02 / 03 */}
        <div className="mt-14 sm:mt-20 lg:mt-24">
          {SERVICES_CONTENT.items.map((service) => {
            const isHovered = hoveredId === service.id;
            const isDimmed = hoveredId !== null && hoveredId !== service.id;
            const offsetY = pointerOffset[service.id] ?? 0;

            return (
              <article
                key={service.id}
                id={service.id}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                onMouseMove={(e) => handleRowPointerMove(service.id, e)}
                onFocus={() => setHoveredId(service.id)}
                onBlur={() => setHoveredId(null)}
                className={`service-row group relative scroll-mt-24 transition-colors duration-500 ${
                  isHovered ? "bg-[#242824]/45" : "bg-transparent"
                }`}
              >
                {/* Animated Top Horizontal Divider */}
                <div
                  className={`service-divider divider-draw h-px w-full transition-colors duration-500 ${
                    isHovered ? "bg-[#B7F536]" : "bg-white/15"
                  }`}
                />

                <div
                  className={`py-10 transition-opacity duration-500 sm:py-14 lg:px-4 lg:py-16 ${
                    isDimmed ? "lg:opacity-55" : "opacity-100"
                  }`}
                >
                  {/* Top Title Row — Number, Huge Title, Directional Marker */}
                  <div className="service-row-anim flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span
                        className={`font-mono text-sm font-medium tracking-[0.08em] transition-colors duration-300 sm:text-base ${
                          isHovered ? "text-[#B7F536]" : "text-[#A8AEA8]"
                        }`}
                      >
                        [{service.number}]
                      </span>

                      <div className="flex items-center gap-3 sm:gap-4">
                        <span
                          aria-hidden="true"
                          className={`hidden items-center justify-center text-[#B7F536] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:inline-flex ${
                            isHovered
                              ? "w-7 translate-x-0 opacity-100"
                              : "-ml-4 w-0 -translate-x-3 opacity-0"
                          }`}
                        >
                          <svg
                            viewBox="0 0 20 20"
                            fill="none"
                            className="h-6 w-6 shrink-0"
                          >
                            <path
                              d="M3 10H16.5M16.5 10L10.5 4M16.5 10L10.5 16"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="square"
                            />
                          </svg>
                        </span>

                        <h3 className="heading-service text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:translate-x-2">
                          <SiteLink href={service.href}>
                            {service.title}
                          </SiteLink>
                        </h3>
                      </div>
                    </div>

                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[#A8AEA8]">
                      {service.shortLabel}
                    </span>
                  </div>

                  {/* Editorial Detail Row: Image Preview + Always-Readable Description & Capabilities */}
                  <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-10 lg:grid-cols-12 lg:items-start lg:gap-10">
                    {/* Left: Description + Inquiry Link (Cols 1-4) */}
                    <div className="service-row-anim lg:col-span-4 lg:pl-12">
                      <p className="type-body leading-[1.65] text-white/82">
                        {service.description}
                      </p>

                      <SiteLink
                        href={service.href}
                        className="mt-5 inline-flex items-center gap-2 text-[0.78rem] font-medium tracking-[0.02em] text-[#A8AEA8] transition-colors duration-200 hover:text-[#B7F536] cursor-pointer"
                      >
                        <span>Explore {service.title}</span>
                        <svg
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden="true"
                          className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        >
                          <path
                            d="M2.5 11.5L11.5 2.5M11.5 2.5H4.25M11.5 2.5V9.75"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="square"
                          />
                        </svg>
                      </SiteLink>
                    </div>

                    {/* Center: Capabilities List (Always visible without hovering, Cols 5-8) */}
                    <div className="service-row-anim lg:col-span-4">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#A8AEA8]">
                        Capabilities
                      </p>
                      <ul className="mt-3.5 divide-y divide-white/10 border-t border-b border-white/10">
                        {service.capabilities.map((capability) => (
                          <li
                            key={capability}
                            className="flex items-start gap-3 py-2.5 text-[0.9rem] leading-[1.45] text-white/90"
                          >
                            <span
                              aria-hidden="true"
                              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-[1px] transition-colors duration-300 ${
                                isHovered ? "bg-[#B7F536]" : "bg-white/35"
                              }`}
                            />
                            <span>{capability}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: Hover-Reactive Service Image Preview (Responsive on touch, dynamic on desktop, Cols 9-12) */}
                    <div className="service-row-anim lg:col-span-4">
                      <div
                        style={{
                          transform: isHovered
                            ? `translate3d(0, ${offsetY}px, 0)`
                            : "translate3d(0, 0, 0)",
                        }}
                        className={`relative overflow-hidden rounded-[2px] border transition-[transform,border-color,opacity,filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isHovered
                            ? "border-[#B7F536]/65 opacity-100 grayscale-0"
                            : "border-white/12 opacity-95 lg:opacity-72 lg:grayscale-[35%]"
                        }`}
                      >
                        <SiteLink
                          href={service.href}
                          aria-label={`Explore ${service.title}`}
                          className="block"
                        >
                          <EditorialImage
                            src={service.media.src}
                            alt={service.media.alt}
                            fallbackLabel={service.media.fallbackLabel}
                            className="aspect-[16/10] w-full"
                            imgClassName={`transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                              isHovered ? "scale-[1.06]" : "scale-100"
                            }`}
                          />
                        </SiteLink>
                        <div
                          aria-hidden="true"
                          className={`pointer-events-none absolute top-3 right-3 rounded-[2px] px-2 py-0.5 font-mono text-[0.66rem] tracking-[0.1em] transition-colors duration-300 ${
                            isHovered
                              ? "bg-[#B7F536] text-[#151817]"
                              : "bg-[#151817]/80 text-white/80"
                          }`}
                        >
                          {service.number} / 03
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {/* Closing Divider */}
          <div className="service-bottom-divider divider-draw h-px w-full bg-white/15" />
        </div>

        {/* Bottom Services Section Action Strip */}
        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#A8AEA8]">
            Available as standalone engagements or coordinated cross-service
            support.
          </p>
          <KineticButton
            label="Explore Services"
            href="/services"
            variant="outlineOnDark"
            size="sm"
            ariaLabel="Explore all SolvingOdds services"
          />
        </div>
      </div>
    </section>
  );
}
