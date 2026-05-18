import { expect, userEvent, within } from "storybook/test";
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

export const Responsive: Story = {
  render: () => (
    <div className="max-w-sm">
      <Tabs items={items} />
    </div>
  )
};
