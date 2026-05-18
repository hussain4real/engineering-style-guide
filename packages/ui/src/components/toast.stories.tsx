import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Toast } from "./toast";

const meta = {
  title: "Components/Feedback/Toast",
  component: Toast,
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component:
          "Use Toast for transient status after user action. The title should be enough to understand the outcome, and danger toasts use alert semantics. Avoid using toasts for critical persistent instructions."
      }
    }
  },
  args: {
    title: "Deployment started",
    children: "Production deployment is now running."
  }
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("status")).toHaveTextContent("Deployment started");
  }
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-3">
      <Toast title="Deployment started">Production deployment is now running.</Toast>
      <Toast tone="success" title="Deployment complete">
        Production is up to date.
      </Toast>
      <Toast tone="warning" title="Review needed">
        Check the release notes before continuing.
      </Toast>
      <Toast tone="danger" title="Deployment failed">
        Check the failing workflow before retrying.
      </Toast>
    </div>
  )
};

export const Responsive: Story = {
  render: () => (
    <div className="max-w-xs">
      <Toast title="Queued">Longer toast content wraps inside the compact width without hiding the title.</Toast>
    </div>
  )
};
