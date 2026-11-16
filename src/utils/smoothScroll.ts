import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function initSmoothScroll(): () => void {
  if (typeof window === "undefined" || prefersReducedMotion()) {
    return () => {};
  }

  // Keep native momentum scrolling on touch devices for natural responsiveness
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  if (isCoarsePointer) {
    return () => {};
  }

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.2,
  });

  lenisInstance = lenis;

  const onScroll = () => {
    ScrollTrigger.update();
  };

  lenis.on("scroll", onScroll);

  const rafCallback = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(rafCallback);
  gsap.ticker.lagSmoothing(0);

  return () => {
    lenis.off("scroll", onScroll);
    gsap.ticker.remove(rafCallback);
    lenis.destroy();
    lenisInstance = null;
  };
}

export function setScrollLocked(locked: boolean): void {
  if (typeof document === "undefined") return;

  if (lenisInstance) {
    if (locked) {
      lenisInstance.stop();
    } else {
      lenisInstance.start();
    }
  }

  document.body.style.overflow = locked ? "hidden" : "";
}

export function scrollToPageTop(top = 0): void {
  lenisInstance?.resize();
  lenisInstance?.scrollTo(top, { immediate: true, force: true });
  window.scrollTo({ top, behavior: "instant" });
  ScrollTrigger.update();
}

export function scrollToAnchor(
  href: string,
  event?: React.MouseEvent<HTMLElement>,
  immediate = false,
): void {
  if (!href.startsWith("#")) return;

  const targetId = href.slice(1);
  const target =
    targetId === "home" || targetId === ""
      ? document.getElementById("home") || document.body
      : document.getElementById(targetId);

  if (!target) return;

  if (event) {
    event.preventDefault();
  }

  const isTop = targetId === "home" || targetId === "";
  const headerOffset = isTop ? 0 : -72;
  const top = isTop
    ? 0
    : target.getBoundingClientRect().top + window.scrollY + headerOffset;

  if (lenisInstance && !prefersReducedMotion()) {
    // A numeric destination avoids applying CSS scroll padding a second time.
    // Route changes also need current dimensions before a distant anchor jump.
    lenisInstance.resize();
    lenisInstance.scrollTo(top, {
      immediate,
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
  } else {
    window.scrollTo({
      top,
      behavior: immediate || prefersReducedMotion() ? "instant" : "smooth",
    });
  }

  // Update URL hash cleanly without causing a jarring jump
  if (window.history?.replaceState) {
    window.history.replaceState(
      window.history.state,
      "",
      isTop ? "#home" : href,
    );
  }
}
