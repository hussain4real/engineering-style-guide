import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "./switch";

describe("Switch", () => {
  it("toggles checked state and reports the new value", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();

    render(<Switch label="Notifications" onCheckedChange={onCheckedChange} />);
    const control = screen.getByRole("switch", { name: "Notifications" });

    expect(control).toHaveAttribute("aria-checked", "false");
    await user.click(control);

    expect(control).toHaveAttribute("aria-checked", "true");
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("supports aria-label when no visible label prop is supplied", () => {
    render(<Switch aria-label="Enable digest" />);

    expect(screen.getByRole("switch", { name: "Enable digest" })).toBeInTheDocument();
  });
});
