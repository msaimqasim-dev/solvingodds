"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT_CONTENT } from "../data/homepageContent";
import { prefersReducedMotion } from "../utils/smoothScroll";
import { EditorialImage } from "./ui/EditorialImage";
import { EditorialTag } from "./ui/EditorialTag";
import { KineticButton } from "./ui/KineticButton";

gsap.registerPlugin(ScrollTrigger);

export function AboutIntro() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Intro typography entrance
      gsap.fromTo(
        ".about-eyebrow",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-header",
            start: "top 84%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".about-line",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.0,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".about-header",
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".about-copy",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-copy-wrap",
            start: "top 85%",
            once: true,
          },
        }
      );

      // Gallery clip-path curtain reveals + inner scale (uniform for every frame)
      const frames = gsap.utils.toArray<HTMLElement>(".about-gallery-item");
      frames.forEach((frame, idx) => {
        const mediaWrap = frame.querySelector<HTMLElement>(".gallery-clip");
        const img = frame.querySelector<HTMLElement>("img");

        if (mediaWrap) {
          gsap.fromTo(
            mediaWrap,
            { clipPath: "inset(14% 0% 0% 0%)", opacity: 0 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              duration: 1.1,
              delay: (idx % 2) * 0.1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: frame,
                start: "top 86%",
                once: true,
              },
            }
          );
        }

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.14 },
            {
              scale: 1.03,
              duration: 1.35,
              ease: "power3.out",
              scrollTrigger: {
                trigger: frame,
                start: "top 86%",
                once: true,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      data-surface="light"
      aria-labelledby="about-heading"
      className="so-section relative overflow-hidden bg-[#F6F7F2] text-[#151817]"
    >
      <div className="so-container">
        {/* Intro Editorial Header */}
        <div className="about-header">
          <div className="about-eyebrow flex items-center justify-between border-b border-[#151817]/13 pb-5">
            <EditorialTag tone="light">{ABOUT_CONTENT.eyebrow}</EditorialTag>
            <span
              aria-hidden="true"
              className="hidden font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[#525852] sm:inline"
            >
              [01] INTRODUCTION
            </span>
          </div>

          <h2
            id="about-heading"
            className="heading-section mt-9 max-w-[20ch] text-[#151817] sm:mt-12"
          >
            {ABOUT_CONTENT.headlineLines.map((line) => (
              <span key={line} className="line-mask">
                <span className="about-line line-inner">{line}</span>
              </span>
            ))}
          </h2>
        </div>

        {/* Symmetrical Supporting Copy + CTA — balanced two-column layout */}
        <div className="about-copy-wrap mt-8 grid gap-8 lg:mt-14 lg:grid-cols-2 lg:items-end">
          <div className="hidden lg:block">
            <p className="about-copy font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[#525852]">
              DESIGN · DIGITAL · OPERATIONS
            </p>
          </div>
          <div>
            <p className="about-copy type-lead max-w-2xl leading-[1.6] text-[#151817]/82">
              {ABOUT_CONTENT.description}
            </p>
            <div className="about-copy mt-7">
              <KineticButton
                label={ABOUT_CONTENT.cta.label}
                href={ABOUT_CONTENT.cta.href}
                variant="editorialLight"
              />
            </div>
          </div>
        </div>

        {/* Symmetrical Editorial Gallery — balanced 2 × 2 grid, uniform frames */}
        <div className="mt-14 grid grid-cols-1 gap-10 sm:mt-20 sm:grid-cols-2 lg:mt-24 lg:gap-12">
          {ABOUT_CONTENT.gallery.map((item) => (
            <figure key={item.id} className="about-gallery-item group">
              <div className="gallery-clip overflow-hidden rounded-[2px]">
                <EditorialImage
                  src={item.media.src}
                  alt={item.media.alt}
                  fallbackLabel={item.media.fallbackLabel}
                  tone="light"
                  className="aspect-[16/10] w-full"
                  imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between gap-4 border-t border-[#151817]/12 pt-2.5 text-[0.75rem]">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[#525852]">
                  {item.code} — {item.discipline}
                </span>
                <span className="font-medium text-[#151817]">
                  {item.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
