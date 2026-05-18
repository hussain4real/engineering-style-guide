import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";

const meta = {
  title: "Components/Actions/Button",
  component: Button,
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component:
          "Use Button for task completion and in-product actions. Use primary for the main action, secondary or ghost for supporting actions, danger for destructive choices, and loading when an action is in flight. Avoid using Button for navigation when Link is available."
      }
    }
  },
  argTypes: {
    variant: { control: "select", options: ["primary", "accent", "secondary", "ghost", "danger"] },
    size: { control: "select", options: ["sm", "md", "lg"] }
  },
  args: {
    children: "Save changes"
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Save changes" })).toBeEnabled();
  }
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Primary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>Disabled</Button>
      <Button loading loadingText="Saving">
        Save
      </Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
    </div>
  )
};

export const Responsive: Story = {
  render: () => (
    <div className="w-full max-w-md rounded-lg border border-border bg-background-soft p-4">
      <Button className="w-full sm:w-auto">Responsive action</Button>
    </div>
  )
};
