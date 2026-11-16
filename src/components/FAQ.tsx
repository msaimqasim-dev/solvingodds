import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FAQ_CONTENT } from "../data/homepageContent";
import { prefersReducedMotion } from "../utils/smoothScroll";
import { EditorialTag } from "./ui/EditorialTag";
import { SiteLink } from "./ui/SiteLink";

gsap.registerPlugin(ScrollTrigger);

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<string | null>(FAQ_CONTENT.items[0].id);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-line",
        { yPercent: 112 },
        {
          yPercent: 0,
          duration: 1.0,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".faq-header",
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".faq-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-list",
            start: "top 84%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      data-surface="dark"
      aria-labelledby="faq-heading"
      className="so-section relative bg-[#242824] text-white"
    >
      <div className="so-container">
        <div className="flex items-center justify-between border-b border-white/14 pb-5">
          <EditorialTag tone="dark">{FAQ_CONTENT.eyebrow}</EditorialTag>
          <span
            aria-hidden="true"
            className="hidden font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[#A8AEA8] sm:inline"
          >
            [06] QUESTIONS
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-12 sm:mt-14 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Left Sticky Column */}
          <div className="faq-header lg:sticky lg:top-28 lg:col-span-5">
            <h2 id="faq-heading" className="heading-section text-white">
              {FAQ_CONTENT.headlineLines.map((line, index) => (
                <span key={line} className="line-mask">
                  <span className="faq-line line-inner">
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

            <p className="mt-6 max-w-sm text-[0.95rem] leading-[1.65] text-[#A8AEA8]">
              Straightforward details about our services and how we work with
              businesses and healthcare practices.
            </p>

            <SiteLink
              href="/contact"
              className="editorial-link mt-6 inline-flex items-center gap-2 text-[0.84rem] font-medium text-[#B7F536]"
            >
              <span>Have another question? Let's talk</span>
              <svg
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                className="h-3.5 w-3.5"
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

          {/* Right Animated Accordion */}
          <div className="faq-list divide-y divide-white/14 border-t border-b border-white/14 lg:col-span-7">
            {FAQ_CONTENT.items.map((item, idx) => {
              const isOpen = openId === item.id;
              const triggerId = `${item.id}-trigger`;
              const panelId = `${item.id}-panel`;
              const indexLabel = String(idx + 1).padStart(2, "0");

              return (
                <div key={item.id} className="faq-item">
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(item.id)}
                      className="group flex w-full items-start justify-between gap-5 py-6 text-left sm:py-7 cursor-pointer"
                    >
                      <span className="flex items-baseline gap-4 sm:gap-5">
                        <span
                          className={`font-mono text-xs transition-colors duration-300 ${
                            isOpen
                              ? "text-[#B7F536]"
                              : "text-[#A8AEA8] group-hover:text-white"
                          }`}
                        >
                          [{indexLabel}]
                        </span>
                        <span
                          className={`font-display text-[clamp(1.12rem,1.75vw,1.42rem)] font-medium leading-[1.3] tracking-[-0.02em] transition-colors duration-300 ${
                            isOpen
                              ? "text-white"
                              : "text-white/88 group-hover:text-white"
                          }`}
                        >
                          {item.question}
                        </span>
                      </span>

                      {/* Minimal Architectural Plus / Minus Control */}
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px] border transition-colors duration-300 ${
                          isOpen
                            ? "border-[#B7F536] bg-[#B7F536] text-[#151817]"
                            : "border-white/20 text-white group-hover:border-white/50"
                        }`}
                      >
                        <span className="relative block h-3 w-3">
                          <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-current" />
                          <span
                            className={`absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                              isOpen ? "scale-y-0 rotate-90" : "scale-y-100"
                            }`}
                          />
                        </span>
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    aria-hidden={!isOpen}
                    data-open={isOpen}
                    className="accordion-content"
                  >
                    <div className="accordion-inner">
                      <p className="max-w-2xl pb-7 pl-9 pr-4 text-[0.96rem] leading-[1.68] text-[#A8AEA8] sm:pl-11">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
