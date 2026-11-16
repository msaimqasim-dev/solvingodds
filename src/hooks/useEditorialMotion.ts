import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useEditorialMotion(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (!scope.current) return;
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils
          .toArray<HTMLElement>("[data-reveal-heading]")
          .forEach((heading) => {
            gsap.fromTo(
              heading.querySelectorAll(".line-inner"),
              { yPercent: 110 },
              {
                yPercent: 0,
                duration: 0.95,
                stagger: 0.095,
                ease: "power4.out",
                scrollTrigger: {
                  trigger: heading,
                  start: "top 88%",
                  once: true,
                },
              },
            );
          });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 91%", once: true },
            },
          );
        });
        gsap.utils.toArray<HTMLElement>(".editorial-rule").forEach((rule) => {
          gsap.fromTo(
            rule,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.1,
              ease: "expo.out",
              scrollTrigger: { trigger: rule, start: "top 94%", once: true },
            },
          );
        });
        gsap.utils
          .toArray<HTMLElement>("[data-reveal-image]")
          .forEach((frame) => {
            gsap.fromTo(
              frame,
              { clipPath: "inset(9% 0 0 0)", opacity: 0.4 },
              {
                clipPath: "inset(0% 0 0 0)",
                opacity: 1,
                duration: 1.1,
                ease: "power4.out",
                scrollTrigger: { trigger: frame, start: "top 90%", once: true },
              },
            );
          });
      });
      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.utils
            .toArray<HTMLElement>("[data-parallax-frame]")
            .forEach((frame) => {
              const image = frame.querySelector(".editorial-parallax");
              if (!image) return;
              gsap.fromTo(
                image,
                { yPercent: -4 },
                {
                  yPercent: 4,
                  ease: "none",
                  scrollTrigger: {
                    trigger: frame,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.65,
                  },
                },
              );
            });
        },
      );
    }, scope);
    return () => {
      media.revert();
      context.revert();
    };
  }, [scope]);
}
