import { clsx } from "clsx";

const TONE_CLASSES: Record<string, string> = {
  high: "bg-amber-soft text-amber",
  medium: "bg-accent-soft text-accent",
  low: "bg-canvas text-muted",
  supported: "bg-green/10 text-green",
  contested: "bg-amber-soft text-amber",
  rejected: "bg-red/10 text-red",
  monitor: "bg-accent-soft text-accent",
  neutral: "bg-canvas text-muted border border-border",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof TONE_CLASSES;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold",
        TONE_CLASSES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
