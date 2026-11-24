import { EditorialMotion } from "../components/EditorialMotion";
import { contactPath } from "../data/contact";
import type { Service } from "../data/services";
import { ServiceHero } from "../components/services/ServiceHero";
import { ServiceIntroduction } from "../components/services/ServiceIntroduction";
import { ServiceOfferings } from "../components/services/ServiceOfferings";
import { ServiceProcess } from "../components/services/ServiceProcess";
import { ServiceBenefits } from "../components/services/ServiceBenefits";
import { ServiceFAQ } from "../components/services/ServiceFAQ";
import { RelatedServices } from "../components/services/RelatedServices";
import { ServiceCTA } from "../components/services/ServiceCTA";

// Every service URL uses this composition; all service-specific content lives in data.
export function ServiceDetail({ service }: { service: Service }) {
  return (
    <EditorialMotion
      className="services-page"
      data-page="service-detail"
      data-service={service.slug}
    >
      <ServiceHero
        eyebrow={service.eyebrow}
        lines={service.heroLines}
        description={service.heroDescription}
        image={service.heroImage}
        position={service.heroPosition}
        breadcrumb={service.shortTitle}
        ctaLabel="Start a Conversation"
        ctaHref={contactPath(service.slug)}
      />
      <ServiceIntroduction service={service} />
      <ServiceOfferings service={service} />
      <ServiceProcess steps={service.process} />
      <ServiceBenefits service={service} />
      <ServiceFAQ service={service} />
      <RelatedServices currentSlug={service.slug} />
      <ServiceCTA
        content={service.cta}
        ctaHref={contactPath(service.slug)}
        note={service.inquiryNote}
      />
    </EditorialMotion>
  );
}

