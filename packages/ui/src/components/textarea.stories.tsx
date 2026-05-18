import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Textarea } from "./forms";

const meta = {
  title: "Components/Forms/Textarea",
  component: Textarea,
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component:
          "Use Textarea for multi-line notes and explanations. Keep helper copy specific, expose validation errors as text, and let the field grow vertically. Avoid using it for structured data that needs separate fields."
      }
    }
  },
  args: {
    label: "Notes",
    placeholder: "Add context for the team",
    helperText: "Keep notes short and specific."
  }
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("Notes")).toHaveAccessibleDescription("Keep notes short and specific.");
  }
};

export const States: Story = {
  render: () => (
    <div className="grid max-w-2xl gap-4 md:grid-cols-2">
      <Textarea label="Default" helperText="Optional implementation detail." />
      <Textarea label="Error" error="Notes must explain the decision." />
      <Textarea label="Disabled" disabled value="Locked after approval." readOnly />
    </div>
  )
};

export const Responsive: Story = {
  render: () => <Textarea label="Review notes" className="min-h-32" helperText="The field spans the available width." />
};

export const AccessibleNameOnly: Story = {
  render: () => <Textarea aria-label="Implementation notes" placeholder="Add notes" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("textbox", { name: "Implementation notes" })).toBeInTheDocument();
  }
};
