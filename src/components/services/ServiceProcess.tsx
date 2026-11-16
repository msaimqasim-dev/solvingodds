import { EditorialTag } from "../ui/EditorialTag";
import { EditorialHeading } from "./EditorialHeading";

type ServiceProcessProps = {
  steps: { title: string; description: string }[];
  overview?: boolean;
};

export function ServiceProcess({
  steps,
  overview = false,
}: ServiceProcessProps) {
  return (
    <section
      id="service-process"
      data-surface={overview ? "dark" : "light"}
      className={`so-section ${overview ? "service-dark" : "service-light"}`}
      aria-labelledby="service-process-heading"
    >
      <div className="so-container">
        <div className="service-section-top">
          <EditorialTag tone={overview ? "dark" : "light"}>
            {overview ? "OUR APPROACH" : "HOW WE WORK"}
          </EditorialTag>
          <span className="service-index">
            {overview ? "A SHARED WAY FORWARD" : "[03] THE PROCESS"}
          </span>
        </div>
        <EditorialHeading
          id="service-process-heading"
          lines={
            overview
              ? ["From understanding", "to execution."]
              : ["Clear steps.", "Considered execution."]
          }
          className="mt-10"
        />
        <div className="service-process-sequence">
          <div className="editorial-rule" />
          <ol
            className="service-process-grid"
            style={{ "--process-steps": steps.length } as React.CSSProperties}
          >
            {steps.map((step, index) => (
              <li key={step.title} data-reveal>
                <span className="service-process-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="editorial-rule" />
        </div>
      </div>
    </section>
  );
}
