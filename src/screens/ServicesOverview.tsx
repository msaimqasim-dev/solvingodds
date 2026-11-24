import { EditorialMotion } from "../components/EditorialMotion";
import { SERVICE_LIST, SERVICES_OVERVIEW, servicePath } from "../data/services";
import { ServiceHero } from "../components/services/ServiceHero";
import { EditorialHeading } from "../components/services/EditorialHeading";
import { ServiceProcess } from "../components/services/ServiceProcess";
import { ServiceCTA } from "../components/services/ServiceCTA";
import { EditorialImage } from "../components/ui/EditorialImage";
import { EditorialTag } from "../components/ui/EditorialTag";
import { KineticButton } from "../components/ui/KineticButton";
import { SiteLink } from "../components/ui/SiteLink";

export function ServicesOverview() {

  return (
    <EditorialMotion className="services-page" data-page="services-overview">
      <ServiceHero
        eyebrow={SERVICES_OVERVIEW.eyebrow}
        lines={SERVICES_OVERVIEW.heroLines}
        description={SERVICES_OVERVIEW.description}
        image={SERVICES_OVERVIEW.image}
        position="70% center"
        ctaLabel="Explore Our Expertise"
        ctaHref="#service-collection"
      />

      <section
        data-surface="light"
        className="so-section service-light services-overview-intro"
        aria-labelledby="expertise-intro-heading"
      >
        <div className="so-container">
          <div className="service-section-top">
            <EditorialTag tone="light">WHAT WE DO</EditorialTag>
            <span className="service-index">
              FOCUSED EXPERTISE. CONNECTED THINKING.
            </span>
          </div>
          <div className="services-overview-intro-layout">
            <EditorialHeading
              id="expertise-intro-heading"
              lines={["The right expertise", "for your next move."]}
            />
            <p data-reveal className="type-lead service-prose">
              {SERVICES_OVERVIEW.introduction}
            </p>
          </div>
        </div>
      </section>

      <section
        id="service-collection"
        data-surface="light"
        className="service-light services-collection"
        aria-label="Our three service areas"
      >
        <div className="so-container">
          {SERVICE_LIST.map((service, index) => (
            <article
              key={service.slug}
              className={`overview-service ${index % 2 === 1 ? "overview-service-reversed" : ""}`}
            >
              <div className="editorial-rule" />
              <div className="overview-service-topline">
                <span>[{service.number}]</span>
                <span>{service.discipline}</span>
              </div>
              <div className="overview-service-layout">
                <SiteLink
                  href={servicePath(service.slug)}
                  className="overview-service-visual"
                  aria-label={`Explore ${service.title}`}
                  data-reveal-image
                  data-parallax-frame
                >
                  <div className="editorial-parallax h-full w-full">
                    <EditorialImage
                      src={service.introduction.image.src}
                      alt={service.introduction.image.alt}
                      fallbackLabel={service.introduction.image.fallbackLabel}
                      tone="light"
                      className="h-full w-full"
                    />
                  </div>
                  <span className="overview-image-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="m5 19 14-14M5 5h14v14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </span>
                </SiteLink>
                <div className="overview-service-content">
                  <h2 data-reveal-heading className="overview-service-name">
                    <span className="line-mask">
                      <span className="line-inner">
                        <SiteLink href={servicePath(service.slug)}>
                          {service.title}
                        </SiteLink>
                      </span>
                    </span>
                  </h2>
                  <h3 data-reveal>{service.overview.headline}</h3>
                  <p data-reveal className="service-prose">
                    {service.overview.description}
                  </p>
                  <ul data-reveal className="overview-capabilities">
                    {service.overview.capabilities.map((capability) => (
                      <li key={capability}>
                        <span aria-hidden="true" />
                        {capability}
                      </li>
                    ))}
                  </ul>
                  <div data-reveal className="overview-service-cta">
                    <KineticButton
                      label={service.overview.label}
                      href={servicePath(service.slug)}
                      variant="editorialLight"
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
          <div className="editorial-rule" />
        </div>
      </section>

      <ServiceProcess steps={SERVICES_OVERVIEW.process} overview />
      <ServiceCTA content={SERVICES_OVERVIEW.cta} />
    </EditorialMotion>
  );
}
