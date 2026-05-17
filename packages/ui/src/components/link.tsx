import { forwardRef } from "react";
import { cn } from "../lib/cn";

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  subtle?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ subtle = false, className, children, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "font-semibold underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
      subtle ? "text-text hover:text-primary hover:underline" : "text-primary hover:text-primary-hover hover:underline",
      className
    )}
    {...props}
  >
    {children}
  </a>
));

Link.displayName = "Link";
