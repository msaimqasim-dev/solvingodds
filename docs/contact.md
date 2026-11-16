# Contact Form

The `/contact` page posts inquiries directly from the browser to **Web3Forms**, which emails the submission to the inbox linked to the configured access key.

## Configuration

- Endpoint: `https://api.web3forms.com/submit`
- Access key: `c38e0931-ea9f-4924-ae01-94251ee21bc5` (default in `src/services/contactSubmission.ts`)
- Optional override: set `VITE_WEB3FORMS_ACCESS_KEY` at build time if the key is rotated.

Web3Forms access keys are public by design. They only route submissions to the configured inbox and cannot read account data or past submissions. No secret should be committed.

## Payload

Each submission includes:

- `access_key`, `subject` (includes the selected service), `from_name`
- `name` (Full Name), `email` (also used as `replyto`)
- `company` (or "Not provided")
- `service` (human-readable label)
- `message`
- `source` (`https://solvingodds.com/contact`)
- `botcheck: false` (Web3Forms honeypot)

## Validation And States

- Client-side validation runs on blur and on submit for full name, email format, service selection, and message length.
- Inline errors use `aria-invalid`, `aria-describedby`, and `role="alert"`; focus moves to the first invalid field.
- The submit button shows a "Sending Inquiry..." loading state and is disabled while a request is in flight.
- A success confirmation appears **only** when Web3Forms returns HTTP 200 with `success: true`. The form is then cleared.
- Failures show the provider's message (or a retry message) and preserve the visitor's input so nothing is lost.
- A 15-second timeout prevents indefinite loading.

## Spam And Duplicate Protection

- Hidden off-screen `website` honeypot blocks automated submissions before any network request.
- Web3Forms `botcheck` honeypot is included on every request.
- In-flight submissions are rejected while a request is active.
- An identical submission fingerprint is rejected for 60 seconds after a confirmed delivery.
- Web3Forms applies its own server-side spam checks and rate limits; HTTP 429 shows a wait-and-retry message.

## Medical Billing Safety

The form always displays: "Please do not include patient information or sensitive medical details in your message." It does not request patient, insurance, or clinical information.

## Removed Section

The former "Other Ways to Connect / Prefer reaching out directly?" block was removed from the Contact page because it contained no verified direct-contact details. The form is the single inquiry channel.

## Verification Status

Verified in automated browser tests:

- The removed direct-contact section is gone; the page now flows from the form straight to the FAQ.
- The outgoing payload contains the access key and all form values (see Payload above).
- Client validation blocks network requests and focuses the first invalid field.
- Loading state, confirmation-only success, form clear, duplicate prevention, honeypot spam block, provider `success:false`, and HTTP `500` error handling all behave correctly.
- Mobile layout, touch target size, and WCAG AA axe checks pass.

**Live inbox delivery could not be confirmed from this build environment.** `api.web3forms.com` returns a Cloudflare challenge page to automated data-center traffic, so the browser receives a CORS preflight rejection before Web3Forms can process the request. This is environmental, not a form-logic issue: Web3Forms' own troubleshooting guide confirms `application/json` from client-side code is the supported pattern, and the form already uses it. Please submit one test inquiry from the deployed `https://solvingodds.com/contact` page to confirm the inbox receives it. If delivery is still rejected in production, verify the access key in the Web3Forms dashboard and check for domain restriction or rate-limit settings.
