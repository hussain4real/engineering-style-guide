export type HexColor = `#${string}`;

export interface BrandColorToken {
  name: string;
  value: HexColor;
  rgb: string;
  usage: string;
}

export interface SemanticColorToken {
  value: HexColor;
  rgb: string;
  foreground?: HexColor;
  foregroundRgb?: string;
  source: keyof typeof brandTokens | "functional";
  usage: string;
}

export const brandTokens = {
  purple: {
    name: "Brand Purple",
    value: "#5E108B",
    rgb: "94 16 139",
    usage: "Primary brand expression and main product actions."
  },
  orange: {
    name: "Brand Orange",
    value: "#FF4B00",
    rgb: "255 75 0",
    usage: "Accent, highlights, and visible focus treatment."
  },
  navy: {
    name: "Brand Navy",
    value: "#002447",
    rgb: "0 36 71",
    usage: "Primary text, dark surfaces, and strong structure."
  },
  teal: {
    name: "Brand Teal",
    value: "#40BDAF",
    rgb: "64 189 175",
    usage: "Info states and secondary emphasis."
  }
} as const satisfies Record<string, BrandColorToken>;

export const surfaceTokens = {
  mint: {
    name: "Surface Mint",
    value: "#EAF7F4",
    rgb: "234 247 244",
    usage: "Soft page sections, panels, and calm backgrounds."
  },
  white: {
    name: "Surface White",
    value: "#FFFFFF",
    rgb: "255 255 255",
    usage: "Default app and component surface."
  }
} as const satisfies Record<string, BrandColorToken>;

export const semanticTokens = {
  color: {
    primary: {
      value: brandTokens.purple.value,
      rgb: brandTokens.purple.rgb,
      foreground: surfaceTokens.white.value,
      foregroundRgb: surfaceTokens.white.rgb,
      source: "purple",
      usage: "Primary actions and selected states."
    },
    accent: {
      value: brandTokens.orange.value,
      rgb: brandTokens.orange.rgb,
      foreground: brandTokens.navy.value,
      foregroundRgb: brandTokens.navy.rgb,
      source: "orange",
      usage: "Accent actions, active indicators, and focus rings."
    },
    text: {
      value: brandTokens.navy.value,
      rgb: brandTokens.navy.rgb,
      source: "navy",
      usage: "Default readable text."
    },
    info: {
      value: brandTokens.teal.value,
      rgb: brandTokens.teal.rgb,
      foreground: brandTokens.navy.value,
      foregroundRgb: brandTokens.navy.rgb,
      source: "teal",
      usage: "Informational states and low-pressure emphasis."
    },
    background: {
      value: surfaceTokens.white.value,
      rgb: surfaceTokens.white.rgb,
      source: "white",
      usage: "Default page and component background."
    },
    backgroundSoft: {
      value: surfaceTokens.mint.value,
      rgb: surfaceTokens.mint.rgb,
      foreground: brandTokens.navy.value,
      foregroundRgb: brandTokens.navy.rgb,
      source: "mint",
      usage: "Soft sections, cards, and subtle empty states."
    },
    focus: {
      value: brandTokens.orange.value,
      rgb: brandTokens.orange.rgb,
      source: "orange",
      usage: "Keyboard focus and active affordances."
    },
    border: {
      value: "#CFE0DD",
      rgb: "207 224 221",
      source: "functional",
      usage: "Default dividers, inputs, and card borders."
    },
    muted: {
      value: "#64748B",
      rgb: "100 116 139",
      source: "functional",
      usage: "Secondary text and placeholder copy."
    },
    danger: {
      value: "#BE123C",
      rgb: "190 18 60",
      foreground: surfaceTokens.white.value,
      foregroundRgb: surfaceTokens.white.rgb,
      source: "functional",
      usage: "Destructive actions and validation errors."
    },
    success: {
      value: "#057A55",
      rgb: "5 122 85",
      foreground: surfaceTokens.white.value,
      foregroundRgb: surfaceTokens.white.rgb,
      source: "functional",
      usage: "Positive status and completed states."
    },
    warning: {
      value: "#92400E",
      rgb: "146 64 14",
      foreground: surfaceTokens.white.value,
      foregroundRgb: surfaceTokens.white.rgb,
      source: "functional",
      usage: "Warning status and reversible risk."
    }
  }
} as const;

