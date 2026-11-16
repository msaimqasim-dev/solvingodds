import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  DEMO_PROJECTS,
  SELECTED_WORK_SECTION,
  getValidExternalProjectUrl,
  type DemoProject,
} from "../data/projects";
import { prefersReducedMotion } from "../utils/smoothScroll";
import { EditorialImage } from "./ui/EditorialImage";
import { EditorialTag } from "./ui/EditorialTag";

gsap.registerPlugin(ScrollTrigger);

interface ProjectPreviewCardProps {
  project: DemoProject;
  featured?: boolean;
}

function ExternalArrowIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className}>
      <path
        d="M2.5 11.5L11.5 2.5M11.5 2.5H4.25M11.5 2.5V9.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

function ProjectPreviewCard({
  project,
  featured = false,
}: ProjectPreviewCardProps) {
  const validLiveUrl = getValidExternalProjectUrl(project.liveUrl);
  const isInteractive = Boolean(validLiveUrl);

  const aspectClass = featured
    ? "aspect-[16/10] lg:aspect-[16/9]"
    : "aspect-[16/10]";

  const cardInner = (
    <>
      {/* Website Screenshot Showcase Frame */}
      <div className="work-clip relative overflow-hidden rounded-[2px] border border-[#151817]/12 bg-[#E5E7DE] transition-colors duration-300 group-hover:border-[#151817]/32">
        <div className="work-parallax h-full w-full">
          <EditorialImage
            src={project.image}
            alt={project.imageAlt}
            fallbackLabel={project.fallbackLabel}
            tone="light"
            className={`w-full ${aspectClass}`}
            imgClassName={`work-img object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isInteractive
                ? "group-hover:scale-[1.055]"
                : "group-hover:scale-[1.025]"
            }`}
          />
        </div>

        {/* Subtle Interactive Hover Veil */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-[#151817]/0 transition-colors duration-500 ${
            isInteractive
              ? "group-hover:bg-[#151817]/18"
              : "group-hover:bg-[#151817]/6"
          }`}
        />

        {/* Top Concept Badge */}
        <div className="pointer-events-none absolute top-3.5 left-3.5 flex items-center gap-2 sm:top-4 sm:left-4">
          <span className="rounded-[2px] bg-[#151817]/90 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-white">
            {project.type}
          </span>
        </div>

        {/* Bottom-Right External Link Indicator */}
        {isInteractive ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 bottom-3.5 flex items-center gap-2.5 rounded-[2px] bg-[#151817] px-3.5 py-2.5 text-white transition-colors duration-300 group-hover:bg-[#B7F536] group-hover:text-[#151817] sm:right-4 sm:bottom-4"
          >
            <span className="hidden font-mono text-[0.66rem] font-semibold uppercase tracking-[0.13em] sm:inline">
              Open Live Site
            </span>
            <span className="arrow-relay h-4 w-4">
              <ExternalArrowIcon className="arrow-relay-first h-3.5 w-3.5" />
              <ExternalArrowIcon className="arrow-relay-second h-3.5 w-3.5" />
            </span>
          </div>
        ) : (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 bottom-3.5 flex h-10 w-10 items-center justify-center rounded-[2px] border border-white/15 bg-[#151817]/75 text-white/65 sm:right-4 sm:bottom-4"
          >
            <ExternalArrowIcon className="h-3.5 w-3.5" />
          </div>
        )}
      </div>

      {/* Editorial Metadata, Title & External Link Status */}
      <div
        className={`mt-4 border-t border-[#151817]/14 pt-4 transition-colors duration-300 ${
          isInteractive
            ? "group-hover:border-[#151817]"
            : "group-hover:border-[#151817]/30"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 text-[0.72rem] uppercase tracking-[0.13em] text-[#525852]">
          <span className="font-semibold">{project.category}</span>
          <span className="font-mono">
            [{project.index}] · {project.type.toUpperCase()}
          </span>
        </div>

        <div
          className={`mt-2.5 flex flex-col gap-3 ${
            featured
              ? "lg:flex-row lg:items-end lg:justify-between lg:gap-10"
              : ""
          }`}
        >
          <div className={featured ? "max-w-2xl" : ""}>
            <h3
              className={`font-display font-semibold leading-[1.1] tracking-[-0.032em] text-[#151817] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                featured
                  ? "text-[clamp(1.55rem,2.8vw,2.5rem)]"
                  : "type-card"
              } ${isInteractive ? "group-hover:translate-x-1" : ""}`}
            >
              {project.title}
            </h3>

            <p className="mt-2.5 max-w-xl text-[0.93rem] leading-[1.62] text-[#525852]">
              {project.summary}
            </p>
          </div>

          {/* Explicit External-Link Action / Inactive Pending State */}
          <div className="pt-1 lg:shrink-0">
            {isInteractive ? (
              <span className="inline-flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.01em] text-[#151817]">
                <span className="h-2 w-2 rounded-[1px] bg-[#B7F536] ring-1 ring-[#151817]/25" />
                <span>Visit Live Website</span>
                <span className="font-mono text-[0.66rem] font-normal uppercase tracking-[0.1em] text-[#525852]">
                  (New Tab)
                </span>
                <ExternalArrowIcon className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[#525852]"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-[1px] bg-[#151817]/30"
                />
                <span>Live Website — Link Pending</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <article
      className={`work-card ${featured ? "work-card-featured" : ""}`}
      data-project-id={project.id}
    >
      {validLiveUrl ? (
        <a
          href={validLiveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.title} live concept website (opens external site in a new tab)`}
          className="group block w-full text-left"
        >
          {cardInner}
        </a>
      ) : (
        <div className="group block w-full text-left">{cardInner}</div>
      )}
    </article>
  );
}

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const [featuredProject, ...pairedProjects] = DEMO_PROJECTS;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Section heading masked reveal
      gsap.fromTo(
        ".work-line",
        { yPercent: 112 },
        {
          yPercent: 0,
          duration: 1.0,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".work-header",
            start: "top 82%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".work-intro",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".work-header",
            start: "top 78%",
            once: true,
          },
        },
      );

      // Portfolio card curtain reveals + entrance scale
      const cards = gsap.utils.toArray<HTMLElement>(".work-card");
      cards.forEach((card, index) => {
        const clip = card.querySelector<HTMLElement>(".work-clip");
        const img = card.querySelector<HTMLElement>(".work-img");

        if (clip) {
          gsap.fromTo(
            clip,
            { clipPath: "inset(11% 0% 0% 0%)", opacity: 0 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              duration: 1.05,
              delay: index === 0 ? 0 : ((index - 1) % 2) * 0.1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true,
              },
            },
          );
        }

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.1 },
            {
              scale: 1,
              duration: 1.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true,
              },
            },
          );
        }
      });

      // Subtle scroll parallax on desktop screenshot containers
      mm.add("(min-width: 1024px)", () => {
        cards.forEach((card) => {
          const clip = card.querySelector<HTMLElement>(".work-clip");
          const parallax = card.querySelector<HTMLElement>(".work-parallax");
          if (!clip || !parallax) return;

          gsap.fromTo(
            parallax,
            { yPercent: -2.5, scale: 1.05 },
            {
              yPercent: 2.5,
              scale: 1.05,
              ease: "none",
              scrollTrigger: {
                trigger: clip,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
              },
            },
          );
        });
      });
    }, section);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      data-surface="light"
      aria-labelledby="work-heading"
      className="so-section relative scroll-mt-20 bg-[#F6F7F2] text-[#151817]"
    >
      <div className="so-container">
        {/* Section Header */}
        <div className="work-header">
          <div className="flex items-center justify-between border-b border-[#151817]/13 pb-5">
            <EditorialTag tone="light">
              {SELECTED_WORK_SECTION.eyebrow}
            </EditorialTag>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[#525852]">
              {SELECTED_WORK_SECTION.metaLabel}
            </span>
          </div>

          <div className="mt-9 grid gap-8 sm:mt-12 lg:grid-cols-2 lg:items-end">
            <div>
              <h2 id="work-heading" className="heading-section text-[#151817]">
                {SELECTED_WORK_SECTION.headlineLines.map((line) => (
                  <span key={line} className="line-mask">
                    <span className="work-line line-inner">{line}</span>
                  </span>
                ))}
              </h2>
            </div>

            <div>
              <p className="work-intro type-lead leading-[1.6] text-[#151817]/82">
                {SELECTED_WORK_SECTION.description}
              </p>
            </div>
          </div>

          <p className="work-intro mt-8 border-l-2 border-[#151817]/25 pl-3.5 text-[0.8rem] leading-relaxed text-[#525852]">
            {SELECTED_WORK_SECTION.note}
          </p>
        </div>

        {/* Three-Project Showcase: Monumental Lead Frame + Balanced Two-Column Pair */}
        <div className="mt-14 space-y-12 sm:mt-18 lg:mt-22 lg:space-y-16">
          {featuredProject && (
            <ProjectPreviewCard project={featuredProject} featured />
          )}

          {pairedProjects.length > 0 && (
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-10">
              {pairedProjects.map((project) => (
                <ProjectPreviewCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
