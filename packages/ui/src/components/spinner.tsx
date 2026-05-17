import { cn } from "../lib/cn";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8"
};

export function Spinner({ label = "Loading", size = "md", className, ...props }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className={cn("inline-flex items-center", className)} {...props}>
      <span className={cn("animate-spin rounded-full border-2 border-primary border-r-transparent", sizeClasses[size])} aria-hidden="true" />
    </span>
  );
}
