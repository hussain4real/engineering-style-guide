import { cn } from "../lib/cn";

export type BadgeTone = "primary" | "accent" | "info" | "success" | "warning" | "danger" | "neutral";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/15 text-accent-foreground",
  info: "bg-info/20 text-info-foreground",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
  neutral: "bg-background-soft text-text"
};

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold leading-5",
        toneClasses[tone],
        className
      )}
      {...props}
    />
  );
}
