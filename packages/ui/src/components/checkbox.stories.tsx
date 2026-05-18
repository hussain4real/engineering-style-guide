import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Checkbox } from "./forms";

const meta = {
  title: "Components/Forms/Checkbox",
  component: Checkbox,
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component:
          "Use Checkbox for independent yes/no choices or multi-select options. Include helper text when the consequence is not obvious and errors when a required choice is missing. Avoid using checkboxes for mutually exclusive choices."
      }
    }
  },
  args: {
    label: "Include Storybook story",
    helperText: "Required for reusable UI."
  }
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("checkbox", { name: "Include Storybook story" })).toHaveAccessibleDescription(
      "Required for reusable UI."
    );
  }
};

export const States: Story = {
  render: () => (
    <div className="space-y-3">
      <Checkbox label="Default" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Error" error="This confirmation is required." />
    </div>
  )
};

export const Responsive: Story = {
  render: () => (
    <div className="max-w-xs">
      <Checkbox label="Long option labels wrap without disconnecting the control from its description." helperText="Keep copy direct." />
    </div>
  )
};
