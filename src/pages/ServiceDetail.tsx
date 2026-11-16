import { useRef } from "react";
import { useParams } from "react-router-dom";
import { contactPath } from "../data/contact";
import { SERVICES, servicePath, type Service } from "../data/services";
import { useEditorialMotion } from "../hooks/useEditorialMotion";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { ServiceHero } from "../components/services/ServiceHero";
import { ServiceIntroduction } from "../components/services/ServiceIntroduction";
import { ServiceOfferings } from "../components/services/ServiceOfferings";
import { ServiceProcess } from "../components/services/ServiceProcess";
import { ServiceBenefits } from "../components/services/ServiceBenefits";
import { ServiceFAQ } from "../components/services/ServiceFAQ";
import { RelatedServices } from "../components/services/RelatedServices";
import { ServiceCTA } from "../components/services/ServiceCTA";
import { NotFound } from "./NotFound";

// Every service URL uses this composition; all service-specific content lives in data.
function ServiceDetailContent({ service }: { service: Service }) {
  const pageRef = useRef<HTMLDivElement>(null);
  useEditorialMotion(pageRef);
  usePageMetadata({
    ...service.seo,
    path: servicePath(service.slug),
    image: service.heroImage.src,
  });

  return (
    <div
      ref={pageRef}
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
    </div>
  );
}

export function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service =
    slug && Object.prototype.hasOwnProperty.call(SERVICES, slug)
      ? SERVICES[slug]
      : undefined;
  if (!service) return <NotFound />;
  return <ServiceDetailContent key={service.slug} service={service} />;
}
