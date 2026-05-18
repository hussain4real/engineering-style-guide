import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Dialog } from "./dialog";

describe("Dialog", () => {
  it("wires title and description into the accessible dialog name", () => {
    render(
      <Dialog open title="Confirm component change" description="Review impact before shipping.">
        Dialog body
      </Dialog>
    );

    const dialog = screen.getByRole("dialog", { name: "Confirm component change" });
    expect(dialog).toHaveAccessibleDescription("Review impact before shipping.");
  });

  it("reports close requests from the close button", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Dialog open title="Confirm component change" onOpenChange={onOpenChange}>
        Dialog body
      </Dialog>
    );

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
