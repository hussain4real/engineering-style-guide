import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tabs } from "./tabs";

describe("Tabs", () => {
  it("switches visible panels when a tab is selected", async () => {
    const user = userEvent.setup();

    render(
      <Tabs
        items={[
          { value: "overview", label: "Overview", content: "Overview panel" },
          { value: "usage", label: "Usage", content: "Usage panel" }
        ]}
      />
    );

    expect(screen.getByText("Overview panel")).toBeVisible();
    await user.click(screen.getByRole("tab", { name: "Usage" }));
    expect(screen.getByText("Usage panel")).toBeVisible();
  });
});
