type EditorialHeadingProps = {
  lines: string[];
  id?: string;
  className?: string;
};

export function EditorialHeading({
  lines,
  id,
  className = "",
}: EditorialHeadingProps) {
  return (
    <h2 id={id} data-reveal-heading className={`heading-section ${className}`}>
      {lines.map((line) => (
        <span key={line} className="line-mask">
          <span className="line-inner">{line}</span>
        </span>
      ))}
    </h2>
  );
}
