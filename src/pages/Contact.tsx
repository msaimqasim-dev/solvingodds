import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useSearchParams } from "react-router-dom";
import gsap from "gsap";
import {
  CONTACT_PAGE,
  CONTACT_SERVICE_OPTIONS,
  getServiceLabelByValue,
  resolveServiceFromQuery,
  type ContactServiceValue,
} from "../data/contact";
import {
  submitContactInquiry,
  validateContactField,
  validateContactForm,
  type ContactFieldName,
  type ContactFormErrors,
  type ContactFormValues,
  type ContactSubmissionResult,
} from "../services/contactSubmission";
import { useEditorialMotion } from "../hooks/useEditorialMotion";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { EditorialHeading } from "../components/services/EditorialHeading";
import { EditorialTag } from "../components/ui/EditorialTag";
import { FaqAccordion } from "../components/ui/FaqAccordion";
import { SiteLink } from "../components/ui/SiteLink";

const FIELD_ORDER: ContactFieldName[] = [
  "fullName",
  "email",
  "company",
  "service",
  "message",
];

function createInitialValues(
  preselectedService: ContactServiceValue | "",
): ContactFormValues {
  return {
    fullName: "",
    email: "",
    company: "",
    service: preselectedService,
    message: "",
    website: "",
  };
}

