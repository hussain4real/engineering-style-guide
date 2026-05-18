import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";
import { Tooltip } from "./tooltip";

describe("Tooltip", () => {
  it("describes focusable triggers with tooltip content", () => {
    render(
      <Tooltip content="Explains unfamiliar controls.">
        <Button variant="secondary">More detail</Button>
      </Tooltip>
    );

    expect(screen.getByRole("button", { name: "More detail" })).toHaveAccessibleDescription("Explains unfamiliar controls.");
  });
});
