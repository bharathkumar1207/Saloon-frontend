type ImagePlaceholderProps = {
  label?: string;
  ratio?: string;
  className?: string;
};

export function ImagePlaceholder({
  label = "Photo coming soon",
  ratio = "aspect-[4/3]",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-primary-200 bg-primary-50 text-primary-400 ${ratio} ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-8 w-8"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="10" r="1.5" />
        <path d="m4 17 5-5 4 4 3-3 4 4" />
      </svg>
      <span className="px-2 text-center text-xs font-medium">{label}</span>
    </div>
  );
}
