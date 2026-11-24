import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteChrome, RouteEffects } from "@/components/RouteEffects";
import { BRAND } from "@/data/homepageContent";
import { siteUrl } from "@/lib/metadata";
import "@/index.css";
import "@/styles/services.css";

export const metadata: Metadata = { metadataBase: siteUrl };
export const viewport: Viewport = { themeColor: "#151817" };

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": siteUrl.href + "#organization", name: BRAND.name, url: siteUrl.href },
    { "@type": "WebSite", "@id": siteUrl.href + "#website", name: BRAND.name, url: siteUrl.href, publisher: { "@id": siteUrl.href + "#organization" } },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-[#151817] text-white antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&display=swap" />
        <noscript>
          <style>{` .accordion-content { grid-template-rows: 1fr; opacity: 1; } `}</style>
        </noscript>
      </head>
      <body className="bg-[#151817] text-white overflow-x-clip">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        <div id="site-top" className="relative min-h-screen w-full overflow-x-clip bg-[#151817] text-white">
          <SiteChrome placement="header" />
          <main id="main-content" tabIndex={-1} className="outline-none">{children}</main>
          <SiteChrome placement="footer" />
          <RouteEffects />
        </div>
      </body>
    </html>
  );
}
