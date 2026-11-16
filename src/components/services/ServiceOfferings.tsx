import { useState } from "react";
import type { Service } from "../../data/services";
import { EditorialImage } from "../ui/EditorialImage";
import { EditorialTag } from "../ui/EditorialTag";
import { EditorialHeading } from "./EditorialHeading";

export function ServiceOfferings({ service }: { service: Service }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const image =
    service.offerings[activeIndex]?.image ?? service.introduction.image;
  return (
    <section
      id="offerings"
      data-surface="dark"
      className="so-section service-dark"
      aria-labelledby="offerings-heading"
    >
      <div className="so-container">
        <div className="service-section-top">
          <EditorialTag tone="dark">WHAT WE OFFER</EditorialTag>
          <span className="service-index">[02] CAPABILITIES</span>
        </div>
        <EditorialHeading
          id="offerings-heading"
          lines={["The right details.", "Working together."]}
          className="mt-10 max-w-4xl"
        />
        <div className="service-offerings-layout">
          <figure className="service-offering-preview" data-reveal-image>
            <EditorialImage
              key={image.src}
              src={image.src}
              alt={image.alt}
              fallbackLabel={image.fallbackLabel}
              className="h-full w-full service-preview-image"
            />
            <figcaption>
              <span>{service.discipline}</span>
              <span>[{String(activeIndex + 1).padStart(2, "0")}]</span>
            </figcaption>
          </figure>
          <div>
            <p className="service-preview-hint">
              Select a capability to explore the focus.
            </p>
            <ol>
              {service.offerings.map((offering, index) => (
                <li
                  key={offering.title}
                  className={`service-offering-row ${activeIndex === index ? "is-active" : ""}`}
                >
                  <div className="editorial-rule" />
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    aria-pressed={activeIndex === index}
                    className="service-offering-button"
                    data-reveal
                  >
                    <span className="service-offering-number">
                      [{String(index + 1).padStart(2, "0")}]
                    </span>
                    <span className="min-w-0">
                      <span className="service-offering-title">
                        {offering.title}
                      </span>
                      <span className="service-offering-description">
                        {offering.description}
                      </span>
                    </span>
                    <span className="service-offering-plus" aria-hidden="true">
                      {activeIndex === index ? "-" : "+"}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="editorial-rule" />
          </div>
        </div>
      </div>
    </section>
  );
}
