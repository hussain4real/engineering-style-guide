import { expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import { Link } from "./link";
import { Tooltip } from "./tooltip";

const meta = {
  title: "Components/Actions",
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component: "Actions are used for navigation, task completion, and contextual guidance."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Buttons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Primary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Primary" })).toBeEnabled();
  }
};

export const ButtonStates: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button disabled>Disabled</Button>
      <Button loading loadingText="Saving">
        Save
      </Button>
    </div>
  )
};

export const LinksAndTooltips: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Link href="https://example.com">Default link</Link>
      <Link href="https://example.com" subtle>
        Subtle link
      </Link>
      <Tooltip content="Tooltips explain unfamiliar controls.">
        <Button variant="secondary">Hover or focus</Button>
      </Tooltip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Hover or focus" })).toBeVisible();
  }
};
