import { expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import { Tooltip } from "./tooltip";

const meta = {
  title: "Components/Actions/Tooltip",
  component: Tooltip,
  tags: ["autodocs", "test"],
  args: {
    content: "Explains unfamiliar controls.",
    children: <Button variant="secondary">Hover or focus</Button>
  },
  parameters: {
    docs: {
      description: {
        component:
          "Use Tooltip to explain unfamiliar controls or compact labels. Tooltip content is connected with aria-describedby and appears on hover or focus. Avoid placing essential instructions only inside a tooltip."
      }
    }
  }
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip content="Explains unfamiliar controls.">
      <Button variant="secondary">Hover or focus</Button>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Hover or focus" })).toHaveAccessibleDescription(
      "Explains unfamiliar controls."
    );
  }
};

export const Placements: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Tooltip content="Shown above the trigger.">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip content="Shown below the trigger." side="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
    </div>
  )
};

export const Responsive: Story = {
  render: () => (
    <div className="max-w-xs">
      <Tooltip content="Keep tooltip copy short enough for small screens.">
        <Button variant="secondary" className="w-full">
          Compact help
        </Button>
      </Tooltip>
    </div>
  )
};
