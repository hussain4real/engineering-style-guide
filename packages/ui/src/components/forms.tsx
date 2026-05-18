import { forwardRef, useId } from "react";
import { cn } from "../lib/cn";

interface FieldChromeProps {
  label?: string;
  helperText?: string;
  error?: string;
}

const fieldBase =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text shadow-sm transition-colors " +
  "placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-focus/35 " +
  "disabled:cursor-not-allowed disabled:bg-background-soft disabled:text-text-muted";

function FieldNotes({ id, helperText, error }: { id: string; helperText?: string; error?: string }) {
  if (error) {
    return (
      <p id={`${id}-error`} className="text-sm font-medium text-danger">
        {error}
      </p>
    );
  }

  if (helperText) {
    return (
      <p id={`${id}-helper`} className="text-sm text-text-muted">
        {helperText}
      </p>
    );
  }

  return null;
}

export interface InputProps extends FieldChromeProps, React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, helperText, error, id, className, ...props }, ref) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const describedBy = error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined;

  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={inputId} className="block text-sm font-semibold text-text">
          {label}
        </label>
      ) : null}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(fieldBase, error && "border-danger focus:border-danger", className)}
        {...props}
      />
      <FieldNotes id={inputId} helperText={helperText} error={error} />
    </div>
  );
});

Input.displayName = "Input";

export interface TextareaProps extends FieldChromeProps, React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, helperText, error, id, className, ...props }, ref) => {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const describedBy = error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined;

  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={textareaId} className="block text-sm font-semibold text-text">
          {label}
        </label>
      ) : null}
      <textarea
        ref={ref}
        id={textareaId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(fieldBase, "min-h-24 resize-y", error && "border-danger focus:border-danger", className)}
        {...props}
      />
      <FieldNotes id={textareaId} helperText={helperText} error={error} />
    </div>
  );
});

Textarea.displayName = "Textarea";

export interface SelectProps extends FieldChromeProps, React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, helperText, error, id, className, children, ...props }, ref) => {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const describedBy = error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined;

  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={selectId} className="block text-sm font-semibold text-text">
          {label}
        </label>
      ) : null}
      <select
        ref={ref}
        id={selectId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(fieldBase, error && "border-danger focus:border-danger", className)}
        {...props}
      >
        {children}
      </select>
      <FieldNotes id={selectId} helperText={helperText} error={error} />
    </div>
  );
});

Select.displayName = "Select";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  helperText?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, helperText, error, id, className, ...props }, ref) => {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;
  const describedBy = error ? `${checkboxId}-error` : helperText ? `${checkboxId}-helper` : undefined;

  return (
    <div className="space-y-1">
      <div className="flex items-start gap-2">
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          className={cn(
            "mt-1 h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-focus/35",
            "disabled:cursor-not-allowed disabled:opacity-55",
            className
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...props}
        />
        <label htmlFor={checkboxId} className="text-sm font-medium leading-6 text-text">
          {label}
        </label>
      </div>
      <FieldNotes id={checkboxId} helperText={helperText} error={error} />
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  helperText?: string;
  error?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({ label, helperText, error, id, className, ...props }, ref) => {
  const generatedId = useId();
  const radioId = id ?? generatedId;
  const describedBy = error ? `${radioId}-error` : helperText ? `${radioId}-helper` : undefined;

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          id={radioId}
          type="radio"
          className={cn(
            "h-4 w-4 border-border text-primary focus:ring-2 focus:ring-focus/35",
            "disabled:cursor-not-allowed disabled:opacity-55",
            className
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...props}
        />
        <label htmlFor={radioId} className="text-sm font-medium text-text">
          {label}
        </label>
      </div>
      <FieldNotes id={radioId} helperText={helperText} error={error} />
    </div>
  );
});

Radio.displayName = "Radio";
