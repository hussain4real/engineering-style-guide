import { describe, expect, it } from "vitest";
import { componentTokens, semanticTokens, stateTokens, typographyTokens } from "./tokens";

describe("design token exports", () => {
  it("keeps semantic color roles available for app code", () => {
    expect(semanticTokens.color.primary.value).toBe("#5E108B");
    expect(semanticTokens.color.focus.value).toBe("#FF4B00");
  });

  it("exports formal state and component token groups", () => {
    expect(stateTokens.loading.aria).toContain("aria-busy");
    expect(componentTokens.control.heights.md).toBe("2.5rem");
    expect(componentTokens.overlay.maxWidth).toBe("34rem");
  });

  it("uses Poppins as the interim fallback after Neo Sans Pro", () => {
    expect(typographyTokens.fontSans).toBe("\"Neo Sans Pro\", \"Poppins\", Arial, sans-serif");
  });
});
