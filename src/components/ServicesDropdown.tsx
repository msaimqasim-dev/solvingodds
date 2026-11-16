import { useEffect, useRef, useState } from "react";
import { SERVICE_LIST, servicePath } from "../data/services";
import { SiteLink } from "./ui/SiteLink";

export function ServicesDropdown({
  light,
  active,
}: {
  light: boolean;
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`services-nav-disclosure ${light ? "on-light" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          buttonRef.current?.focus();
        }
        if (event.key === "ArrowDown" && event.target === buttonRef.current) {
          event.preventDefault();
          setOpen(true);
          requestAnimationFrame(() =>
            rootRef.current
              ?.querySelector<HTMLAnchorElement>(".services-nav-dropdown a")
              ?.focus(),
          );
        }
      }}
    >
      <SiteLink
        href="/services"
        onClick={() => setOpen(false)}
        aria-current={active ? "page" : undefined}
        className="editorial-link services-nav-label"
      >
        {active && (
          <span aria-hidden="true" className="services-nav-active-dot" />
        )}
        Services
      </SiteLink>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-label="Toggle services submenu"
        aria-expanded={open}
        aria-controls="desktop-services-submenu"
        className="services-nav-toggle"
      >
        <svg
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
        >
          <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </button>
      <div
        id="desktop-services-submenu"
        className={`services-nav-dropdown ${open ? "is-open" : ""}`}
        inert={!open}
      >
        <ul>
          <li>
            <SiteLink href="/services" onClick={() => setOpen(false)}>
              <span className="services-dropdown-code">ALL</span>
              <span>All Services</span>
              <span aria-hidden="true">/</span>
            </SiteLink>
          </li>
          {SERVICE_LIST.map((service) => (
            <li key={service.slug}>
              <SiteLink
                href={servicePath(service.slug)}
                onClick={() => setOpen(false)}
              >
                <span className="services-dropdown-code">{service.number}</span>
                <span>{service.title}</span>
                <span aria-hidden="true">/</span>
              </SiteLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
