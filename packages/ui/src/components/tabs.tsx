import { useId, useState } from "react";
import { cn } from "../lib/cn";

export interface TabItem {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({ items, value, defaultValue, onValueChange, className, ...props }: TabsProps) {
  const baseId = useId();
  const firstEnabled = items.find((item) => !item.disabled)?.value ?? items[0]?.value;
  const [internalValue, setInternalValue] = useState(defaultValue ?? firstEnabled);
  const selectedValue = value ?? internalValue;

  const select = (nextValue: string) => {
    setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div role="tablist" className="inline-flex rounded-lg border border-border bg-background p-1">
        {items.map((item) => {
          const selected = item.value === selectedValue;
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.value}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.value}`}
              disabled={item.disabled}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
                selected ? "bg-primary text-primary-foreground" : "text-text-muted hover:bg-background-soft hover:text-text",
                item.disabled && "cursor-not-allowed opacity-50"
              )}
              onClick={() => select(item.value)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.value}
          role="tabpanel"
          id={`${baseId}-panel-${item.value}`}
          aria-labelledby={`${baseId}-tab-${item.value}`}
          hidden={item.value !== selectedValue}
          className="rounded-lg border border-border bg-background p-4"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
