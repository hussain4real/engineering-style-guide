import type { Config } from "tailwindcss";

const rgbVar = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

type TailwindPreset = Omit<Config, "content">;

const companyPreset = {
  theme: {
    extend: {
      colors: {
        brand: {
          purple: {
            DEFAULT: "#5C0F8C",
            90: "#6F2C97",
            80: "#8044A2",
            70: "#915BAE"
          },
          orange: {
            DEFAULT: "#FF5200",
            90: "#FF6700",
            80: "#FF7A25",
            70: "#FF8C44"
          },
          navy: {
            DEFAULT: "#041E42",
            90: "#213052",
            80: "#384463",
            70: "#505976"
          },
          teal: {
            DEFAULT: "#3CBFAE",
            90: "#5AC6B5",
            80: "#70CCBD",
            70: "#85D3C5"
          },
          lightTeal: {
            DEFAULT: "#A7D5D2",
            90: "#ABD5CF",
            80: "#B5D9D4",
            70: "#BEDEDA"
          }
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
