import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../../utils/smoothScroll";

export interface AccordionItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: AccordionItem[];
  idPrefix: string;
  defaultOpenIndex?: number | null;
  revealOnScroll?: boolean;
}

export function FaqAccordion({
  items,
  idPrefix,
  defaultOpenIndex = 0,
  revealOnScroll = true,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  useEffect(() => {
    const timer = window.setTimeout(
      () => ScrollTrigger.refresh(),
      prefersReducedMotion() ? 0 : 480,
    );
    return () => window.clearTimeout(timer);
  }, [openIndex]);

  return (
    <div>
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        const id = `${idPrefix}-faq-${index}`;

        return (
          <div
            key={faq.question}
            className="service-faq-item"
            data-reveal={revealOnScroll ? "" : undefined}
          >
            <h3>
              <button
                id={`${id}-trigger`}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-panel`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="service-faq-number">
                  [{String(index + 1).padStart(2, "0")}]
                </span>
                <span className="service-faq-question">{faq.question}</span>
                <span
                  className={`service-faq-toggle ${isOpen ? "is-open" : ""}`}
                  aria-hidden="true"
                >
                  <span />
                  <span />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-panel`}
              role="region"
              aria-labelledby={`${id}-trigger`}
              aria-hidden={!isOpen}
              className="accordion-content"
              data-open={isOpen}
            >
              <div className="accordion-inner">
                <p className="service-faq-answer">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
