import { useEffect, useId, useRef } from "react";
import { cn } from "../lib/cn";

export interface DialogProps extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, "title"> {
  open: boolean;
  title: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

export function Dialog({ open, title, description, footer, onOpenChange, className, children, ...props }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const { "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy, ...dialogProps } = props;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={cn(
        "w-[min(92vw,34rem)] rounded-lg border border-border bg-background p-0 text-text shadow-md backdrop:bg-text/40",
        className
      )}
      aria-modal="true"
      aria-labelledby={ariaLabelledBy ?? titleId}
      aria-describedby={ariaDescribedBy ?? (description ? descriptionId : undefined)}
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange?.(false);
      }}
      onClose={() => onOpenChange?.(false)}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onOpenChange?.(false);
        }
      }}
      {...dialogProps}
    >
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="text-xl font-semibold text-text">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="mt-1 text-sm leading-6 text-text-muted">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            className="rounded-md px-2 py-1 text-sm font-semibold text-text-muted hover:bg-background-soft hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            onClick={() => onOpenChange?.(false)}
          >
            Close
          </button>
        </div>
        <div>{children}</div>
        {footer ? <div className="flex justify-end gap-3 border-t border-border pt-4">{footer}</div> : null}
      </div>
    </dialog>
  );
}
