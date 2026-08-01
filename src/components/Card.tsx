import { clsx } from "clsx";

export function Card({
  children,
  className,
  hoverable = false,
}: {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}) {
  return (
    <div
      className={clsx(
        "bg-white border border-[var(--border-default)] rounded-[10px] shadow-[0_1px_2px_rgba(15,23,42,0.04)] p-6 transition-all duration-200",
        hoverable && "hover:-translate-y-[1px] hover:shadow-[0_2px_6px_rgba(15,23,42,0.08)]",
        className
      )}
    >
      {children}
    </div>
  );
}
