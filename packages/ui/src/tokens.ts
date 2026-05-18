export type HexColor = `#${string}`;

export interface BrandColorToken {
  name: string;
  value: HexColor;
  rgb: string;
  pantone: string;
  cmyk: string;
  category: "primary" | "secondary" | "surface";
  usage: string;
  tints?: {
    90: ColorTintToken;
    80: ColorTintToken;
    70: ColorTintToken;
  };
}

export interface ColorTintToken {
  name: string;
  value: HexColor;
  rgb: string;
  cmyk: string;
}

export interface SemanticColorToken {
  value: HexColor;
  rgb: string;
  foreground?: HexColor;
  foregroundRgb?: string;
  source: keyof typeof brandTokens | keyof typeof surfaceTokens | "functional";
  usage: string;
}

export const brandTokens = {
  purple: {
    name: "Brand Purple",
    value: "#5C0F8C",
    rgb: "92 15 140",
    pantone: "Pantone 2597C",
    cmyk: "C079 M100 Y006 K002",
    category: "primary",
    usage: "Primary brand expression and main product actions.",
    tints: {
      90: { name: "Brand Purple 90", value: "#6F2C97", rgb: "111 44 151", cmyk: "C072 M091 Y000 K000" },
      80: { name: "Brand Purple 80", value: "#8044A2", rgb: "128 68 162", cmyk: "C064 M081 Y000 K000" },
      70: { name: "Brand Purple 70", value: "#915BAE", rgb: "145 91 174", cmyk: "C053 M072 Y000 K000" }
    }
  },
  orange: {
    name: "Brand Orange",
    value: "#FF5200",
    rgb: "255 82 0",
    pantone: "Pantone Orange 21C",
    cmyk: "C000 M082 Y100 K000",
    category: "primary",
    usage: "Accent, highlights, and visible focus treatment.",
    tints: {
      90: { name: "Brand Orange 90", value: "#FF6700", rgb: "255 103 0", cmyk: "C000 M070 Y094 K000" },
      80: { name: "Brand Orange 80", value: "#FF7A25", rgb: "255 122 37", cmyk: "C000 M064 Y084 K000" },
      70: { name: "Brand Orange 70", value: "#FF8C44", rgb: "255 140 68", cmyk: "C000 M057 Y072 K000" }
    }
  },
  navy: {
    name: "Brand Navy",
    value: "#041E42",
    rgb: "4 30 66",
    pantone: "Pantone 282C",
    cmyk: "C100 M090 Y013 K068",
    category: "secondary",
    usage: "Primary text, dark surfaces, and strong structure.",
    tints: {
      90: { name: "Brand Navy 90", value: "#213052", rgb: "33 48 82", cmyk: "C096 M081 Y038 K036" },
      80: { name: "Brand Navy 80", value: "#384463", rgb: "56 68 99", cmyk: "C085 M070 Y036 K027" },
      70: { name: "Brand Navy 70", value: "#505976", rgb: "80 89 118", cmyk: "C074 M060 Y033 K019" }
    }
  },
  teal: {
    name: "Brand Teal",
    value: "#3CBFAE",
    rgb: "60 191 174",
    pantone: "Pantone 7465C",
    cmyk: "C067 M000 Y040 K000",
    category: "secondary",
    usage: "Info states and secondary emphasis.",
    tints: {
      90: { name: "Brand Teal 90", value: "#5AC6B5", rgb: "90 198 181", cmyk: "C062 M000 Y037 K000" },
      80: { name: "Brand Teal 80", value: "#70CCBD", rgb: "112 204 189", cmyk: "C056 M000 Y034 K000" },
      70: { name: "Brand Teal 70", value: "#85D3C5", rgb: "133 211 197", cmyk: "C050 M000 Y030 K000" }
    }
  },
  lightTeal: {
    name: "Brand Light Teal",
    value: "#A7D5D2",
    rgb: "167 213 210",
    pantone: "Pantone 7464C",
    cmyk: "C034 M003 Y018 K000",
    category: "secondary",
    usage: "Soft surfaces, dividers, and calm supporting areas.",
    tints: {
      90: { name: "Brand Light Teal 90", value: "#ABD5CF", rgb: "171 213 207", cmyk: "C038 M003 Y022 K000" },
      80: { name: "Brand Light Teal 80", value: "#B5D9D4", rgb: "181 217 212", cmyk: "C034 M002 Y020 K000" },
      70: { name: "Brand Light Teal 70", value: "#BEDEDA", rgb: "190 222 218", cmyk: "C030 M002 Y017 K000" }
    }
  }
} as const satisfies Record<string, BrandColorToken>;

export const surfaceTokens = {
  lightTealSoft: {
    name: "Surface Light Teal Soft",
    value: brandTokens.lightTeal.tints[70].value,
    rgb: brandTokens.lightTeal.tints[70].rgb,
    pantone: "Pantone 7464C 70%",
    cmyk: brandTokens.lightTeal.tints[70].cmyk,
    category: "surface",
    usage: "Soft page sections, panels, and calm backgrounds."
  },
  mint: {
    name: "Surface Mint",
    value: brandTokens.lightTeal.tints[70].value,
    rgb: brandTokens.lightTeal.tints[70].rgb,
    pantone: "Pantone 7464C 70%",
    cmyk: brandTokens.lightTeal.tints[70].cmyk,
    category: "surface",
    usage: "Soft page sections, panels, and calm backgrounds."
  },
  white: {
    name: "Surface White",
    value: "#FFFFFF",
    rgb: "255 255 255",
    pantone: "White",
    cmyk: "C000 M000 Y000 K000",
    category: "surface",
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
      value: surfaceTokens.lightTealSoft.value,
      rgb: surfaceTokens.lightTealSoft.rgb,
      foreground: brandTokens.navy.value,
      foregroundRgb: brandTokens.navy.rgb,
      source: "lightTealSoft",
      usage: "Soft sections, cards, and subtle empty states."
    },
    focus: {
      value: brandTokens.orange.value,
      rgb: brandTokens.orange.rgb,
      source: "orange",
      usage: "Keyboard focus and active affordances."
    },
    border: {
      value: brandTokens.lightTeal.value,
      rgb: brandTokens.lightTeal.rgb,
      source: "lightTeal",
      usage: "Default dividers, inputs, and card borders."
    },
    muted: {
      value: brandTokens.navy.tints[70].value,
      rgb: brandTokens.navy.tints[70].rgb,
      source: "navy",
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
  sm: "0 1px 2px rgb(4 30 66 / 0.08)",
  md: "0 8px 20px rgb(4 30 66 / 0.12)",
  focus: "0 0 0 3px rgb(255 82 0 / 0.35)"
} as const;

export const typographyTokens = {
  fontSans: "Arial, \"Arial Arabic\", sans-serif",
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
