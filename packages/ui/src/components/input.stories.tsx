import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./forms";

const meta = {
  title: "Components/Forms/Input",
  component: Input,
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component:
          "Use Input for short single-line values. Always provide a visible label or intentional accessible name, helper text when format matters, and text-based errors. Avoid relying on placeholder text as the only label."
      }
    }
  },
  args: {
    label: "Email",
    placeholder: "name@milaha.com",
    helperText: "Use your company email."
  }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("Email")).toHaveAccessibleDescription("Use your company email.");
  }
};

export const States: Story = {
  render: () => (
    <div className="grid max-w-2xl gap-4 md:grid-cols-2">
      <Input label="Default" placeholder="Default value" />
      <Input label="Disabled" placeholder="Unavailable" disabled />
      <Input label="Error" placeholder="name@milaha.com" error="Enter a valid MILAHA email." />
    </div>
  )
};

export const Responsive: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      <Input label="First name" />
      <Input label="Last name" />
    </div>
  )
};

export const AccessibleNameOnly: Story = {
  render: () => <Input aria-label="Search components" placeholder="Search" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("textbox", { name: "Search components" })).toBeInTheDocument();
  }
};
