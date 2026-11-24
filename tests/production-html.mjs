import assert from "node:assert/strict";
const origin = process.env.QA_BASE_URL || "http://localhost:3000";
const canonicalOrigin = "https://solvingodds.com";
const pages = {
  "/": ["Turning complexity into opportunity.", "Kestrel Architectural Practice", "An editorial architecture website concept", "Medical Billing"],
  "/services": ["Different challenges. One place for solutions.", "The right expertise", "Social Media Services"],
  "/services/web-design-development": ["Web experiences that work beautifully.", "The right details.", "What We Offer"],
  "/services/social-media-services": ["Make your brand part of the conversation.", "The right details.", "What We Offer"],
  "/services/medical-billing": ["Simplifying the business side of healthcare.", "The right details.", "What We Offer"],
  "/about": ["Different perspectives. One purpose.", "SolvingOdds", "Medical Billing"],
  "/contact": ["Good things start with a conversation.", "Tell us about your project.", "Can I inquire about more than one service?", "Choose Multiple Services in the form dropdown"],
};

const text = (html) => html.replace(/<[^>]*>/g, " ").replace(/\s+([.!?,])/g, "$1").replace(/\s+/g, " ").trim();
const titles = new Set();
const descriptions = new Set();

for (const [path, [headline, ...copy]] of Object.entries(pages)) {
  const response = await fetch(origin + path);
  assert.equal(response.status, 200, path);
  const html = (await response.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  assert.ok(main, path);
  assert.equal([...main.matchAll(/<h1\b/gi)].length, 1, path);
  assert.equal(text(main.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)[1]), headline, path);
  for (const phrase of copy) assert.ok(text(main).toLowerCase().includes(phrase.toLowerCase()), path + " " + phrase);
  for (const href of ["/", "/services", "/about", "/contact"]) assert.ok(html.includes('href="' + href + '"'), path + " " + href);
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  const ogUrl = html.match(/property="og:url" content="([^"]+)"/)?.[1];
  assert.equal(new URL(canonical).href, canonicalOrigin + path);
  assert.equal(new URL(ogUrl).href, canonicalOrigin + path);
  assert.ok(html.includes('name="twitter:card"'), path);
  assert.ok(!/name="robots"[^>]*noindex/.test(html), path);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/name="description" content="([^"]+)"/)?.[1];
  assert.ok(title && !titles.has(title), path);
  assert.ok(description && !descriptions.has(description), path);
  titles.add(title);
  descriptions.add(description);
  console.log("200", path, headline);
}

const sitemap = await fetch(origin + "/sitemap.xml");
assert.equal(sitemap.status, 200);
assert.deepEqual(
  new Set([...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])),
  new Set(Object.keys(pages).map((path) => canonicalOrigin + path)),
);
const robots = await fetch(origin + "/robots.txt");
assert.equal(robots.status, 200);
assert.match(await robots.text(), /User-Agent: \*[\s\S]*Allow: \/[\s\S]*Sitemap: https:\/\/solvingodds\.com\/sitemap\.xml/i);
for (const path of ["/portfolio", "/services/missing", "/services/constructor"]) {
  const response = await fetch(origin + path);
  assert.equal(response.status, 404, path);
  const html = await response.text();
  assert.match(html, /noindex/);
  assert.match(html, /PAGE NOT FOUND/);
}
const redirect = await fetch(origin + "/index.html", { redirect: "manual" });
assert.equal(redirect.status, 308);
assert.equal(redirect.headers.get("location"), "/");

const inquiry = await fetch(origin + "/contact?service=medical-billing");
assert.match(await inquiry.text(), /<option[^>]*value="medical-billing"[^>]*selected/);
const retiredContact = await fetch(origin + "/api/contact", { method: "POST" });
assert.equal(retiredContact.status, 404, "The retired contact endpoint must stay disabled");
console.log("Passed sitemap, robots, 404s, legacy redirect, contact preselection and retired endpoint checks.");
