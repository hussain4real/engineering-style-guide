import { cn } from "../lib/cn";

export type AlertTone = "info" | "success" | "warning" | "danger";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: AlertTone;
  title?: string;
}

const toneClasses: Record<AlertTone, string> = {
  info: "border-info/40 bg-info/10 text-text",
  success: "border-success/40 bg-success/10 text-text",
  warning: "border-warning/40 bg-warning/10 text-text",
  danger: "border-danger/40 bg-danger/10 text-text"
};

export function Alert({ tone = "info", title, className, children, ...props }: AlertProps) {
  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={cn("rounded-lg border p-4 text-sm", toneClasses[tone], className)}
      {...props}
    >
      {title ? <p className="mb-1 font-semibold">{title}</p> : null}
      <div className="leading-6 text-text/90">{children}</div>
    </div>
  );
}
