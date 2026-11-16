import { useState } from "react";

interface EditorialImageProps {
  src: string;
  alt: string;
  fallbackLabel?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  tone?: "dark" | "light";
}

/**
 * Editorial image wrapper with smooth load handling and architectural fallback
 * if a remote stock image is temporarily unreachable.
 */
export function EditorialImage({
  src,
  alt,
  fallbackLabel = "SolvingOdds Visual",
  priority = false,
  className = "",
  imgClassName = "",
  tone = "dark",
}: EditorialImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    const isDark = tone === "dark";
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex flex-col justify-between overflow-hidden p-6 ${
          isDark
            ? "bg-[#242824] text-[#A8AEA8]"
            : "bg-[#E9EBE3] text-[#525852]"
        } ${className}`}
      >
        <div
          aria-hidden="true"
          className="flex items-center justify-between text-[0.68rem] uppercase tracking-[0.16em]"
        >
          <span>SOLVINGODDS</span>
          <span className="h-2 w-2 bg-[#B7F536]" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <p className="relative z-10 text-xs font-medium uppercase tracking-[0.12em]">
          {fallbackLabel}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${
        tone === "dark" ? "bg-[#242824]" : "bg-[#E6E8DF]"
      } ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
