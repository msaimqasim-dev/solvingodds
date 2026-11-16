/* Full-site QA: run against Vite dev or preview with Playwright and axe on NODE_PATH. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;

const base = process.env.QA_BASE_URL || "http://localhost:5173";
const routes = [
  {
    path: "/",
    headline: "Turning complexity into opportunity.",
    title: "SolvingOdds — Creative, Digital & Business Support Agency",
  },
  {
    path: "/services",
    headline: "Different challenges. One place for solutions.",
    title: "Our Services | Web, Social Media & Medical Billing | SolvingOdds",
  },
  {
    path: "/services/web-design-development",
    headline: "Web experiences that work beautifully.",
    title: "Web Design & Development | SolvingOdds",
  },
  {
    path: "/services/social-media-services",
    headline: "Make your brand part of the conversation.",
    title: "Social Media Services | SolvingOdds",
  },
  {
    path: "/services/medical-billing",
    headline: "Simplifying the business side of healthcare.",
    title: "Medical Billing & Revenue Cycle Support | SolvingOdds",
  },
  {
    path: "/about",
    headline: "Different perspectives. One purpose.",
    title: "About Us | SolvingOdds",
  },
  {
    path: "/contact",
    headline: "Good things start with a conversation.",
    title: "Contact Us | SolvingOdds",
  },
];
const validPaths = new Set(routes.map((route) => route.path));
const consoleErrors = [];
const loadedImages = new Set();
const results = [];
const vitals = [];

async function ready(page, path) {
  const response = await page.goto(base + path, {
    waitUntil: "domcontentloaded",
  });
  assert.equal(response.status(), 200);
  await page.locator("main h1").waitFor();
  await page.evaluate(() => document.fonts.ready);
}

async function checkLayout(page, width, path) {
  const layout = await page.evaluate(() => ({
    viewport: innerWidth,
    document: document.documentElement.scrollWidth,
    overflow: [
      ...document.querySelectorAll(
        "main h1, main h2, main h3, main p, main button, main label",
      ),
    ]
      .filter((element) => element.scrollWidth > element.clientWidth + 2)
      .map((element) => element.textContent.trim().slice(0, 90)),
  }));
  assert.ok(
    layout.document <= width + 1,
    `Document overflow ${width}px at ${path}: ${JSON.stringify(layout)}`,
  );
  assert.deepEqual(layout.overflow, [], `Text overflow ${width}px at ${path}`);
}

async function loadImages(page) {
  const count = await page.locator("main img").count();
  for (let index = 0; index < count; index++) {
    const image = page.locator("main img").nth(index);
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element) => element.decode().catch(() => {}));
    const data = await image.evaluate((element) => ({
      src: element.src,
      loaded: element.complete && element.naturalWidth > 0,
    }));
    assert.ok(data.loaded, `Image unavailable: ${data.src}`);
    loadedImages.add(data.src);
  }
}

(async () => {
  fs.mkdirSync("artifacts", { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  try {
    const context = await browser.newContext({
      reducedMotion: "reduce",
      viewport: { width: 1440, height: 1000 },
    });
    const page = await context.newPage();
    page.on("pageerror", (error) => consoleErrors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    for (const width of [1920, 1440, 1280, 1024, 768, 430, 390, 360]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      for (const route of routes) {
        await ready(page, route.path);
        assert.equal(await page.locator("main h1").count(), 1);
        const headline = (await page.locator("main h1").innerText())
          .replace(/\s+/g, " ")
          .trim();
        assert.equal(headline, route.headline);
        assert.equal(await page.title(), route.title);
        assert.equal(
          await page.locator('link[rel="canonical"]').getAttribute("href"),
          "https://solvingodds.com" + route.path,
        );
        assert.ok(
          (
            await page
              .locator('meta[name="description"]')
              .getAttribute("content")
          ).length > 60,
        );
        assert.equal(
          await page.locator('meta[property="og:url"]').getAttribute("content"),
          "https://solvingodds.com" + route.path,
        );
        await checkLayout(page, width, route.path);

        const localLinks = await page.locator("a[href]").evaluateAll((links) =>
          links.map((link) => ({
            href: link.href,
            same: link.origin === location.origin,
          })),
        );
        for (const link of localLinks.filter((link) => link.same))
          assert.ok(
            validPaths.has(new URL(link.href).pathname),
            `Unexpected link ${link.href}`,
          );

        if (width === 1440) {
          await loadImages(page);
          // Let the section-aware header settle after programmatic test scrolling.
          await page.waitForTimeout(100);
          const accessibility = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze();
          assert.deepEqual(
            accessibility.violations.map((item) => ({
              id: item.id,
              targets: item.nodes.map((node) => node.target),
            })),
            [],
            `Accessibility violations at ${route.path}`,
          );
        }
        results.push({ path: route.path, width, status: "passed" });
      }
    }

    // Homepage: exactly three demo projects, safe external-link behavior.
    await page.setViewportSize({ width: 1440, height: 1000 });
    await ready(page, "/");
    assert.equal(await page.locator(".work-card").count(), 3);
    assert.equal(await page.locator('main a[href="#"]').count(), 0);
    for (const card of await page.locator(".work-card").all()) {
      const anchor = card.locator("a[href^='http']");
      if ((await anchor.count()) > 0) {
        assert.equal(await anchor.getAttribute("target"), "_blank");
        assert.match(
          (await anchor.getAttribute("rel")) || "",
          /noopener noreferrer/,
        );
      } else {
        assert.match(
          await card.innerText(),
          /Link Pending|Visit Live Website/i,
        );
      }
      assert.match(await card.innerText(), /CONCEPT PROJECT/);
    }

    // Homepage FAQ accordion toggles with correct ARIA state.
    const homeFaq = page.locator(".faq-list .faq-item button").nth(1);
    await homeFaq.scrollIntoViewIfNeeded();
    await homeFaq.click();
    assert.equal(await homeFaq.getAttribute("aria-expanded"), "true");
    await homeFaq.click();
    assert.equal(await homeFaq.getAttribute("aria-expanded"), "false");

    // Service detail template: offerings, FAQ, related links (all three slugs).
    for (const slug of [
      "web-design-development",
      "social-media-services",
      "medical-billing",
    ]) {
      await ready(page, `/services/${slug}`);
      assert.equal(
        await page.locator('[data-page="service-detail"]').count(),
        1,
      );
      assert.equal(
        await page.locator(".service-offering-button").count(),
        4,
      );
      for (const button of await page
        .locator(".service-offering-button")
        .all()) {
        await button.click();
        assert.equal(await button.getAttribute("aria-pressed"), "true");
        const preview = page.locator(".service-offering-preview img");
        await preview.scrollIntoViewIfNeeded();
        await preview.evaluate((image) => image.decode());
        loadedImages.add(await preview.getAttribute("src"));
      }
      const faq = page.locator(".service-faq-item button").nth(2);
      await faq.click();
      assert.equal(await faq.getAttribute("aria-expanded"), "true");
      await faq.click();
      assert.equal(await faq.getAttribute("aria-expanded"), "false");
      assert.equal(await page.locator(".related-service-link").count(), 2);
    }

    // Service-to-contact preselection for every service CTA path.
    for (const slug of [
      "web-design-development",
      "social-media-services",
      "medical-billing",
    ]) {
      await ready(page, `/services/${slug}`);
      await page.locator(".service-conversion a").click();
      await page.waitForURL(`**/contact?service=${slug}`);
      assert.equal(
        await page.locator("#contact-service").inputValue(),
        slug,
      );
    }

    // About: expertise rows link to the matching service detail pages.
    await ready(page, "/about");
    for (const slug of [
      "web-design-development",
      "social-media-services",
      "medical-billing",
    ]) {
      await page.locator(`main a[href="/services/${slug}"]`).first().click();
      await page.waitForURL(`**/services/${slug}`);
      await page.goBack();
      await page.waitForURL("**/about");
    }

    // Contact: validation blocks delivery, errors are announced, input kept.
    await ready(page, "/contact");
    let web3Calls = 0;
    page.on("request", (request) => {
      if (request.url().includes("api.web3forms.com")) web3Calls += 1;
    });
    await page.getByRole("button", { name: "Send Inquiry" }).click();
    for (const id of [
      "contact-full-name",
      "contact-email",
      "contact-service",
      "contact-message",
    ]) {
      assert.equal(
        await page.locator(`#${id}`).getAttribute("aria-invalid"),
        "true",
      );
    }
    assert.equal(
      await page.evaluate(() => document.activeElement?.id),
      "contact-full-name",
    );
    assert.equal(web3Calls, 0);
    await page.fill("#contact-email", "not-an-email");
    await page.locator("#contact-email").blur();
    assert.match(
      await page.locator("#contact-email-error").innerText(),
      /valid email/i,
    );

    // Contact: failed delivery shows an honest error and preserves input.
    const errorsBeforeAbort = consoleErrors.length;
    await page.route("**/api.web3forms.com/submit", (route) =>
      route.abort("failed"),
    );
    await page.fill("#contact-full-name", "QA Tester");
    await page.fill("#contact-email", "qa@example.com");
    await page.selectOption("#contact-service", "general-inquiry");
    await page.fill(
      "#contact-message",
      "Testing delivery failure handling without a live inbox.",
    );
    await page.getByRole("button", { name: "Send Inquiry" }).click();
    await page.locator('[data-submission-status="error"]').waitFor();
    assert.equal(await page.locator('[role="status"]').count(), 0);
    assert.equal(
      await page.locator("#contact-full-name").inputValue(),
      "QA Tester",
    );
    await page.unroute("**/api.web3forms.com/submit");
    // The intentionally aborted request logs one expected resource error.
    const abortErrorIndex = consoleErrors.indexOf(
      "Failed to load resource: net::ERR_FAILED",
      errorsBeforeAbort,
    );
    assert.ok(abortErrorIndex >= 0, "Expected aborted-request console entry");
    consoleErrors.splice(abortErrorIndex, 1);

    // Contact: honeypot spam is blocked before any network request.
    await page.evaluate(() => {
      const input = document.querySelector(
        "#contact-website",
      );
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value",
      ).set;
      setter.call(input, "https://spam.example");
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
    await page.getByRole("button", { name: "Send Inquiry" }).click();
    await page.locator('[data-submission-status="spam_blocked"]').waitFor();
    const contactFaq = page.locator("#contact-faq .service-faq-item button");
    assert.equal(await contactFaq.count(), 4);
    assert.equal(
      await contactFaq.nth(0).getAttribute("aria-expanded"),
      "true",
    );
    await contactFaq.nth(1).click();
    assert.equal(await contactFaq.nth(1).getAttribute("aria-expanded"), "true");
    await contactFaq.nth(1).click();
    assert.equal(
      await contactFaq.nth(1).getAttribute("aria-expanded"),
      "false",
    );

    // Mobile disclosure navigation, keyboard focus containment, and refresh.
    await page.setViewportSize({ width: 390, height: 844 });
    await ready(page, "/services");
    await page
      .getByRole("button", { name: "Open navigation menu", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Toggle mobile services submenu" })
      .click();
    assert.equal(await page.locator("#mobile-services-submenu a").count(), 4);
    await page
      .locator('#mobile-services-submenu a[href="/services/medical-billing"]')
      .click();
    await page.waitForURL("**/services/medical-billing");
    assert.equal(
      await page
        .getByRole("button", { name: "Open navigation menu", exact: true })
        .count(),
      1,
    );
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.locator('[data-service="medical-billing"]').waitFor();
    await page
      .getByRole("button", { name: "Open navigation menu", exact: true })
      .click();
    await page.waitForTimeout(150);
    const lastMobileLink = page
      .locator('#mobile-navigation-drawer a[href="/contact"]')
      .last();
    await lastMobileLink.focus();
    await page.keyboard.press("Tab");
    assert.ok(
      await page
        .getByRole("button", { name: "Close navigation menu", exact: true })
        .evaluate((element) => element === document.activeElement),
      "Mobile forward focus containment",
    );
    await page.keyboard.press("Shift+Tab");
    assert.ok(
      await lastMobileLink.evaluate(
        (element) => element === document.activeElement,
      ),
      "Mobile reverse focus containment",
    );
    await page.keyboard.press("Escape");
    assert.equal(
      await page
        .getByRole("button", { name: "Open navigation menu", exact: true })
        .getAttribute("aria-expanded"),
      "false",
    );

    // Desktop dropdown, cross-route anchors, and browser back/forward.
    await page.setViewportSize({ width: 1440, height: 1000 });
    await ready(page, "/services");
    const toggle = page.getByRole("button", {
      name: "Toggle services submenu",
      exact: true,
    });
    await toggle.focus();
    await page.keyboard.press("ArrowDown");
    assert.equal(await toggle.getAttribute("aria-expanded"), "true");
    assert.equal(await page.locator("#desktop-services-submenu a").count(), 4);
    await page
      .locator(
        '#desktop-services-submenu a[href="/services/web-design-development"]',
      )
      .click();
    await page.waitForURL("**/services/web-design-development");
    await page.goBack();
    await page.waitForURL("**/services");
    await page.goForward();
    await page.waitForURL("**/services/web-design-development");
    await page.locator('header nav a[href="/#work"]').click();
    await page.waitForURL("**/#work");
    await page.waitForTimeout(150);
    assert.ok(
      Math.abs(
        (await page
          .locator("#work")
          .evaluate((element) => element.getBoundingClientRect().top)) - 72,
      ) < 10,
      "Cross-route work anchor positioning",
    );

    // Unknown routes render the branded noindex 404 view.
    for (const missing of ["/services/not-a-service", "/portfolio"]) {
      await ready(page, missing);
      assert.equal(
        await page.locator('meta[name="robots"]').getAttribute("content"),
        "noindex, follow",
      );
      assert.match(await page.locator("main").innerText(), /PAGE NOT FOUND/);
    }

    // Capture fully loaded reference layouts, then check normal-motion behavior.
    await page.setViewportSize({ width: 1440, height: 1000 });
    await ready(page, "/services");
    await loadImages(page);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);
    await page.screenshot({
      path: "artifacts/services-overview-desktop.png",
      fullPage: true,
    });
    await ready(page, "/services/web-design-development");
    await loadImages(page);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);
    await page.screenshot({
      path: "artifacts/service-detail-desktop.png",
      fullPage: true,
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await ready(page, "/services/medical-billing");
    await loadImages(page);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);
    await page.screenshot({
      path: "artifacts/service-detail-mobile.png",
      fullPage: true,
    });
    const motionContext = await browser.newContext({
      reducedMotion: "no-preference",
      viewport: { width: 1440, height: 1000 },
    });
    const motionPage = await motionContext.newPage();
    motionPage.on("pageerror", (error) => consoleErrors.push(error.message));
    for (const route of routes.slice(1, 4)) {
      await ready(motionPage, route.path);
      await motionPage.waitForTimeout(1700);
      assert.ok(
        await motionPage.evaluate(() =>
          document.documentElement.classList.contains("lenis"),
        ),
        "Shared Lenis instance is active",
      );
      const transform = await motionPage
        .locator(".expertise-hero-line, .about-hero-line, .contact-hero-line")
        .first()
        .evaluate((element) => getComputedStyle(element).transform);
      assert.ok(
        transform === "none" || transform === "matrix(1, 0, 0, 1, 0, 0)",
        `Hero reveal did not complete at ${route.path}: ${transform}`,
      );
    }

    await ready(motionPage, "/services");
    await motionPage
      .locator('.expertise-hero-actions a[href$="#service-collection"]')
      .click();
    await motionPage.waitForTimeout(1500);
    assert.ok(
      Math.abs(
        (await motionPage
          .locator("#service-collection")
          .evaluate((element) => element.getBoundingClientRect().top)) - 72,
      ) < 10,
      "Lenis section navigation",
    );
    await motionPage.locator(".overview-service-cta a").first().click();
    await motionPage.waitForURL("**/services/web-design-development");
    await motionPage
      .locator('.expertise-hero-actions a[href^="/contact"]')
      .click();
    await motionPage.waitForURL("**/contact?service=web-design-development");
    assert.equal(
      await motionPage.locator("#contact-service").inputValue(),
      "web-design-development",
    );
    await motionContext.close();

    const fallbackContext = await browser.newContext({
      reducedMotion: "reduce",
    });
    await fallbackContext.route("**/images.pexels.com/**", (route) =>
      route.abort(),
    );
    const fallbackPage = await fallbackContext.newPage();
    await ready(fallbackPage, "/services/medical-billing");
    await fallbackPage
      .locator(".service-introduction-image")
      .scrollIntoViewIfNeeded();
    await fallbackPage
      .locator('.service-introduction-image [role="img"]')
      .waitFor();
    await fallbackContext.close();

    // Core Web Vitals sampling (informational; CLS guarded against regressions).
    const vitalsContext = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    });
    const vitalsPage = await vitalsContext.newPage();
    for (const path of ["/", "/services/medical-billing"]) {
      await vitalsPage.goto(base + path, { waitUntil: "networkidle" });
      await vitalsPage.waitForTimeout(1200);
      const sample = await vitalsPage.evaluate(
        () =>
          new Promise((resolve) => {
            let lcp = 0;
            let cls = 0;
            try {
              new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  lcp = entry.renderTime || entry.loadTime || lcp;
                }
              }).observe({ type: "largest-contentful-paint", buffered: true });
              new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  if (!entry.hadRecentInput) cls += entry.value;
                }
              }).observe({ type: "layout-shift", buffered: true });
            } catch {
              resolve({ lcp: -1, cls: -1 });
              return;
            }
            setTimeout(
              () => resolve({ lcp: Math.round(lcp), cls: +cls.toFixed(4) }),
              800,
            );
          }),
      );
      vitals.push({ path, ...sample });
      assert.ok(
        sample.cls < 0.25,
        `CLS regression at ${path}: ${JSON.stringify(sample)}`,
      );
    }
    await vitalsContext.close();

    assert.deepEqual(consoleErrors, [], "Browser console errors");
    fs.writeFileSync(
      "artifacts/services-qa.json",
      JSON.stringify(
        {
          layouts: results,
          imagesVerified: loadedImages.size,
          vitals,
          consoleErrors,
          interactions: "passed",
          accessibility: "passed",
        },
        null,
        2,
      ),
    );
    console.log(
      `PASS: ${results.length} route layouts, ${loadedImages.size} images, metadata, refresh, history, navigation, accordions, offering previews, contact validation, 404, reduced motion, vitals, and axe accessibility.`,
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
