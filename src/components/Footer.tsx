import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "../data/homepageContent";
import { SERVICE_LIST, servicePath } from "../data/services";
import { prefersReducedMotion, scrollToPageTop } from "../utils/smoothScroll";
import { SiteLink } from "./ui/SiteLink";

gsap.registerPlugin(ScrollTrigger);

const FOOTER_NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/#work" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const { pathname } = useLocation();
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();
  const contactCtaHref = pathname === "/contact" ? "#contact-form" : "/contact";

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-col",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 86%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".footer-wordmark-inner",
        { yPercent: 105 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".footer-wordmark",
            start: "top 92%",
            once: true,
          },
        },
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      data-surface="dark"
      className="relative overflow-hidden bg-[#151817] pt-16 pb-10 text-white sm:pt-22 sm:pb-12"
    >
      <div className="so-container">
        {/* Editorial Upper Grid */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/14 pb-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:pb-18">
          {/* Agency Summary & Contact CTA */}
          <div className="footer-col sm:col-span-2 lg:col-span-5">
            <p className="max-w-md text-[0.98rem] leading-[1.65] text-[#A8AEA8]">
              {BRAND.footerSummary}
            </p>
            <a
              href="mailto:saim@solvingodds.com"
              className="editorial-link mt-5 inline-block break-all text-[0.98rem] text-white transition-colors hover:text-[#B7F536]"
            >
              saim@solvingodds.com
            </a>

            <div className="mt-7 flex flex-wrap items-center gap-5">
              <SiteLink
                href={contactCtaHref}
                className="group inline-flex h-11 items-center gap-2.5 rounded-[2px] border border-[#B7F536] bg-[#B7F536] px-5 text-[0.83rem] font-semibold text-[#151817] transition-colors hover:bg-[#c5f85a]"
              >
                <span>Start a Conversation</span>
                <svg
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path
                    d="M2.5 11.5L11.5 2.5M11.5 2.5H4.25M11.5 2.5V9.75"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </SiteLink>

              <a
                href={BRAND.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-white transition-colors hover:text-[#B7F536]"
              >
                <span>{BRAND.websiteLabel}</span>
                <svg
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                  className="h-3 w-3"
                >
                  <path
                    d="M2.5 11.5L11.5 2.5M11.5 2.5H4.25M11.5 2.5V9.75"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Internal Homepage Navigation */}
          <nav
            aria-label="Footer navigation"
            className="footer-col lg:col-span-3 lg:col-start-7"
          >
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#A8AEA8]">
              Navigation
            </p>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <SiteLink
                    href={item.href}
                    className="editorial-link text-[0.9rem] text-white/82 transition-colors hover:text-white"
                  >
                    {item.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Service Categories (+ Verified Social Links only if supplied) */}
          <div className="footer-col flex flex-col justify-between gap-8 lg:col-span-3">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#A8AEA8]">
                Services
              </p>
              <ul className="mt-4 space-y-0.5">
                {SERVICE_LIST.map((service) => (
                  <li key={service.id}>
                    <SiteLink
                      href={servicePath(service.slug)}
                      className="editorial-link inline-block py-1 text-[0.9rem] text-white/82 transition-colors hover:text-white"
                    >
                      {service.title}
                    </SiteLink>
                  </li>
                ))}
              </ul>

              {BRAND.socialLinks.length > 0 && (
                <div className="mt-8">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#A8AEA8]">
                    Social
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-4">
                    {BRAND.socialLinks.map((social) => (
                      <li key={social.url}>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="editorial-link text-[0.88rem] text-white/82 hover:text-[#B7F536]"
                        >
                          {social.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <SiteLink
              href="#site-top"
              onClick={(event) => {
                event.preventDefault();
                scrollToPageTop();
              }}
              className="group inline-flex items-center gap-2 self-start font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[#A8AEA8] transition-colors hover:text-[#B7F536]"
            >
              <span>Back to top</span>
              <span
                aria-hidden="true"
                className="inline-flex h-6 w-6 items-center justify-center rounded-[2px] border border-white/18 transition-colors group-hover:border-[#B7F536]"
              >
                <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
                  <path
                    d="M6 9.5V2.5M6 2.5L2.75 5.75M6 2.5L9.25 5.75"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="square"
                  />
                </svg>
              </span>
            </SiteLink>
          </div>
        </div>

        {/* Stodio-Inspired Large-Format Editorial Wordmark */}
        <div
          aria-hidden="true"
          className="footer-wordmark overflow-hidden pt-10 pb-8 sm:pt-14 sm:pb-10"
        >
          <p className="footer-wordmark-inner font-display select-none text-[clamp(2.65rem,13vw,11.75rem)] font-bold leading-[0.88] tracking-[-0.052em] text-white will-change-transform">
            Solving
            <span className="font-medium text-white/92">Odds</span>
            <span className="text-[#B7F536]">.</span>
          </p>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col gap-3 border-t border-white/14 pt-6 text-[0.78rem] text-[#A8AEA8] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear} {BRAND.name}. All rights reserved.
          </p>
          <p>{BRAND.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
