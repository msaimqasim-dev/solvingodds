import { SERVICE_LIST, servicePath } from "../../data/services";
import { EditorialImage } from "../ui/EditorialImage";
import { EditorialTag } from "../ui/EditorialTag";
import { SiteLink } from "../ui/SiteLink";
import { EditorialHeading } from "./EditorialHeading";

export function RelatedServices({ currentSlug }: { currentSlug: string }) {
  return (
    <section
      data-surface="light"
      className="so-section service-light"
      aria-labelledby="related-services-heading"
    >
      <div className="so-container">
        <div className="service-section-top">
          <EditorialTag tone="light">EXPLORE OTHER SERVICES</EditorialTag>
          <span className="service-index">
            DIFFERENT SKILLS. ONE DIRECTION.
          </span>
        </div>
        <EditorialHeading
          id="related-services-heading"
          lines={["What else is", "on your horizon?"]}
          className="mt-10"
        />
        <div className="related-services-grid">
          {SERVICE_LIST.filter((service) => service.slug !== currentSlug).map(
            (service) => (
              <SiteLink
                key={service.slug}
                href={servicePath(service.slug)}
                className="related-service-link"
              >
                <div data-reveal-image className="related-service-image">
                  <EditorialImage
                    src={service.heroImage.src}
                    alt={service.heroImage.alt}
                    fallbackLabel={service.heroImage.fallbackLabel}
                    tone="light"
                    className="h-full w-full"
                  />
                </div>
                <div className="related-service-caption">
                  <span className="service-index">
                    [{service.number}] {service.discipline}
                  </span>
                  <span className="related-service-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 19 19 5M5 5h14v14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </span>
                  <h3>{service.title}</h3>
                </div>
              </SiteLink>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
