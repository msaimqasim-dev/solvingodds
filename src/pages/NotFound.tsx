import { KineticButton } from "../components/ui/KineticButton";
import { EditorialTag } from "../components/ui/EditorialTag";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { useLocation } from "react-router-dom";

export function NotFound() {
  const { pathname } = useLocation();
  usePageMetadata({
    title: "Page Not Found | SolvingOdds",
    description:
      "This page is not available. Explore SolvingOdds services or return to the homepage.",
    path: pathname,
    noIndex: true,
  });
  return (
    <section
      data-surface="dark"
      className="so-container flex min-h-[75svh] flex-col items-start justify-center gap-7 pt-32 pb-20"
    >
      <EditorialTag>404 / PAGE NOT FOUND</EditorialTag>
      <h1 id="page-heading" className="heading-section">
        A different direction<span className="text-[#B7F536]">.</span>
      </h1>
      <p className="max-w-lg text-[#A8AEA8]">
        We couldn't find that page. Our services are a good place to find what
        you are looking for.
      </p>
      <div className="flex flex-wrap gap-3">
        <KineticButton label="Explore Services" href="/services" />
        <KineticButton label="Return Home" href="/" variant="outlineOnDark" />
      </div>
    </section>
  );
}
