import { cloneElement, isValidElement, useId, type ReactElement } from "react";
import { cn } from "../lib/cn";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom";
  className?: string;
}

const sideClasses = {
  top: "bottom-full mb-2",
  bottom: "top-full mt-2"
};

export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  const id = useId();
  let trigger = (
    <span tabIndex={0} aria-describedby={id} className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus">
      {children}
    </span>
  );

  if (isValidElement(children)) {
    const child = children as ReactElement<{ "aria-describedby"?: string }>;
    trigger = cloneElement(child, {
      "aria-describedby": [child.props["aria-describedby"], id].filter(Boolean).join(" ")
    });
  }

  return (
    <span className={cn("group relative inline-flex", className)}>
      {trigger}
      <span
        id={id}
        role="tooltip"
        className={cn(
          "invisible absolute left-1/2 z-20 w-max max-w-64 -translate-x-1/2 rounded-md bg-text px-2 py-1 text-xs font-semibold text-white opacity-0 shadow-md transition",
          "group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100",
          sideClasses[side]
        )}
      >
        {content}
      </span>
    </span>
  );
}
