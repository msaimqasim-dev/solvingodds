import type { Service } from "../../data/services";
import { EditorialImage } from "../ui/EditorialImage";
import { EditorialTag } from "../ui/EditorialTag";
import { EditorialHeading } from "./EditorialHeading";

export function ServiceIntroduction({ service }: { service: Service }) {
  const { introduction } = service;
  return (
    <section
      data-surface="light"
      className="so-section service-light"
      aria-labelledby="service-introduction-heading"
    >
      <div className="so-container">
        <div className="service-section-top">
          <EditorialTag tone="light">THE THINKING BEHIND THE WORK</EditorialTag>
          <span className="service-index">[01] INTRODUCTION</span>
        </div>
        <div className="service-introduction-grid">
          <div>
            <EditorialHeading
              id="service-introduction-heading"
              lines={introduction.headline}
              className="service-intro-heading"
            />
            <p data-reveal className="type-lead service-prose mt-7">
              {introduction.description}
            </p>
            <p data-reveal className="service-prose mt-5">
              {introduction.approach}
            </p>
          </div>
          <figure
            data-reveal-image
            data-parallax-frame
            className="service-introduction-image"
          >
            <div className="editorial-parallax h-full w-full">
              <EditorialImage
                src={introduction.image.src}
                alt={introduction.image.alt}
                fallbackLabel={introduction.image.fallbackLabel}
                tone="light"
                className="h-full w-full"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
