import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Alert } from "./alert";

const meta = {
  title: "Components/Feedback/Alert",
  component: Alert,
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component:
          "Use Alert for inline status and guidance. Tone should match severity, and the message should include the required next step. Avoid alerts for transient toast-only updates."
      }
    }
  },
  args: {
    title: "Information",
    children: "Use this for neutral guidance or updates."
  }
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("status")).toHaveTextContent("Information");
  }
};

export const Variants: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-4 md:grid-cols-2">
      <Alert title="Information">Use this for neutral guidance or updates.</Alert>
      <Alert tone="success" title="Saved">
        The changes were saved successfully.
      </Alert>
      <Alert tone="warning" title="Review needed">
        This action can affect production users.
      </Alert>
      <Alert tone="danger" title="Unable to save">
        Resolve the validation errors and try again.
      </Alert>
    </div>
  )
};

export const Responsive: Story = {
  render: () => (
    <Alert title="Narrow layout">
      Alert content wraps naturally and keeps the status title associated with the message on small screens.
    </Alert>
  )
};

export const WithoutTitle: Story = {
  render: () => <Alert>Inline guidance can also be presented without a separate heading.</Alert>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("status")).toHaveTextContent("Inline guidance");
  }
};
