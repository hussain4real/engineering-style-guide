import { cn } from "../lib/cn";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: "sm" | "md" | "lg";
}

export interface InlineProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: "sm" | "md" | "lg";
  align?: "start" | "center" | "end";
}

const gapClasses = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6"
};

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end"
};

export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

export function Stack({ gap = "md", className, ...props }: StackProps) {
  return <div className={cn("flex flex-col", gapClasses[gap], className)} {...props} />;
}

export function Inline({ gap = "md", align = "center", className, ...props }: InlineProps) {
  return <div className={cn("flex flex-wrap", gapClasses[gap], alignClasses[align], className)} {...props} />;
}

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-background-soft", className)} aria-hidden="true" {...props} />;
}
