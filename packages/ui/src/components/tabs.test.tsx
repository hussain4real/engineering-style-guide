import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tabs } from "./tabs";

const tabItems = [
  { value: "overview", label: "Overview", content: "Overview panel" },
  { value: "usage", label: "Usage", content: "Usage panel" },
  { value: "history", label: "History", content: "History panel", disabled: true }
];

describe("Tabs", () => {
  it("switches visible panels when a tab is selected", async () => {
    const user = userEvent.setup();

    render(<Tabs items={tabItems} />);

    expect(screen.getByText("Overview panel")).toBeVisible();
    await user.click(screen.getByRole("tab", { name: "Usage" }));
    expect(screen.getByText("Usage panel")).toBeVisible();
  });

  it("supports keyboard navigation across enabled tabs", async () => {
    const user = userEvent.setup();

    render(<Tabs items={tabItems} />);

    const overview = screen.getByRole("tab", { name: "Overview" });
    overview.focus();
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("tab", { name: "Usage" })).toHaveFocus();
    expect(screen.getByText("Usage panel")).toBeVisible();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveFocus();
  });
});
