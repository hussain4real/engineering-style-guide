import { useState } from "react";
import { cn } from "../lib/cn";

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "role"> {
  checked?: boolean;
  defaultChecked?: boolean;
  label?: string;
  onCheckedChange?: (checked: boolean) => void;
}

export function Switch({
  checked,
  defaultChecked = false,
  label,
  onCheckedChange,
  className,
  disabled,
  "aria-label": ariaLabel,
  ...props
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = checked ?? internalChecked;
  const accessibleName = ariaLabel ?? label;

  const toggle = () => {
    const next = !isChecked;
    setInternalChecked(next);
    onCheckedChange?.(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      aria-label={accessibleName}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        "inline-flex h-6 w-11 items-center rounded-full border border-transparent transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-55",
        isChecked ? "bg-primary" : "bg-border-strong",
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
          isChecked ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </button>
  );
}
