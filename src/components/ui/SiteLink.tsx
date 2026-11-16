import { forwardRef, type AnchorHTMLAttributes } from "react";
import { Link, useLocation } from "react-router-dom";
import { scrollToAnchor, scrollToPageTop } from "../../utils/smoothScroll";

type SiteLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

// Keep real link URLs and native modified-click behavior while sharing smooth anchors.
export const SiteLink = forwardRef<HTMLAnchorElement, SiteLinkProps>(
  function SiteLink({ href, onClick, children, ...props }, ref) {
    const { pathname, search } = useLocation();
    if (!href.startsWith("/") && !href.startsWith("#")) {
      return (
        <a ref={ref} href={href} onClick={onClick} {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link
        ref={ref}
        to={href}
        {...props}
        onClick={(event) => {
          onClick?.(event);
          if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          )
            return;
          const destination = new URL(href, window.location.href);
          if (
            destination.pathname === pathname &&
            destination.search === search
          ) {
            if (destination.hash) scrollToAnchor(destination.hash, event);
            else {
              event.preventDefault();
              scrollToPageTop();
            }
          }
        }}
      >
        {children}
      </Link>
    );
  },
);
