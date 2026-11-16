interface BrandMarkProps {
  tone?: "light" | "dark";
  showSymbol?: boolean;
  className?: string;
}

/**
 * Temporary architectural SolvingOdds wordmark + geometric mark.
 * Replace the inner SVG/text with the supplied official logo file when finalized.
 */
export function BrandMark({
  tone = "light",
  showSymbol = true,
  className = "",
}: BrandMarkProps) {
  const isLight = tone === "light";

  return (
    <span
      className={`inline-flex items-center gap-2.5 select-none ${className}`}
    >
      {showSymbol && (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-90"
        >
          <rect
            x="1"
            y="1"
            width="9.5"
            height="9.5"
            fill={isLight ? "#B7F536" : "#151817"}
          />
          <rect
            x="13.5"
            y="1"
            width="9.5"
            height="9.5"
            fill={isLight ? "#FFFFFF" : "#151817"}
          />
          <rect
            x="1"
            y="13.5"
            width="9.5"
            height="9.5"
            fill={isLight ? "#FFFFFF" : "#151817"}
          />
          <path d="M13.5 23L23 13.5V23H13.5Z" fill="#B7F536" />
          {!isLight && (
            <rect
              x="1"
              y="1"
              width="9.5"
              height="9.5"
              fill="#B7F536"
              stroke="#151817"
              strokeWidth="1"
            />
          )}
        </svg>
      )}
      <span
        className={`font-display text-[1.18rem] font-bold tracking-[-0.035em] leading-none transition-colors duration-300 ${
          isLight ? "text-white" : "text-[#151817]"
        }`}
      >
        Solving
        <span className="font-medium">Odds</span>
      </span>
    </span>
  );
}
