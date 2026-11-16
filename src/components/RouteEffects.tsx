import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToAnchor, scrollToPageTop } from "../utils/smoothScroll";

export function RouteEffects() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map<string, number>());
  const previousKey = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (previousKey.current && previousKey.current !== location.key)
      positions.current.set(previousKey.current, window.scrollY);
    previousKey.current = location.key;
    const restoreTo =
      navigationType === "POP" ? (positions.current.get(location.key) ?? 0) : 0;
    scrollToPageTop(location.hash ? 0 : restoreTo);

    let cancelled = false;
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (location.hash) scrollToAnchor(location.hash, undefined, true);
      const target = location.hash
        ? document.getElementById(location.hash.slice(1))
        : document.getElementById("main-content");
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
  }, [location.key, location.pathname, location.hash, navigationType]);

  return null;
}
