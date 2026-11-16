import {
  CONTACT_SERVICE_OPTIONS,
  getServiceLabelByValue,
  type ContactServiceValue,
} from "../data/contact";

export interface ContactFormValues {
  fullName: string;
  email: string;
  company: string;
  service: ContactServiceValue | "";
  message: string;
  /** Hidden anti-spam honeypot field — must remain empty for legitimate users. */
  website: string;
}

export type ContactFieldName =
  | "fullName"
  | "email"
  | "company"
  | "service"
  | "message";

export type ContactFormErrors = Partial<Record<ContactFieldName, string>>;

export type ContactSubmissionResult =
  | {
      status: "success";
      message: string;
    }
  | {
      status: "duplicate";
      message: string;
    }
  | {
      status: "spam_blocked";
      message: string;
    }
  | {
      status: "validation_error";
      message: string;
      fieldErrors: ContactFormErrors;
    }
  | {
      status: "error";
      message: string;
    };

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const VALID_SERVICES = new Set<string>(
  CONTACT_SERVICE_OPTIONS.map((option) => option.value),
);

/** Web3Forms public form endpoint (browser-side submission only). */
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Web3Forms access key. Public by design: it only routes submissions to the
 * configured SolvingOdds inbox and cannot read account data.
 * An environment value can override it if the key is ever rotated.
 */
const WEB3FORMS_ACCESS_KEY =
  (
    (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined) ??
    "c38e0931-ea9f-4924-ae01-94251ee21bc5"
  ).trim();

const REQUEST_TIMEOUT_MS = 15000;
const DUPLICATE_WINDOW_MS = 60000;

let inFlight = false;
let lastDeliveredSubmission: { fingerprint: string; timestamp: number } | null =
  null;

export function getWeb3FormsAccessKey(): string {
  return WEB3FORMS_ACCESS_KEY;
}

export function isContactDeliveryConfigured(): boolean {
  return WEB3FORMS_ACCESS_KEY.length > 0;
}

export function validateContactField(
  field: ContactFieldName,
  values: ContactFormValues,
): string | undefined {
  switch (field) {
    case "fullName": {
      const value = values.fullName.trim();
      if (!value) return "Please enter your full name.";
      if (value.length < 2)
        return "Full name must be at least 2 characters long.";
      if (value.length > 120)
        return "Full name must be 120 characters or fewer.";
      return undefined;
    }
    case "email": {
      const value = values.email.trim();
      if (!value) return "Please enter your email address.";
      if (value.length > 254 || !EMAIL_PATTERN.test(value)) {
        return "Please enter a valid email address (for example, name@company.com).";
      }
      return undefined;
    }
    case "company": {
      const value = values.company.trim();
      if (value.length > 140) {
        return "Company or business name must be 140 characters or fewer.";
      }
      return undefined;
    }
    case "service": {
      if (!values.service || !VALID_SERVICES.has(values.service)) {
        return "Please select the service you are interested in.";
      }
      return undefined;
    }
    case "message": {
      const value = values.message.trim();
      if (!value) return "Please share a few details about your project.";
      if (value.length < 12) {
        return "Please include a little more detail (at least 12 characters).";
      }
      if (value.length > 3000) {
        return "Project details must be 3,000 characters or fewer.";
      }
      return undefined;
    }
  }
}

export function validateContactForm(
  values: ContactFormValues,
): ContactFormErrors {
  const fields: ContactFieldName[] = [
    "fullName",
    "email",
    "company",
    "service",
    "message",
  ];
  const errors: ContactFormErrors = {};

  for (const field of fields) {
    const error = validateContactField(field, values);
    if (error) errors[field] = error;
  }

  return errors;
}

function createSubmissionFingerprint(values: ContactFormValues): string {
  return [
    values.fullName.trim().toLowerCase(),
    values.email.trim().toLowerCase(),
    values.company.trim().toLowerCase(),
    values.service,
    values.message.trim(),
  ].join("|");
}

interface Web3FormsResponse {
  success?: boolean;
  message?: string;
  body?: {
    message?: string;
    data?: Record<string, unknown>;
  };
}

export async function submitContactInquiry(
  values: ContactFormValues,
): Promise<ContactSubmissionResult> {
  if (inFlight) {
    return {
      status: "duplicate",
      message: "Your inquiry is already being sent. Please wait a moment.",
    };
  }

  // Spam check 1: reject automated bots that fill the hidden honeypot input.
  if (values.website.trim().length > 0) {
    return {
      status: "spam_blocked",
      message:
        "We could not process this submission. Please clear the form and try again.",
    };
  }

  const fieldErrors = validateContactForm(values);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "validation_error",
      message: "Please review the highlighted fields before sending.",
      fieldErrors,
    };
  }

  if (!WEB3FORMS_ACCESS_KEY) {
    return {
      status: "error",
      message:
        "Inquiry delivery is temporarily unavailable. Your details are still in the form—please try again shortly.",
    };
  }

  const fingerprint = createSubmissionFingerprint(values);
  if (
    lastDeliveredSubmission &&
    lastDeliveredSubmission.fingerprint === fingerprint &&
    Date.now() - lastDeliveredSubmission.timestamp < DUPLICATE_WINDOW_MS
  ) {
    return {
      status: "duplicate",
      message:
        "This exact inquiry was already submitted moments ago. Update your message if you need to add anything else.",
    };
  }

  inFlight = true;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(
    () => controller.abort(),
    REQUEST_TIMEOUT_MS,
  );

  try {
    const service = values.service as ContactServiceValue;
    const serviceLabel = getServiceLabelByValue(service);

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New SolvingOdds inquiry — ${serviceLabel}`,
      from_name: "SolvingOdds Website",
      name: values.fullName.trim(),
      email: values.email.trim(),
      replyto: values.email.trim(),
      company: values.company.trim() || "Not provided",
      service: serviceLabel,
      message: values.message.trim(),
      source: "https://solvingodds.com/contact",
      // Spam check 2: Web3Forms honeypot. Always false for real visitors.
      botcheck: false,
    };

    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    let body: Web3FormsResponse | null = null;
    const rawBody = await response.text();
    if (rawBody) {
      try {
        body = JSON.parse(rawBody) as Web3FormsResponse;
      } catch {
        body = null;
      }
    }

    // Success is only acknowledged when Web3Forms explicitly confirms delivery.
    if (response.ok && body?.success === true) {
      lastDeliveredSubmission = { fingerprint, timestamp: Date.now() };
      return {
        status: "success",
        message:
          "Thank you for reaching out. Your inquiry has been delivered, and we'll review the details you shared.",
      };
    }

    const providerMessage =
      body?.message || body?.body?.message || "";

    if (response.status === 429) {
      return {
        status: "error",
        message:
          "Too many inquiries have been sent in a short time. Your details are still saved—please wait a minute and try again.",
      };
    }

    return {
      status: "error",
      message:
        providerMessage && providerMessage !== "Email sent successfully!"
          ? `Your inquiry was not delivered. ${providerMessage} Please try again.`
          : "Your inquiry could not be confirmed as delivered. Your details are still saved—please try again in a moment.",
    };
  } catch (error) {
    const isTimeout =
      error instanceof DOMException && error.name === "AbortError";
    return {
      status: "error",
      message: isTimeout
        ? "The request timed out before delivery could be confirmed. Your message is still saved—please check your connection and try again."
        : "A network issue prevented your inquiry from being delivered. Your message is still saved—please try again.",
    };
  } finally {
    window.clearTimeout(timeoutId);
    inFlight = false;
  }
}
