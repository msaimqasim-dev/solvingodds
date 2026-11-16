import type { Service } from "../../data/services";
import { EditorialTag } from "../ui/EditorialTag";
import { EditorialHeading } from "./EditorialHeading";

export function ServiceBenefits({ service }: { service: Service }) {
  return (
    <section
      data-surface="light"
      className="so-section service-light service-benefits-section"
      aria-labelledby="service-benefits-heading"
    >
      <div className="so-container">
        <div className="service-section-top">
          <EditorialTag tone="light">WHY IT MATTERS</EditorialTag>
          <span className="service-index">[04] PRACTICAL VALUE</span>
        </div>
        <div className="service-benefits-layout">
          <EditorialHeading
            id="service-benefits-heading"
            lines={service.benefitsHeadline}
          />
          <ol>
            {service.benefits.map((benefit, index) => (
              <li key={benefit.title} data-reveal>
                <span className="service-benefit-index">
                  [{String(index + 1).padStart(2, "0")}]
                </span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p className="service-prose">{benefit.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
