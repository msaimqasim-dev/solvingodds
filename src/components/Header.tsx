"use client";

import { useEffect, useRef, useState } from "react";
import { BRAND, NAV_ITEMS } from "../data/homepageContent";
import { SERVICE_LIST, servicePath } from "../data/services";
import { setScrollLocked } from "../utils/smoothScroll";
import { BrandMark } from "./ui/BrandMark";
import { KineticButton } from "./ui/KineticButton";
import { SiteLink } from "./ui/SiteLink";
import { ServicesDropdown } from "./ServicesDropdown";

export function Header({ pathname }: { pathname: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [overLight, setOverLight] = useState(false);
  const routeActiveHref = pathname.startsWith("/services")
    ? "/services"
    : pathname === "/about"
      ? "/about"
      : pathname === "/contact"
        ? "/contact"
        : "/";
  const [activeHref, setActiveHref] = useState(routeActiveHref);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);

  // Adaptive contrast and active section detection
  useEffect(() => {
    let ticking = false;

    const evaluateHeader = () => {
      const y = window.scrollY;
      setScrolled(y > 36);

      // Detect which section sits directly behind the header bar
      const probeY = 42;
      const surfaces = document.querySelectorAll<HTMLElement>(
        "main [data-surface], footer[data-surface]",
      );
      let detectedSurface = "dark";

      surfaces.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY) {
          detectedSurface = el.dataset.surface || "dark";
        }
      });

      setOverLight(detectedSurface === "light" && y > 36);

      // Detect current active nav item
      if (pathname !== "/") {
        setActiveHref(routeActiveHref);
      } else {
        const sectionOrder = [
          { id: "home", href: "/" },
          { id: "services", href: "/services" },
          { id: "work", href: "/#work" },
          { id: "approach", href: "/" },
          { id: "contact", href: "/contact" },
        ];
        const navProbe = window.innerHeight * 0.35;
        let current = "/";

        for (const section of sectionOrder) {
          const el = document.getElementById(section.id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= navProbe) {
            current = section.href;
          }
        }
        setActiveHref(current);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(evaluateHeader);
        ticking = true;
      }
    };

    evaluateHeader();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Mobile menu scroll lock, keyboard escape, and focus handling
  useEffect(() => {
    if (!menuOpen) return;

    setScrollLocked(true);
    const focusTimer = window.setTimeout(() => {
      firstMobileLinkRef.current?.focus();
    }, 80);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        const items = [
          toggleRef.current,
          ...Array.from(
            mobileDrawerRef.current?.querySelectorAll<HTMLElement>(
              "a[href], button",
            ) ?? [],
          ),
        ].filter((element): element is HTMLElement =>
          Boolean(
            element &&
            element.offsetParent !== null &&
            !element.closest("[inert]"),
          ),
        );
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      setScrollLocked(false);
    };
  }, [menuOpen]);

  const isLightBar = overLight && !menuOpen;

  const headerBgClass = menuOpen
    ? "bg-[#151817] border-b border-white/12"
    : !scrolled
      ? "bg-transparent border-b border-transparent"
      : isLightBar
        ? "bg-[#F6F7F2]/95 border-b border-[#151817]/12"
        : "bg-[#151817]/95 border-b border-white/12";

  const handleMobileNavigate = () => {
    setMenuOpen(false);
    setScrollLocked(false);
  };

  return (
    <>
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-[2px] focus:bg-[#B7F536] focus:px-4 focus:py-2.5 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.12em] focus:text-[#151817]"
      >
        Skip to main content
      </a>

      <header
        data-surface={isLightBar ? "light" : "dark"}
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,padding] duration-300 ${headerBgClass}`}
      >
        <div className="so-container flex h-[4.75rem] items-center justify-between lg:h-[5.25rem]">
          {/* Brand Wordmark */}
          <SiteLink
            href="/"
            aria-label={`${BRAND.name} home`}
            onClick={handleMobileNavigate}
            className="group relative z-50 inline-flex items-center py-1"
          >
            <BrandMark tone={isLightBar ? "dark" : "light"} />
          </SiteLink>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-8 lg:flex xl:gap-10"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeHref === item.href;
              if (item.href === "/services")
                return (
                  <ServicesDropdown
                    key={item.href}
                    light={isLightBar}
                    active={isActive}
                  />
                );
              return (
                <SiteLink
                  key={item.href}
                  href={item.href}
                  aria-current={
                    isActive
                      ? item.href.includes("#")
                        ? "location"
                        : "page"
                      : undefined
                  }
                  className={`editorial-link relative inline-flex items-center gap-1.5 py-1 text-[0.84rem] font-medium tracking-[-0.005em] transition-colors duration-200 ${
                    isLightBar
                      ? isActive
                        ? "text-[#151817]"
                        : "text-[#151817]/70 hover:text-[#151817]"
                      : isActive
                        ? "text-white"
                        : "text-white/75 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-[1px] bg-[#B7F536] ${
                        isLightBar ? "ring-1 ring-[#151817]/35" : ""
                      }`}
                    />
                  )}
                  <span>{item.label}</span>
                </SiteLink>
              );
            })}
          </nav>

          {/* Desktop Primary CTA */}
          <div className="hidden items-center lg:flex">
            <KineticButton
              label="Let's Talk"
              href="/contact"
              variant={isLightBar ? "dark" : "accent"}
              size="sm"
            />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`relative z-50 inline-flex h-10 items-center gap-2.5 rounded-[2px] border px-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors lg:hidden cursor-pointer ${
              isLightBar
                ? "border-[#151817]/22 text-[#151817] hover:border-[#151817]"
                : "border-white/24 text-white hover:border-[#B7F536]"
            }`}
          >
            <span>{menuOpen ? "Close" : "Menu"}</span>
            <span
              aria-hidden="true"
              className="relative flex h-3 w-4 flex-col justify-between"
            >
              <span
                className={`block h-[1.5px] w-full bg-current transition-transform duration-300 ${
                  menuOpen ? "translate-y-[5.25px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-full bg-current transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-[1.5px] w-full bg-current transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[5.25px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Expandable Mobile Navigation Overlay */}
      <div
        ref={mobileDrawerRef}
        id="mobile-navigation-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        data-lenis-prevent
        className={`fixed inset-0 z-30 flex flex-col justify-between overflow-y-auto bg-[#151817] pt-24 pb-8 text-white transition-[opacity,visibility,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0 pointer-events-none"
        }`}
      >
        <div className="so-container flex flex-1 flex-col justify-between gap-10">
          <nav
            aria-label="Mobile navigation links"
            className="border-t border-white/14"
          >
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeHref === item.href;
              return (
                <div key={item.href} className="relative">
                  <SiteLink
                    ref={idx === 0 ? firstMobileLinkRef : undefined}
                    href={item.href}
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={handleMobileNavigate}
                    className="group flex items-baseline justify-between border-b border-white/14 py-4 transition-colors hover:border-[#B7F536]"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-[#A8AEA8] group-hover:text-[#B7F536]">
                        [{item.index}]
                      </span>
                      <span
                        className={`font-display text-[clamp(1.75rem,7vw,2.4rem)] font-semibold tracking-[-0.03em] transition-colors ${
                          isActive
                            ? "text-[#B7F536]"
                            : "text-white group-hover:text-[#B7F536]"
                        }`}
                      >
                        {item.label}
                      </span>
                    </span>
                    {item.href !== "/services" && (
                      <svg
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                        className="h-4 w-4 text-[#A8AEA8] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#B7F536]"
                      >
                        <path
                          d="M2.5 11.5L11.5 2.5M11.5 2.5H4.25M11.5 2.5V9.75"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="square"
                        />
                      </svg>
                    )}
                  </SiteLink>
                  {item.href === "/services" && (
                    <>
                      <button
                        type="button"
                        className="absolute top-4 right-0 flex h-10 w-10 items-center justify-center border border-white/20 text-white"
                        aria-label="Toggle mobile services submenu"
                        aria-expanded={mobileServicesOpen}
                        aria-controls="mobile-services-submenu"
                        onClick={() =>
                          setMobileServicesOpen((previous) => !previous)
                        }
                      >
                        <svg
                          viewBox="0 0 12 12"
                          fill="none"
                          aria-hidden="true"
                          className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                        >
                          <path
                            d="m3 4.5 3 3 3-3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </button>
                      <div
                        id="mobile-services-submenu"
                        className="accordion-content"
                        data-open={mobileServicesOpen}
                        inert={!mobileServicesOpen}
                      >
                        <div className="accordion-inner">
                          <ul className="border-b border-white/14 py-3 pl-9 text-sm text-[#A8AEA8]">
                            <li>
                              <SiteLink
                                href="/services"
                                onClick={handleMobileNavigate}
                                className="block py-3 hover:text-[#B7F536]"
                              >
                                All Services
                              </SiteLink>
                            </li>
                            {SERVICE_LIST.map((service) => (
                              <li key={service.slug}>
                                <SiteLink
                                  href={servicePath(service.slug)}
                                  onClick={handleMobileNavigate}
                                  className="block py-3 hover:text-[#B7F536]"
                                >
                                  {service.title}
                                </SiteLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Service Pillars + Mobile CTA */}
          <div className="space-y-6">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#A8AEA8]">
                Service Pillars
              </p>
              <div className="mt-2.5 flex flex-col gap-1.5 text-sm text-white/80">
                {SERVICE_LIST.map((service) => (
                  <SiteLink
                    key={service.id}
                    href={servicePath(service.slug)}
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={handleMobileNavigate}
                    className="py-0.5 transition-colors hover:text-[#B7F536]"
                  >
                    {service.number} — {service.title}
                  </SiteLink>
                ))}
              </div>
            </div>

            <SiteLink
              href="/contact"
              tabIndex={menuOpen ? 0 : -1}
              onClick={handleMobileNavigate}
              className="flex h-13 w-full items-center justify-between rounded-[2px] bg-[#B7F536] px-5 text-[0.9rem] font-semibold text-[#151817] transition-colors hover:bg-[#c5f85a]"
            >
              <span>Let's Talk</span>
              <svg
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path
                  d="M2.5 11.5L11.5 2.5M11.5 2.5H4.25M11.5 2.5V9.75"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="square"
                />
              </svg>
            </SiteLink>
          </div>
        </div>
      </div>
    </>
  );
}
