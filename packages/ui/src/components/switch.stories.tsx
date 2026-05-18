import { expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Switch } from "./switch";

const meta = {
  title: "Components/Forms/Switch",
  component: Switch,
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component:
          "Use Switch for immediate on/off settings. Provide a clear label through the label prop or aria-label, and keep disabled switches readable. Avoid using switches for actions that require confirmation."
      }
    }
  },
  args: {
    label: "Enable notifications"
  }
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Switch {...args} />
      <span className="text-sm font-medium text-text">{args.label}</span>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("switch", { name: "Enable notifications" }));
    await expect(canvas.getByRole("switch", { name: "Enable notifications" })).toHaveAttribute("aria-checked", "true");
  }
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-5">
      <Switch label="Enabled" defaultChecked />
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" defaultChecked disabled />
    </div>
  )
};

export const Responsive: Story = {
  render: () => (
    <div className="flex max-w-xs items-start gap-3">
      <Switch label="Send a weekly design-system digest" />
      <span className="text-sm leading-6 text-text">Send a weekly design-system digest</span>
    </div>
  )
};
