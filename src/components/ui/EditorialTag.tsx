interface EditorialTagProps {
  children: string;
  tone?: "dark" | "light" | "accent";
  className?: string;
}

/**
 * Stodio-inspired architectural section eyebrow tag.
 * `tone` indicates the background surface the tag sits upon.
 */
export function EditorialTag({
  children,
  tone = "dark",
  className = "",
}: EditorialTagProps) {
  const styles = {
    dark: {
      wrapper: "text-[#A8AEA8]",
      dot: "bg-[#B7F536]",
      bracket: "text-white/35",
    },
    light: {
      wrapper: "text-[#151817]",
      dot: "bg-[#B7F536] ring-1 ring-[#151817]/25",
      bracket: "text-[#151817]/35",
    },
    accent: {
      wrapper: "text-[#151817]",
      dot: "bg-[#151817]",
      bracket: "text-[#151817]/45",
    },
  }[tone];

  return (
    <div
      className={`inline-flex items-center gap-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] leading-none ${styles.wrapper} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-[7px] w-[7px] shrink-0 rounded-[1px] ${styles.dot}`}
      />
      <span>{children}</span>
    </div>
  );
}
