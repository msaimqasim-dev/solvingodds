import { contactPath } from "../../data/contact";
import type { Service } from "../../data/services";
import { EditorialTag } from "../ui/EditorialTag";
import { FaqAccordion } from "../ui/FaqAccordion";
import { SiteLink } from "../ui/SiteLink";
import { EditorialHeading } from "./EditorialHeading";

export function ServiceFAQ({ service }: { service: Service }) {
  return (
    <section
      id="service-faq"
      data-surface="dark"
      className="so-section service-secondary"
      aria-labelledby="service-faq-heading"
    >
      <div className="so-container">
        <div className="service-section-top">
          <EditorialTag tone="dark">COMMON QUESTIONS</EditorialTag>
          <span className="service-index">[05] A LITTLE CLARITY</span>
        </div>
        <div className="service-faq-layout">
          <div>
            <EditorialHeading
              id="service-faq-heading"
              lines={["Service questions.", "Clear answers."]}
            />
            <p className="service-prose mt-6 max-w-sm">
              A few useful things to know about working with us on{" "}
              {service.title.toLowerCase()}.
            </p>
            <SiteLink
              href={contactPath(service.slug)}
              className="editorial-link mt-6 inline-block text-sm text-[var(--color-accent)]"
            >
              Have another question? Let's talk.
            </SiteLink>
          </div>
          <FaqAccordion items={service.faqs} idPrefix={service.slug} />
        </div>
      </div>
    </section>
  );
}
