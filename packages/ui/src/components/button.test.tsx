import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("renders an enabled primary action by default", () => {
    render(<Button>Save changes</Button>);

    expect(screen.getByRole("button", { name: "Save changes" })).toBeEnabled();
  });

  it("disables the control while loading", () => {
    render(
      <Button loading loadingText="Saving">
        Save
      </Button>
    );

    const button = screen.getByRole("button", { name: "Saving" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("aria-live", "polite");
  });

  it("fires click handlers when enabled", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick}>Create</Button>);
    await user.click(screen.getByRole("button", { name: "Create" }));

    expect(onClick).toHaveBeenCalledOnce();
  });
});
