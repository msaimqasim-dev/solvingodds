import { EditorialTag } from "../ui/EditorialTag";
import { KineticButton } from "../ui/KineticButton";
import { EditorialHeading } from "./EditorialHeading";

type ServiceCTAProps = {
  content: { headline: string[]; description: string; label: string };
  ctaHref?: string;
  eyebrow?: string;
  note?: string;
};

export function ServiceCTA({
  content,
  ctaHref = "/contact",
  eyebrow = "LET'S MAKE A START",
  note,
}: ServiceCTAProps) {
  return (
    <section
      data-surface="accent"
      className="so-section service-conversion"
      aria-labelledby="service-cta-heading"
    >
      <div className="so-container">
        <div className="service-section-top">
          <EditorialTag tone="accent">{eyebrow}</EditorialTag>
          <span className="service-index">SOLVINGODDS.COM</span>
        </div>
        <EditorialHeading
          id="service-cta-heading"
          lines={content.headline}
          className="service-cta-heading"
        />
        <div className="service-cta-bottom">
          <div data-reveal>
            <p>{content.description}</p>
            {note && <p className="service-inquiry-note">{note}</p>}
          </div>
          <div data-reveal>
            <KineticButton
              label={content.label}
              href={ctaHref}
              variant="dark"
              size="lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
