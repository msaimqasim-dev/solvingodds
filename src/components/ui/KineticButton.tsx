"use client";

import { SiteLink } from "./SiteLink";

type ButtonVariant =
  | "accent"
  | "dark"
  | "outlineOnDark"
  | "outlineOnLight"
  | "editorialLight"
  | "editorialDark";

interface KineticButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  ariaLabel?: string;
}

function ArrowUpRightIcon({
  className = "w-3.5 h-3.5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2.5 11.5L11.5 2.5M11.5 2.5H4.25M11.5 2.5V9.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function KineticButton({
  label,
  href,
  onClick,
  variant = "accent",
  size = "md",
  className = "",
  ariaLabel,
}: KineticButtonProps) {
  const sizeStyles = {
    sm: "h-10 px-4 text-[0.8125rem] gap-2.5",
    md: "h-12 px-6 text-[0.875rem] gap-3",
    lg: "h-14 px-7 text-[0.9375rem] gap-3.5",
  }[size];

  const isEditorial =
    variant === "editorialLight" || variant === "editorialDark";

  const variantStyles: Record<ButtonVariant, string> = {
    accent:
      "bg-[#B7F536] text-[#151817] hover:bg-[#c5f85a] border border-[#B7F536] hover:border-[#c5f85a] rounded-[2px]",
    dark: "bg-[#151817] text-white hover:bg-[#242824] border border-[#151817] rounded-[2px]",
    outlineOnDark:
      "bg-transparent text-white border border-white/28 hover:border-[#B7F536] hover:text-[#B7F536] rounded-[2px]",
    outlineOnLight:
      "bg-transparent text-[#151817] border border-[#151817]/25 hover:bg-[#151817] hover:text-white hover:border-[#151817] rounded-[2px]",
    editorialLight:
      "bg-transparent text-[#151817] border-b border-[#151817]/30 hover:border-[#151817] pb-2.5 px-0 h-auto gap-3.5 text-[0.9rem]",
    editorialDark:
      "bg-transparent text-white border-b border-white/30 hover:border-[#B7F536] pb-2.5 px-0 h-auto gap-3.5 text-[0.9rem]",
  };

  const iconBadgeStyles: Partial<Record<ButtonVariant, string>> = {
    editorialLight:
      "w-7 h-7 rounded-[2px] bg-[#151817] text-white group-hover:bg-[#B7F536] group-hover:text-[#151817] transition-colors duration-300",
    editorialDark:
      "w-7 h-7 rounded-[2px] bg-white/10 text-white group-hover:bg-[#B7F536] group-hover:text-[#151817] transition-colors duration-300",
  };

  const content = (
    <>
      <span className="kinetic-label font-medium tracking-[-0.01em]">
        <span className="kinetic-label-primary">{label}</span>
        <span className="kinetic-label-clone" aria-hidden="true">
          {label}
        </span>
      </span>
      <span
        className={`arrow-relay shrink-0 ${
          iconBadgeStyles[variant] ?? "w-4 h-4"
        }`}
      >
        <ArrowUpRightIcon className="arrow-relay-first w-3.5 h-3.5" />
        <ArrowUpRightIcon className="arrow-relay-second w-3.5 h-3.5" />
      </span>
    </>
  );

  const combinedClass = `group inline-flex items-center justify-center whitespace-nowrap transition-colors duration-300 cursor-pointer ${
    isEditorial ? "" : sizeStyles
  } ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <SiteLink
        href={href}
        aria-label={ariaLabel}
        onClick={() => onClick?.()}
        className={combinedClass}
      >
        {content}
      </SiteLink>
    );
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={combinedClass}
    >
      {content}
    </button>
  );
}
