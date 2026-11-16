# Services Pages

## Routes

- `/services` renders `src/pages/ServicesOverview.tsx`.
- `/services/:slug` renders the single `src/pages/ServiceDetail.tsx` template.
- Unknown slugs and unknown routes use the same accessible not-found view with `noindex` metadata.

## Content

`src/data/services.ts` is the source for all service-specific overview copy, detail content, processes, offerings, benefits, FAQs, photography, CTA text, and metadata.

To add a service, add an entry to `SERVICES` with a unique slug and complete the `Service` type. The overview, navigation dropdowns, footer service links, and related-service sections derive from that collection automatically. No new page component or route is needed.

The existing homepage's approved copy and layouts stay in place. Its service links point to the new routes.

## Shared Design

The pages reuse `Header`, `Footer`, `EditorialImage`, `EditorialTag`, and `KineticButton`, along with the existing tokens in `src/index.css`. Additional styles are isolated in `src/styles/services.css`.

`useEditorialMotion` scopes and cleans up GSAP heading reveals, image curtains, animated dividers, and desktop parallax. Motion responds to the reduced-motion media query. The existing Lenis instance is shared across routes.

## Navigation And Contact

`SiteLink` provides real, shareable URLs with React Router client-side navigation and smooth same-page anchors. Route changes handle scroll restoration, anchor destinations, and main-content focus.

Inquiry CTAs open the Contact page (`/contact`) and pass the relevant service via `?service=`, preselecting the matching dropdown option. See `docs/contact.md` for Web3Forms delivery details.

## Metadata And Hosting

Titles, descriptions, canonical URLs, Open Graph tags, and Twitter tags update per route. This remains a client-rendered Vite application, not an SSR application. A future prerender/SSR setup would be needed for crawlers that do not execute JavaScript.

Direct requests to service URLs must resolve to `index.html` on a static host. `public/_redirects` supplies this for Netlify/Cloudflare Pages; `vercel.json` supplies the service-route rewrites for Vercel. Other hosts need the equivalent SPA fallback. Unknown slugs show the application not-found view; a true HTTP 404 status requires hosting/server support.

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

Set `QA_BASE_URL` to test a running production preview instead of the default Vite development URL. The suite checks all seven routes at 1920, 1440, 1280, 1024, 768, 430, 390, and 360 pixels, route metadata, direct requests, refresh, history, image availability, desktop/mobile menus, homepage and service accordions, offering previews, service-to-contact preselection, contact validation without live delivery, reduced motion, Core Web Vitals sampling, and automated WCAG accessibility.

There is no ESLint configuration in this repository; `npx tsc --noEmit` is the static check. Client-side 404 views set `noindex` metadata; a true HTTP 404 status requires hosting/server support.
