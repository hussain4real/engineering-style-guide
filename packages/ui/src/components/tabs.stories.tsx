import { expect, fireEvent, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs } from "./tabs";

const meta = {
  title: "Components/Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs", "test"],
  args: {
    items: [
      { value: "overview", label: "Overview", content: "Overview panel" },
      { value: "usage", label: "Usage", content: "Usage panel" }
    ]
  },
  parameters: {
    docs: {
      description: {
        component:
          "Use Tabs to switch between closely related panels in the same context. Tabs support click, ArrowLeft, ArrowRight, Home, and End navigation. Avoid tabs for unrelated destinations that should be regular navigation."
      }
    }
  }
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { value: "overview", label: "Overview", content: <p className="text-sm leading-6 text-text">Use overview for summary information.</p> },
  { value: "usage", label: "Usage", content: <p className="text-sm leading-6 text-text">Use usage for implementation guidance.</p> },
  { value: "disabled", label: "Disabled", content: "Unavailable", disabled: true }
];

export const Default: Story = {
  render: () => <Tabs items={items} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("tab", { name: "Overview" })).toHaveAttribute("aria-selected", "true");
  }
};

export const KeyboardInteraction: Story = {
  render: () => <Tabs items={items} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByRole("tab", { name: "Overview" }).focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByRole("tab", { name: "Usage" })).toHaveFocus();
  }
};

export const KeyboardBoundaries: Story = {
  render: () => <Tabs items={items} defaultValue="usage" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const usage = canvas.getByRole("tab", { name: "Usage" });

    usage.focus();
    await userEvent.keyboard("{Home}");
    await expect(canvas.getByRole("tab", { name: "Overview" })).toHaveFocus();

    await userEvent.keyboard("{End}");
    await expect(usage).toHaveFocus();

    await userEvent.keyboard("{ArrowLeft}");
    await expect(canvas.getByRole("tab", { name: "Overview" })).toHaveFocus();
  }
};

export const ControlledAndDisabled: Story = {
  render: () => <Tabs items={items} value="overview" onValueChange={() => undefined} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const overview = canvas.getByRole("tab", { name: "Overview" });
    const usage = canvas.getByRole("tab", { name: "Usage" });
    const disabled = canvas.getByRole("tab", { name: "Disabled" });

    await userEvent.click(usage);
    await expect(overview).toHaveAttribute("aria-selected", "true");

    fireEvent.click(disabled);
    await expect(overview).toHaveAttribute("aria-selected", "true");

    fireEvent.keyDown(disabled, { key: "ArrowRight" });
    await expect(overview).toHaveFocus();

    fireEvent.keyDown(disabled, { key: "ArrowLeft" });
    await expect(usage).toHaveFocus();
  }
};

export const AllDisabled: Story = {
  render: () => (
    <Tabs
      items={[
        { value: "locked", label: "Locked", content: "Locked panel", disabled: true },
        { value: "archived", label: "Archived", content: "Archived panel", disabled: true }
      ]}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("tab", { name: "Locked" })).toHaveAttribute("aria-selected", "true");
  }
};

export const Responsive: Story = {
  render: () => (
    <div className="max-w-sm">
      <Tabs items={items} />
    </div>
  )
};
