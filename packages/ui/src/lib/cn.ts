type ClassValue = string | number | false | null | undefined | ClassValue[] | Record<string, boolean | undefined | null>;

export function cn(...values: ClassValue[]): string {
  const classes: string[] = [];

  const add = (value: ClassValue): void => {
    if (!value) return;

    if (typeof value === "string" || typeof value === "number") {
      classes.push(String(value));
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(add);
      return;
    }

    Object.entries(value).forEach(([key, enabled]) => {
      if (enabled) classes.push(key);
    });
  };

  values.forEach(add);
  return classes.join(" ");
}
