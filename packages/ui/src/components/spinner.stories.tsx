import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Spinner } from "./spinner";

const meta = {
  title: "Components/Feedback/Spinner",
  component: Spinner,
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component:
          "Use Spinner for short pending states where progress is indeterminate. Always provide a useful label for assistive technology. Avoid using a spinner as the only content for long-running workflows."
      }
    }
  },
  args: {
    label: "Loading"
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] }
  }
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("status", { name: "Loading" })).toBeVisible();
  }
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="sm" label="Loading small content" />
      <Spinner size="md" label="Loading section" />
      <Spinner size="lg" label="Loading page" />
    </div>
  )
};

export const Responsive: Story = {
  render: () => (
    <div className="flex max-w-xs items-center gap-3 rounded-lg border border-border p-4">
      <Spinner label="Loading component list" />
      <span className="text-sm text-text">Loading component list</span>
    </div>
  )
};
