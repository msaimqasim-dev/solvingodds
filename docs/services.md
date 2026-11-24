# Services Pages

## Routes

- `src/app/services/page.tsx` prerenders `/services` with `src/screens/ServicesOverview.tsx`.
- `src/app/services/[slug]/page.tsx` prerenders each service using `src/screens/ServiceDetail.tsx`.
- Unknown slugs and unknown routes use the same accessible not-found view with `noindex` metadata.

## Content

`src/data/services.ts` is the source for all service-specific overview copy, detail content, processes, offerings, benefits, FAQs, photography, CTA text, and metadata.

To add a service, add an entry to `SERVICES` with a unique slug and complete the `Service` type. The overview, navigation dropdowns, footer service links, and related-service sections derive from that collection automatically. No new page component or route is needed.

The existing homepage's approved copy and layouts stay in place. Its service links point to the new routes.

## Shared Design

The pages reuse `Header`, `Footer`, `EditorialImage`, `EditorialTag`, and `KineticButton`, along with the existing tokens in `src/index.css`. Additional styles are isolated in `src/styles/services.css`.

`useEditorialMotion` scopes and cleans up GSAP heading reveals, image curtains, animated dividers, and desktop parallax. Motion responds to the reduced-motion media query. The existing Lenis instance is shared across routes.

## Navigation And Contact

`SiteLink` provides real, shareable URLs with Next.js navigation and smooth same-page anchors. Route changes handle scroll restoration, anchor destinations, and main-content focus.

Inquiry CTAs open the Contact page (`/contact`) and pass the relevant service via `?service=`, preselecting the matching dropdown option. See `docs/contact.md` for Web3Forms setup.

## Metadata And Hosting

The Next.js Metadata API sets titles, descriptions, canonical URLs, Open Graph tags, and Twitter tags per route. Service pages include their content and metadata in the prerendered HTML.

Unknown URLs return HTTP 404 with the branded view and a noindex directive. See [deployment.md](deployment.md) for local production and preview setup.

Photography is licensed stock from Pexels. Source URLs, descriptive alt text, photographer credits, and fallback labels are centralized in the service data. Below-the-fold images are lazy-loaded.

## Validation

```sh
npx tsc --noEmit
npm run build
```

The optional `tests/services.qa.cjs` full-site browser suite requires Playwright, Chromium, and `@axe-core/playwright` in the test environment. It does not add these packages to the production application. With the packages installed in an isolated directory:

```sh
NODE_PATH=/path/to/qa/node_modules node tests/services.qa.cjs
```

The browser suite defaults to the local production server on port 3000. Set `QA_BASE_URL` to use a different URL or `QA_BROWSER_CHANNEL=chrome` to use an installed Chrome. The suite checks all seven routes at 1920, 1440, 1280, 1024, 768, 430, 390, 375, and 360 pixels, along with navigation, forms, motion, image loading, and automated WCAG accessibility.
