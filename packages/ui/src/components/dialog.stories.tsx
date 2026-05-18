import { expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import { Dialog } from "./dialog";

const meta = {
  title: "Components/Overlays/Dialog",
  component: Dialog,
  tags: ["autodocs", "test"],
  args: {
    open: true,
    title: "Confirm component change"
  },
  parameters: {
    docs: {
      description: {
        component:
          "Use Dialog for focused decisions and short workflows that interrupt the current page. Provide a clear title, optional description, and explicit exits. Avoid dialogs for dense full-page work."
      }
    }
  }
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog
      open
      title="Confirm component change"
      description="Dialogs should focus on one decision and provide clear exits."
      footer={
        <>
          <Button variant="secondary">Cancel</Button>
          <Button>Confirm</Button>
        </>
      }
    >
      <p className="text-sm leading-6 text-text">This example is pinned open so reviewers can inspect structure and accessibility.</p>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("dialog", { name: "Confirm component change" })).toHaveAccessibleDescription(
      "Dialogs should focus on one decision and provide clear exits."
    );
  }
};

export const CloseInteraction: Story = {
  render: () => (
    <Dialog open title="Closable dialog" description="Use the close action to exit.">
      <p className="text-sm leading-6 text-text">Dialog body.</p>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Close" }));
  }
};

export const Responsive: Story = {
  render: () => (
    <Dialog open title="Responsive dialog" description="The dialog width is constrained by the viewport.">
      <p className="text-sm leading-6 text-text">Content wraps inside the overlay on small screens.</p>
    </Dialog>
  )
};