export const radiusTokens = {
  none: "0",
  sm: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  full: "9999px"
} as const;

export const shadowTokens = {
  sm: "0 1px 2px rgb(0 36 71 / 0.08)",
  md: "0 8px 20px rgb(0 36 71 / 0.12)",
  focus: "0 0 0 3px rgb(255 75 0 / 0.35)"
} as const;

export const typographyTokens = {
  fontSans: "\"Neo Sans Pro\", \"Poppins\", Arial, sans-serif",
  sizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem"
  },
  weights: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700"
  }
} as const;

export const spacingTokens = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem"
} as const;

export const stateTokens = {
  default: {
    usage: "Resting interactive and display state.",
    background: "rgb(var(--color-background))",
    foreground: "rgb(var(--color-text))",
    border: "rgb(var(--color-border))"
  },
  hover: {
    usage: "Pointer hover for enabled controls.",
    background: "rgb(var(--color-background-soft))",
    foreground: "rgb(var(--color-text))"
  },
  active: {
    usage: "Pressed, selected, or current navigation state.",
    background: "rgb(var(--color-primary))",
    foreground: "rgb(var(--color-primary-foreground))"
  },
  disabled: {
    usage: "Unavailable controls that remain visible and readable.",
    opacity: "0.55",
    background: "rgb(var(--color-background-soft))",
    foreground: "rgb(var(--color-muted))"
  },
  loading: {
    usage: "Pending action feedback for controls and page fragments.",
    indicator: "currentColor",
    aria: "Use aria-busy or role=status with a clear label."
  },
  focus: {
    usage: "Keyboard focus affordance.",
    outline: "2px solid rgb(var(--color-focus))",
    outlineOffset: "2px",
    ring: shadowTokens.focus
  },
  error: {
    usage: "Validation or destructive failure state.",
    color: "rgb(var(--color-danger))",
    foreground: "rgb(var(--color-danger-foreground))"
  },
  success: {
    usage: "Completed or positive status.",
    color: "rgb(var(--color-success))",
    foreground: "rgb(var(--color-success-foreground))"
  },
  warning: {
    usage: "Risk, reversible caution, or review-needed status.",
    color: "rgb(var(--color-warning))",
    foreground: "rgb(var(--color-warning-foreground))"
  }
} as const;

export const componentTokens = {
  control: {
    radius: radiusTokens.md,
    fontWeight: typographyTokens.weights.semibold,
    focusRing: "focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
    heights: {
      sm: "2rem",
      md: "2.5rem",
      lg: "3rem"
    }
  },
  field: {
    radius: radiusTokens.md,
    border: "rgb(var(--color-border))",
    background: "rgb(var(--color-background))",
    errorBorder: "rgb(var(--color-danger))",
    helperText: "rgb(var(--color-muted))"
  },
  feedback: {
    radius: radiusTokens.lg,
    tones: {
      info: semanticTokens.color.info.value,
      success: semanticTokens.color.success.value,
      warning: semanticTokens.color.warning.value,
      danger: semanticTokens.color.danger.value
    }
  },
  navigation: {
    tabRadius: radiusTokens.md,
    selectedBackground: "rgb(var(--color-primary))",
    selectedForeground: "rgb(var(--color-primary-foreground))",
    inactiveForeground: "rgb(var(--color-muted))"
  },
  overlay: {
    radius: radiusTokens.lg,
    maxWidth: "34rem",
    backdrop: "rgb(var(--color-text) / 0.4)",
    shadow: shadowTokens.md
  }
} as const;
