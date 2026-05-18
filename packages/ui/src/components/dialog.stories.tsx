import { useState } from "react";
import { expect, fireEvent, userEvent, within } from "storybook/test";
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

let restoreDialogShowModal = () => undefined;

function StatefulDialog({ title = "Stateful dialog", description }: { title?: string; description?: string }) {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} title={title} description={description} onOpenChange={setOpen}>
      <p className="text-sm leading-6 text-text">Dialog body.</p>
    </Dialog>
  );
}

function FallbackDialog() {
  const prototype = HTMLDialogElement.prototype;
  const originalShowModal = prototype.showModal;

  prototype.showModal = undefined as unknown as typeof prototype.showModal;
  restoreDialogShowModal = () => {
    prototype.showModal = originalShowModal;
  };

  return (
    <Dialog open title="Fallback dialog">
      <p className="text-sm leading-6 text-text">Dialog body.</p>
    </Dialog>
  );
}

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
  render: () => <StatefulDialog title="Closable dialog" description="Use the close action to exit." />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Close" }));
    await expect(canvas.getByRole("dialog", { hidden: true })).not.toHaveAttribute("open");
  }
};

export const DismissEvents: Story = {
  render: () => <StatefulDialog title="Dismissible dialog" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dialog = canvas.getByRole("dialog", { name: "Dismissible dialog" });
    await expect(dialog).toHaveAttribute("open");

    fireEvent(dialog, new Event("cancel", { bubbles: true, cancelable: true }));
    await expect(canvas.getByRole("dialog", { hidden: true })).not.toHaveAttribute("open");
  }
};

export const BackdropInteraction: Story = {
  render: () => <StatefulDialog title="Backdrop dialog" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dialog = canvas.getByRole("dialog", { name: "Backdrop dialog" });

    fireEvent.click(dialog);
    await expect(canvas.getByRole("dialog", { hidden: true })).not.toHaveAttribute("open");
  }
};

export const WithoutDescription: Story = {
  render: () => (
    <Dialog open title="Title only dialog">
      <p className="text-sm leading-6 text-text">Dialog content can stand without supporting description text.</p>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("dialog", { name: "Title only dialog" })).not.toHaveAttribute("aria-describedby");
  }
};

export const NativeFallback: Story = {
  render: () => <FallbackDialog />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    try {
      await expect(canvas.getByRole("dialog", { name: "Fallback dialog" })).toHaveAttribute("open");
    } finally {
      restoreDialogShowModal();
    }
  }
};

export const Responsive: Story = {
  render: () => (
    <Dialog open title="Responsive dialog" description="The dialog width is constrained by the viewport.">
      <p className="text-sm leading-6 text-text">Content wraps inside the overlay on small screens.</p>
    </Dialog>
  )
};
