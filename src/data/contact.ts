export type ContactServiceValue =
  | "web-design-development"
  | "social-media-services"
  | "medical-billing"
  | "multiple-services"
  | "general-inquiry";

export interface ContactServiceOption {
  value: ContactServiceValue;
  label: string;
}

export const CONTACT_SERVICE_OPTIONS: ContactServiceOption[] = [
  {
    value: "web-design-development",
    label: "Web Design & Development",
  },
  {
    value: "social-media-services",
    label: "Social Media Services",
  },
  {
    value: "medical-billing",
    label: "Medical Billing Services",
  },
  {
    value: "multiple-services",
    label: "Multiple Services",
  },
  {
    value: "general-inquiry",
    label: "General Inquiry",
  },
];

const QUERY_SERVICE_ALIASES: Record<string, ContactServiceValue> = {
  "web-design-development": "web-design-development",
  "web-design": "web-design-development",
  "web-development": "web-design-development",
  web: "web-design-development",
  "service-01": "web-design-development",
  "social-media-services": "social-media-services",
  "social-media": "social-media-services",
  social: "social-media-services",
  "service-02": "social-media-services",
  "medical-billing": "medical-billing",
  "medical-billing-services": "medical-billing",
  billing: "medical-billing",
  "service-03": "medical-billing",
  "multiple-services": "multiple-services",
  multiple: "multiple-services",
  "general-inquiry": "general-inquiry",
  general: "general-inquiry",
};

export function resolveServiceFromQuery(
  rawValue: string | null | undefined,
): ContactServiceValue | "" {
  if (!rawValue) return "";
  const normalized = rawValue.trim().toLowerCase();
  return QUERY_SERVICE_ALIASES[normalized] ?? "";
}

export function getServiceLabelByValue(value: ContactServiceValue): string {
  return (
    CONTACT_SERVICE_OPTIONS.find((option) => option.value === value)?.label ??
    value
  );
}

export function contactPath(service?: ContactServiceValue | string): string {
  const resolved = resolveServiceFromQuery(service);
  return resolved ? `/contact?service=${encodeURIComponent(resolved)}` : "/contact";
}

export const CONTACT_PAGE = {
  seo: {
    title: "Contact Us | SolvingOdds",
    description:
      "Start a conversation with SolvingOdds about website design and development, social media services, or medical billing support.",
  },
  hero: {
    eyebrow: "GET IN TOUCH",
    headlineLines: ["Good things start", "with a conversation."],
    description:
      "Whether you're planning a new website, looking for social media support, or exploring medical billing services, tell us what you need.",
  },
  form: {
    eyebrow: "PROJECT INQUIRY",
    heading: "Tell us about your project.",
    description:
      "Share a few details, and we'll have a better understanding of how we can help.",
    submitLabel: "Send Inquiry",
    submittingLabel: "Sending Inquiry...",
    medicalSafetyNotice:
      "Please do not include patient information or sensitive medical details in your message.",
  },
  faq: {
    eyebrow: "BEFORE YOU REACH OUT",
    headlineLines: ["Helpful details", "before you write."],
    description:
      "Quick answers to help you share the right context when starting an inquiry.",
    items: [
      {
        question: "What information should I include in my inquiry?",
        answer:
          "Share which service you are interested in, a short overview of your business or practice, and what you would like to accomplish. If you already have a website or active social accounts relevant to the request, you are welcome to mention them.",
      },
      {
        question: "Can I inquire about more than one service?",
        answer:
          "Yes. Choose Multiple Services in the form dropdown and briefly note which combination of web design and development, social media services, or medical billing support you would like to discuss.",
      },
      {
        question: "Can I discuss a website redesign?",
        answer:
          "Yes. Select Web Design & Development, include your current website URL if available, and describe what is not working today or what you would like the redesigned website to achieve.",
      },
      {
        question:
          "Can healthcare practices inquire about medical billing support?",
        answer:
          "Yes. Select Medical Billing Services and describe the administrative support your practice is exploring, such as provider credentialing and enrollment, medical billing, claim production, or accounts receivable follow-up. Please do not include patient information or sensitive medical details in your message.",
      },
    ],
  },
};
