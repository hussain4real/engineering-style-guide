import { cn } from "../lib/cn";

export type ToastTone = "info" | "success" | "warning" | "danger";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: ToastTone;
  title: string;
}

const toneClasses: Record<ToastTone, string> = {
  info: "border-info/40",
  success: "border-success/40",
  warning: "border-warning/40",
  danger: "border-danger/40"
};

export function Toast({ tone = "info", title, className, children, ...props }: ToastProps) {
  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={cn("w-full max-w-sm rounded-lg border bg-background p-4 shadow-md", toneClasses[tone], className)}
      {...props}
    >
      <p className="font-semibold text-text">{title}</p>
      {children ? <div className="mt-1 text-sm leading-6 text-text-muted">{children}</div> : null}
    </div>
  );
}
