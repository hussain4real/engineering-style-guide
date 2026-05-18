import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./badge";

const meta = {
  title: "Components/Feedback/Badge",
  component: Badge,
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component:
          "Use Badge for compact status, category, or count labels. Choose tones by semantic meaning and keep text short. Avoid using badge color as the only indicator of meaning."
      }
    }
  },
  args: {
    children: "Ready"
  }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Ready")).toBeVisible();
  }
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge tone="neutral">Neutral</Badge>
      <Badge tone="primary">Primary</Badge>
      <Badge tone="accent">Accent</Badge>
      <Badge tone="info">Info</Badge>
      <Badge tone="success">Success</Badge>
      <Badge tone="warning">Warning</Badge>
      <Badge tone="danger">Danger</Badge>
    </div>
  )
};

export const Responsive: Story = {
  render: () => (
    <div className="max-w-xs">
      <Badge>Short labels wrap with surrounding text</Badge>
    </div>
  )
};
