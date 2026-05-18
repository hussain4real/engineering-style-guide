import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Radio } from "./forms";

const meta = {
  title: "Components/Forms/Radio",
  component: Radio,
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component:
          "Use Radio for mutually exclusive choices in a small set. Group related radios with the same name and include text errors when selection is required. Avoid radio groups for very long lists."
      }
    }
  },
  args: {
    name: "priority",
    label: "Standard rollout",
    defaultChecked: true
  }
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("radio", { name: "Standard rollout" })).toBeChecked();
  }
};

export const States: Story = {
  render: () => (
    <div className="space-y-3">
      <Radio name="release" label="Standard rollout" defaultChecked />
      <Radio name="release" label="Strict gate" helperText="Use for stable shared components." />
      <Radio name="release" label="Disabled" disabled />
      <Radio name="release-error" label="Error state" error="Choose only when the release is blocked." />
    </div>
  )
};

export const Responsive: Story = {
  render: () => (
    <div className="max-w-xs space-y-3">
      <Radio name="wrap" label="A long radio option should wrap cleanly on small screens." />
      <Radio name="wrap" label="Another mutually exclusive option." />
    </div>
  )
};
