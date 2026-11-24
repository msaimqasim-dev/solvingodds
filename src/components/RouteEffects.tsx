"use client";

import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { initSmoothScroll, scrollToAnchor, scrollToPageTop } from "../utils/smoothScroll";

export function SiteChrome({ placement }: { placement: "header" | "footer" }) {
  // The shared 404 HTML is prerendered for a route segment, then served at
  // arbitrary URLs. Use the rendered segments so the chrome hydrates evenly.
  const pathname = "/" + useSelectedLayoutSegments().join("/");
  const Component = placement === "header" ? Header : Footer;
  return <Component key={pathname} pathname={pathname} />;
}

export function RouteEffects() {
  const pathname = usePathname();
  const positions = useRef(new Map<string, number>());
  const previousPath = useRef<string | null>(null);
  const isPop = useRef(false);

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const destroy = initSmoothScroll();
    const onPop = () => { isPop.current = true; };
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      destroy();
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    if (previousPath.current !== null) {
      positions.current.set(previousPath.current, window.scrollY);
    }
    const { href, hash } = window.location;
    previousPath.current = href;
    const restoreTo = isPop.current ? (positions.current.get(href) ?? 0) : 0;
    isPop.current = false;
    scrollToPageTop(hash ? 0 : restoreTo);

    let cancelled = false;
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (hash) scrollToAnchor(hash, undefined, true);
      const target = document.getElementById(hash ? hash.slice(1) : "main-content");
      if (target) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
