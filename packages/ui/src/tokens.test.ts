import { describe, expect, it } from "vitest";
import { brandTokens, componentTokens, semanticTokens, stateTokens, surfaceTokens, typographyTokens } from "./tokens";

describe("design token exports", () => {
  it("keeps semantic color roles available for app code", () => {
    expect(semanticTokens.color.primary.value).toBe("#5C0F8C");
    expect(semanticTokens.color.accent.foreground).toBe("#041E42");
    expect(semanticTokens.color.focus.value).toBe("#FF5200");
    expect(semanticTokens.color.backgroundSoft.value).toBe("#BEDEDA");
    expect(semanticTokens.color.border.value).toBe("#A7D5D2");
  });

  it("exports official Milaha Pantone metadata and tints", () => {
    expect(brandTokens.purple.pantone).toBe("Pantone 2597C");
    expect(brandTokens.orange.cmyk).toBe("C000 M082 Y100 K000");
    expect(brandTokens.navy.tints?.[90].value).toBe("#213052");
    expect(brandTokens.teal.tints?.[80].rgb).toBe("112 204 189");
    expect(brandTokens.lightTeal.value).toBe("#A7D5D2");
    expect(brandTokens.lightTeal.tints?.[70].value).toBe("#BEDEDA");
    expect(surfaceTokens.lightTealSoft.value).toBe("#BEDEDA");
    expect(surfaceTokens.mint.value).toBe(surfaceTokens.lightTealSoft.value);
  });

  it("exports formal state and component token groups", () => {
    expect(stateTokens.loading.aria).toContain("aria-busy");
    expect(componentTokens.control.heights.md).toBe("2.5rem");
    expect(componentTokens.overlay.maxWidth).toBe("34rem");
  });

  it("uses the official Arial font stack", () => {
    expect(typographyTokens.fontSans).toBe("Arial, \"Arial Arabic\", sans-serif");
  });
});
