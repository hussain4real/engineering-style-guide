import { useId, useRef, useState } from "react";
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
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const firstEnabled = items.find((item) => !item.disabled)?.value ?? items[0]?.value;
  const [internalValue, setInternalValue] = useState(defaultValue ?? firstEnabled);
  const selectedValue = value ?? internalValue;

  const select = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  const moveToTab = (currentValue: string, direction: 1 | -1) => {
    const enabledItems = items.filter((item) => !item.disabled);
    const currentIndex = enabledItems.findIndex((item) => item.value === currentValue);
    const fallbackIndex = direction === 1 ? 0 : enabledItems.length - 1;
    const nextIndex = currentIndex === -1 ? fallbackIndex : (currentIndex + direction + enabledItems.length) % enabledItems.length;
    const nextValue = enabledItems[nextIndex]?.value as string;

    select(nextValue);
    tabRefs.current[nextValue]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, currentValue: string) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveToTab(currentValue, 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveToTab(currentValue, -1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      const firstValue = items.find((item) => !item.disabled)?.value as string;
      select(firstValue);
      tabRefs.current[firstValue]?.focus();
    }

    if (event.key === "End") {
      event.preventDefault();
      const lastValue = [...items].reverse().find((item) => !item.disabled)?.value as string;
      select(lastValue);
      tabRefs.current[lastValue]?.focus();
    }
  };

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div role="tablist" aria-orientation="horizontal" className="inline-flex rounded-lg border border-border bg-background p-1">
        {items.map((item) => {
          const selected = item.value === selectedValue;
          return (
            <button
              key={item.value}
              ref={(node) => {
                tabRefs.current[item.value] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.value}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.value}`}
              disabled={item.disabled}
              tabIndex={selected ? 0 : -1}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
                selected ? "bg-primary text-primary-foreground" : "text-text-muted hover:bg-background-soft hover:text-text",
                item.disabled && "cursor-not-allowed opacity-50"
              )}
              onClick={() => select(item.value)}
              onKeyDown={(event) => handleKeyDown(event, item.value)}
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
