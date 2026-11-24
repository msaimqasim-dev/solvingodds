"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { EditorialImage } from "../ui/EditorialImage";
import { EditorialTag } from "../ui/EditorialTag";
import { KineticButton } from "../ui/KineticButton";
import { SiteLink } from "../ui/SiteLink";
import type { MediaAsset } from "../../data/homepageContent";

type ServiceHeroProps = {
  eyebrow: string;
  lines: string[];
  description: string;
  image: MediaAsset;
  position?: string;
  breadcrumb?: string;
  ctaLabel: string;
  ctaHref: string;
};

export function ServiceHero({
  eyebrow,
  lines,
  description,
  image,
  position = "center",
  breadcrumb,
  ctaLabel,
  ctaHref,
}: ServiceHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo(
            ".expertise-hero-photo",
            { scale: 1.09 },
            { scale: 1.02, duration: 1.8 },
            0,
          )
          .fromTo(
            ".expertise-hero-meta",
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
            0.12,
          )
          .fromTo(
            ".expertise-hero-line",
            { yPercent: 110 },
            { yPercent: 0, duration: 1.1, stagger: 0.1, ease: "power4.out" },
            0.23,
          )
          .fromTo(
            ".expertise-hero-copy",
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.85, stagger: 0.1 },
            0.6,
          );
      });
      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.to(".expertise-hero-photo", {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.7,
            },
          });
        },
      );
    }, sectionRef);
    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="page-top"
      data-surface="dark"
      aria-labelledby="page-heading"
      className="expertise-hero"
      style={{ "--hero-image-position": position } as React.CSSProperties}
    >
      <div className="expertise-hero-background" aria-hidden="true">
        <div className="expertise-hero-photo h-full w-full">
          <EditorialImage
            key={image.src}
            src={image.src}
            alt=""
            fallbackLabel={image.fallbackLabel}
            priority
            className="h-full w-full"
            imgClassName="expertise-hero-img"
          />
        </div>
        <div className="expertise-hero-scrim" />
      </div>
      <div className="so-container expertise-hero-content">
        <nav
          aria-label="Breadcrumb"
          className="expertise-hero-meta service-breadcrumb"
        >
          <ol>
            <li>
              <SiteLink href="/" className="inline-block py-1">
                Home
              </SiteLink>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              {breadcrumb ? (
                <SiteLink href="/services" className="inline-block py-1">
                  Services
                </SiteLink>
              ) : (
                <span aria-current="page">Services</span>
              )}
            </li>
            {breadcrumb && (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <span aria-current="page">{breadcrumb}</span>
                </li>
              </>
            )}
          </ol>
        </nav>
        <div className="expertise-hero-meta expertise-hero-eyebrow">
          <span className="font-display font-semibold tracking-[-0.04em] text-white">
            SolvingOdds<span className="text-[var(--color-accent)]">.</span>
          </span>
          <EditorialTag tone="dark">{eyebrow}</EditorialTag>
        </div>
        <h1 id="page-heading" className="expertise-hero-title">
          {lines.map((line, index) => (
            <span className="line-mask" key={line}>
              <span
                className={`line-inner expertise-hero-line ${index === lines.length - 1 ? "text-[var(--color-accent)]" : ""}`}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>
        <p className="expertise-hero-copy expertise-hero-description">
          {description}
        </p>
        <div className="expertise-hero-copy expertise-hero-actions">
          <KineticButton label={ctaLabel} href={ctaHref} variant="accent" />
        </div>
      </div>
    </section>
  );
}