export function Contact() {
  const [searchParams] = useSearchParams();
  const queryService = resolveServiceFromQuery(searchParams.get("service"));

  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const [values, setValues] = useState<ContactFormValues>(() =>
    createInitialValues(queryService),
  );
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<ContactFieldName, boolean>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ContactSubmissionResult | null>(null);
  const [submittedServiceLabel, setSubmittedServiceLabel] = useState("");

  useEditorialMotion(pageRef);
  usePageMetadata({
    ...CONTACT_PAGE.seo,
    path: "/contact",
  });

  // Sync service dropdown whenever URL ?service= parameter changes
  useEffect(() => {
    if (queryService) {
      setValues((prev) => ({ ...prev, service: queryService }));
      setErrors((prev) => ({ ...prev, service: undefined }));
    }
  }, [queryService]);

  // Restrained, rapid hero entrance that keeps focus on usability
  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo(
            ".contact-hero-meta",
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.07 },
            0.05,
          )
          .fromTo(
            ".contact-hero-line",
            { yPercent: 108 },
            { yPercent: 0, duration: 0.9, stagger: 0.09, ease: "power4.out" },
            0.14,
          )
          .fromTo(
            ".contact-hero-copy",
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 },
            0.38,
          );
      });
    }, hero);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  const handleFieldChange = (
    field: ContactFieldName,
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const nextValue = event.target.value;
    const nextValues: ContactFormValues = {
      ...values,
      [field]: nextValue,
    } as ContactFormValues;

    setValues(nextValues);

    if (result && result.status !== "success") {
      setResult(null);
    }

    if (touched[field] || errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validateContactField(field, nextValues),
      }));
    }
  };

  const handleFieldBlur = (field: ContactFieldName) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateContactField(field, values),
    }));
  };

  const focusFirstInvalidField = (fieldErrors: ContactFormErrors) => {
    const firstField = FIELD_ORDER.find((field) => Boolean(fieldErrors[field]));
    if (!firstField || !formRef.current) return;
    const element = formRef.current.querySelector<HTMLElement>(
      `[name="${firstField}"]`,
    );
    element?.focus();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const allTouched: Partial<Record<ContactFieldName, boolean>> = {
      fullName: true,
      email: true,
      company: true,
      service: true,
      message: true,
    };
    setTouched(allTouched);

    const clientErrors = validateContactForm(values);
    setErrors(clientErrors);

    if (Object.keys(clientErrors).length > 0) {
      setResult({
        status: "validation_error",
        message: "Please review the highlighted fields before sending.",
        fieldErrors: clientErrors,
      });
      focusFirstInvalidField(clientErrors);
      return;
    }

    setSubmitting(true);
    setResult(null);

    try {
      const submissionResult = await submitContactInquiry(values);

      if (submissionResult.status === "validation_error") {
        setErrors(submissionResult.fieldErrors);
        setResult(submissionResult);
        focusFirstInvalidField(submissionResult.fieldErrors);
        return;
      }

      if (submissionResult.status === "success") {
        const chosenService = values.service as ContactServiceValue;
        setSubmittedServiceLabel(getServiceLabelByValue(chosenService));
        setValues(createInitialValues(queryService));
        setTouched({});
        setErrors({});
      }

      setResult(submissionResult);
      requestAnimationFrame(() => {
        statusRef.current?.focus();
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAfterSuccess = () => {
    setResult(null);
    setSubmittedServiceLabel("");
    requestAnimationFrame(() => {
      formRef.current
        ?.querySelector<HTMLInputElement>('[name="fullName"]')
        ?.focus();
    });
  };

  const isMedicalContext =
    values.service === "medical-billing" ||
    values.service === "multiple-services";

  const inputBaseClass =
    "mt-2.5 block w-full rounded-[2px] border bg-white px-4 text-[0.98rem] text-[#151817] placeholder:text-[#525852]/65 transition-colors duration-200 focus:border-[#151817] focus:outline-2 focus:outline-offset-2 focus:outline-[#151817] disabled:cursor-not-allowed disabled:opacity-60";

  const fieldBorderClass = (field: ContactFieldName) =>
    errors[field]
      ? "border-[#9E1F1F] bg-[#FFF8F8]"
      : "border-[#151817]/22 hover:border-[#151817]/48";

  const { hero, form, faq } = CONTACT_PAGE;

  return (
    <div ref={pageRef} className="services-page" data-page="contact">
      {/* SECTION 01 — Restrained Editorial Contact Hero */}
      <section
        ref={heroRef}
        id="page-top"
        data-surface="dark"
        aria-labelledby="page-heading"
        className="relative bg-[#151817] pt-28 pb-14 text-white sm:pt-34 sm:pb-18 lg:pt-38 lg:pb-20"
      >
        <div className="so-container">
          <nav
            aria-label="Breadcrumb"
            className="contact-hero-meta service-breadcrumb"
          >
            <ol>
              <li>
                <SiteLink href="/" className="inline-block py-1">
                  Home
                </SiteLink>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span aria-current="page">Contact</span>
              </li>
            </ol>
          </nav>

          <div className="contact-hero-meta flex flex-wrap items-center justify-between gap-4 border-b border-white/14 pb-5">
            <EditorialTag tone="dark">{hero.eyebrow}</EditorialTag>
            <span
              aria-hidden="true"
              className="hidden font-mono text-[0.68rem] uppercase tracking-[0.15em] text-[#A8AEA8] sm:inline"
            >
              SOLVINGODDS.COM
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-7">
              <h1
                id="page-heading"
                className="font-display text-[clamp(2.35rem,6vw,5.5rem)] font-semibold leading-[0.97] tracking-[-0.044em] text-white"
              >
                {hero.headlineLines.map((line, index) => (
                  <span key={line} className="line-mask">
                    <span className="contact-hero-line line-inner">
                      {index === hero.headlineLines.length - 1 ? (
                        <>
                          {line.slice(0, -1)}
                          <span className="text-[#B7F536]">.</span>
                        </>
                      ) : (
                        line
                      )}
                    </span>
                  </span>
                ))}
              </h1>
            </div>

            <div className="lg:col-span-5">
              <p className="contact-hero-copy type-lead max-w-lg leading-[1.62] text-white/80">
                {hero.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02 — Inquiry Form */}
      <section
        id="contact-form"
        data-surface="light"
        aria-labelledby="contact-form-heading"
        className="so-section scroll-mt-20 bg-[#F6F7F2] text-[#151817]"
      >
        <div className="so-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
            {/* Left Intro Column */}
            <div className="lg:sticky lg:top-28 lg:col-span-5">
              <EditorialTag tone="light">{form.eyebrow}</EditorialTag>

              <h2
                id="contact-form-heading"
                className="font-display mt-5 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.038em] text-[#151817]"
              >
                {form.heading}
              </h2>

              <p className="type-lead mt-5 max-w-md leading-[1.65] text-[#525852]">
                {form.description}
              </p>
              <div className="mt-6">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#525852]">
                  Email us
                </p>
                <a
                  href="mailto:saim@solvingodds.com"
                  className="editorial-link mt-2 inline-block break-all text-[1.05rem] font-medium text-[#151817] underline decoration-[#151817]/30 underline-offset-4 transition-colors hover:decoration-[#151817]"
                >
                  saim@solvingodds.com
                </a>
              </div>

              <div className="mt-8 space-y-4 border-t border-[#151817]/14 pt-6 text-[0.88rem] leading-[1.6] text-[#525852]">
                <p>
                  Fields marked with{" "}
                  <span className="font-semibold text-[#151817]">*</span> are
                  required.
                </p>

                {values.service && (
                  <div className="inline-flex items-center gap-2.5 rounded-[2px] border border-[#151817]/16 bg-white px-3.5 py-2 text-[0.8rem] text-[#151817]">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 shrink-0 rounded-[1px] bg-[#B7F536] ring-1 ring-[#151817]/30"
                    />
                    <span>
                      Selected:{" "}
                      <strong className="font-semibold">
                        {getServiceLabelByValue(values.service)}
                      </strong>
                    </span>
                  </div>
                )}

              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              {result?.status === "success" ? (
                <div
                  ref={statusRef}
                  tabIndex={-1}
                  role="status"
                  aria-live="polite"
                  className="rounded-[2px] border border-[#151817] bg-[#151817] p-7 text-white sm:p-10"
                >
                  <div className="inline-flex items-center gap-2.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-[#B7F536]">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-[1px] bg-[#B7F536]"
                    />
                    <span>INQUIRY RECEIVED</span>
                  </div>
                  <h3 className="font-display mt-4 text-[clamp(1.65rem,3vw,2.4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
                    Thank you for starting a conversation.
                  </h3>
                  <p className="mt-4 max-w-xl text-[0.98rem] leading-[1.68] text-white/85">
                    {result.message}
                  </p>
                  {submittedServiceLabel && (
                    <p className="mt-4 font-mono text-[0.72rem] uppercase tracking-[0.13em] text-[#A8AEA8]">
                      Service: {submittedServiceLabel}
                    </p>
                  )}
                  <div className="mt-8 border-t border-white/14 pt-6">
                    <button
                      type="button"
                      onClick={handleResetAfterSuccess}
                      className="inline-flex h-12 items-center gap-2.5 rounded-[2px] bg-[#B7F536] px-6 text-[0.875rem] font-semibold text-[#151817] transition-colors hover:bg-[#c5f85a] cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  aria-describedby="medical-inquiry-notice"
                  className="space-y-6 rounded-[2px] border border-[#151817]/13 bg-white/65 p-6 sm:p-9 lg:p-10"
                >
                  {/* Submission Status Banner (Error / Unconfigured / Validation / Duplicate) */}
                  {result && (
                    <div
                      ref={statusRef}
                      tabIndex={-1}
                      role="alert"
                      aria-live="assertive"
                      data-submission-status={result.status}
                      className={`rounded-[2px] border p-4 sm:p-5 ${
                        result.status === "validation_error" ||
                        result.status === "error" ||
                        result.status === "spam_blocked"
                          ? "border-[#9E1F1F]/50 bg-[#FFF5F5] text-[#151817]"
                          : "border-[#151817]/35 bg-[#151817] text-white"
                      }`}
                    >
                      <p
                        className={`font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] ${
                          result.status === "validation_error" ||
                          result.status === "error" ||
                          result.status === "spam_blocked"
                            ? "text-[#9E1F1F]"
                            : "text-[#B7F536]"
                        }`}
                      >
                        {result.status === "duplicate"
                          ? "Duplicate Submission Prevented"
                          : result.status === "validation_error"
                            ? "Check Required Fields"
                            : result.status === "spam_blocked"
                              ? "Submission Blocked"
                              : "Delivery Not Confirmed"}
                      </p>
                      <p className="mt-2 text-[0.92rem] leading-[1.6]">
                        {result.message}
                      </p>
                      {result.status === "error" && (
                        <button
                          type="submit"
                          disabled={submitting}
                          className="mt-3.5 inline-flex h-10 items-center rounded-[2px] bg-[#151817] px-4 text-[0.8rem] font-semibold text-white transition-colors hover:bg-[#242824] cursor-pointer"
                        >
                          Try Again
                        </button>
                      )}
                    </div>
                  )}

                  {/* Honeypot Anti-Spam Input — Hidden from visual and assistive users */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
                  >
                    <label htmlFor="contact-website">
                      Leave this field empty
                    </label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={(event) =>
                        setValues((prev) => ({
                          ...prev,
                          website: event.target.value,
                        }))
                      }
                    />
                  </div>

                  {/* Row 1: Full Name + Email Address */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-full-name"
                        className="block text-[0.84rem] font-semibold tracking-[-0.005em] text-[#151817]"
                      >
                        Full Name <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-full-name"
                        name="fullName"
                        type="text"
                        required
                        autoComplete="name"
                        disabled={submitting}
                        placeholder="Your full name"
                        value={values.fullName}
                        onChange={(e) => handleFieldChange("fullName", e)}
                        onBlur={() => handleFieldBlur("fullName")}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={
                          errors.fullName
                            ? "contact-full-name-error"
                            : undefined
                        }
                        className={`${inputBaseClass} h-13 ${fieldBorderClass("fullName")}`}
                      />
                      {errors.fullName && (
                        <p
                          id="contact-full-name-error"
                          role="alert"
                          className="mt-2 text-[0.82rem] font-medium text-[#9E1F1F]"
                        >
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[0.84rem] font-semibold tracking-[-0.005em] text-[#151817]"
                      >
                        Email Address <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        required
                        autoComplete="email"
                        disabled={submitting}
                        placeholder="you@company.com"
                        value={values.email}
                        onChange={(e) => handleFieldChange("email", e)}
                        onBlur={() => handleFieldBlur("email")}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? "contact-email-error" : undefined
                        }
                        className={`${inputBaseClass} h-13 ${fieldBorderClass("email")}`}
                      />
                      {errors.email && (
                        <p
                          id="contact-email-error"
                          role="alert"
                          className="mt-2 text-[0.82rem] font-medium text-[#9E1F1F]"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Company / Business Name + Service Interested In */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-company"
                        className="flex items-baseline justify-between gap-2 text-[0.84rem] font-semibold tracking-[-0.005em] text-[#151817]"
                      >
                        <span>Company / Business Name</span>
                        <span className="text-[0.74rem] font-normal text-[#525852]">
                          Optional
                        </span>
                      </label>
                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        disabled={submitting}
                        placeholder="Business or practice name"
                        value={values.company}
                        onChange={(e) => handleFieldChange("company", e)}
                        onBlur={() => handleFieldBlur("company")}
                        aria-invalid={Boolean(errors.company)}
                        aria-describedby={
                          errors.company ? "contact-company-error" : undefined
                        }
                        className={`${inputBaseClass} h-13 ${fieldBorderClass("company")}`}
                      />
                      {errors.company && (
                        <p
                          id="contact-company-error"
                          role="alert"
                          className="mt-2 text-[0.82rem] font-medium text-[#9E1F1F]"
                        >
                          {errors.company}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-service"
                        className="block text-[0.84rem] font-semibold tracking-[-0.005em] text-[#151817]"
                      >
                        Service Interested In <span aria-hidden="true">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="contact-service"
                          name="service"
                          required
                          disabled={submitting}
                          value={values.service}
                          onChange={(e) => handleFieldChange("service", e)}
                          onBlur={() => handleFieldBlur("service")}
                          aria-invalid={Boolean(errors.service)}
                          aria-describedby={
                            errors.service ? "contact-service-error" : undefined
                          }
                          className={`${inputBaseClass} h-13 appearance-none pr-11 cursor-pointer ${
                            !values.service ? "text-[#525852]" : "text-[#151817]"
                          } ${fieldBorderClass("service")}`}
                        >
                          <option value="">Select a service</option>
                          {CONTACT_SERVICE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <svg
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden="true"
                          className="pointer-events-none absolute top-1/2 right-4 h-3.5 w-3.5 -translate-y-1/2 text-[#151817]"
                        >
                          <path
                            d="M3 5.25L7 9.25L11 5.25"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="square"
                          />
                        </svg>
                      </div>
                      {errors.service && (
                        <p
                          id="contact-service-error"
                          role="alert"
                          className="mt-2 text-[0.82rem] font-medium text-[#9E1F1F]"
                        >
                          {errors.service}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Project Details / Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-[0.84rem] font-semibold tracking-[-0.005em] text-[#151817]"
                    >
                      Project Details / Message{" "}
                      <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      required
                      disabled={submitting}
                      placeholder="Tell us what you are working on, your goals, and how we can help."
                      value={values.message}
                      onChange={(e) => handleFieldChange("message", e)}
                      onBlur={() => handleFieldBlur("message")}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message
                          ? "contact-message-error medical-inquiry-notice"
                          : "medical-inquiry-notice"
                      }
                      className={`${inputBaseClass} min-h-[9.5rem] resize-y py-3.5 leading-[1.6] ${fieldBorderClass("message")}`}
                    />
                    {errors.message && (
                      <p
                        id="contact-message-error"
                        role="alert"
                        className="mt-2 text-[0.82rem] font-medium text-[#9E1F1F]"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Required Medical Billing & Privacy Safety Notice */}
                  <div
                    id="medical-inquiry-notice"
                    className={`rounded-[2px] border px-4 py-3 text-[0.82rem] leading-[1.55] transition-colors ${
                      isMedicalContext
                        ? "border-[#151817]/35 bg-[#F6F7F2] font-medium text-[#151817]"
                        : "border-[#151817]/14 bg-[#F6F7F2]/80 text-[#525852]"
                    }`}
                  >
                    {form.medicalSafetyNotice}
                  </div>

                  {/* Submit Action */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      aria-busy={submitting}
                      className="group inline-flex h-14 w-full items-center justify-center gap-3.5 rounded-[2px] border border-[#151817] bg-[#151817] px-8 text-[0.9375rem] font-medium text-white transition-colors duration-300 hover:border-[#B7F536] hover:bg-[#B7F536] hover:text-[#151817] disabled:cursor-not-allowed disabled:opacity-65 sm:w-auto cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <span
                            aria-hidden="true"
                            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                          />
                          <span>{form.submittingLabel}</span>
                        </>
                      ) : (
                        <>
                          <span className="kinetic-label tracking-[-0.01em]">
                            <span className="kinetic-label-primary">
                              {form.submitLabel}
                            </span>
                            <span
                              className="kinetic-label-clone"
                              aria-hidden="true"
                            >
                              {form.submitLabel}
                            </span>
                          </span>
                          <span className="arrow-relay h-4 w-4 shrink-0">
                            <svg
                              viewBox="0 0 14 14"
                              fill="none"
                              aria-hidden="true"
                              className="arrow-relay-first h-3.5 w-3.5"
                            >
                              <path
                                d="M2.5 11.5L11.5 2.5M11.5 2.5H4.25M11.5 2.5V9.75"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="square"
                              />
                            </svg>
                            <svg
                              viewBox="0 0 14 14"
                              fill="none"
                              aria-hidden="true"
                              className="arrow-relay-second h-3.5 w-3.5"
                            >
                              <path
                                d="M2.5 11.5L11.5 2.5M11.5 2.5H4.25M11.5 2.5V9.75"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="square"
                              />
                            </svg>
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03 — FAQ / Before You Reach Out */}
      <section
        id="contact-faq"
        data-surface="dark"
        aria-labelledby="contact-faq-heading"
        className="so-section service-secondary"
      >
        <div className="so-container">
          <div className="service-section-top">
            <EditorialTag tone="dark">{faq.eyebrow}</EditorialTag>
            <span className="service-index">[03] QUESTIONS</span>
          </div>

          <div className="service-faq-layout">
            <div>
              <EditorialHeading
                id="contact-faq-heading"
                lines={faq.headlineLines}
              />
              <p className="service-prose mt-6 max-w-sm">{faq.description}</p>
              <SiteLink
                href="/services"
                className="editorial-link mt-6 inline-block text-sm text-[var(--color-accent)]"
              >
                Review our services in detail
              </SiteLink>
            </div>

            <FaqAccordion items={faq.items} idPrefix="contact" />
          </div>
        </div>
      </section>
    </div>
  );
}
