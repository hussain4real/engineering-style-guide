import type { Config } from "tailwindcss";

const rgbVar = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

type TailwindPreset = Omit<Config, "content">;

const companyPreset = {
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#5E108B",
          orange: "#FF4B00",
          navy: "#002447",
          teal: "#40BDAF"
        },
        primary: {
          DEFAULT: rgbVar("--color-primary"),
          foreground: rgbVar("--color-primary-foreground"),
          hover: rgbVar("--color-primary-hover")
        },
        accent: {
          DEFAULT: rgbVar("--color-accent"),
          foreground: rgbVar("--color-accent-foreground"),
          hover: rgbVar("--color-accent-hover")
        },
        info: {
          DEFAULT: rgbVar("--color-info"),
          foreground: rgbVar("--color-info-foreground")
        },
        background: {
          DEFAULT: rgbVar("--color-background"),
          soft: rgbVar("--color-background-soft")
        },
        text: {
          DEFAULT: rgbVar("--color-text"),
          muted: rgbVar("--color-muted")
        },
        border: {
          DEFAULT: rgbVar("--color-border"),
          strong: rgbVar("--color-border-strong")
        },
        danger: {
          DEFAULT: rgbVar("--color-danger"),
          foreground: rgbVar("--color-danger-foreground")
        },
        success: {
          DEFAULT: rgbVar("--color-success"),
          foreground: rgbVar("--color-success-foreground")
        },
        warning: {
          DEFAULT: rgbVar("--color-warning"),
          foreground: rgbVar("--color-warning-foreground")
        },
        focus: rgbVar("--color-focus")
      },
      fontFamily: {
        sans: ["var(--font-sans)"]
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)"
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        focus: "var(--shadow-focus)"
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem"
      }
    }
  }
} satisfies TailwindPreset;

export default companyPreset;
