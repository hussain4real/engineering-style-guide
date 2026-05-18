import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { cn } from "../lib/cn";

const meta = {
  title: "Components/Utilities/Class Names",
  tags: ["test"],
  parameters: {
    docs: {
      description: {
        component: "Internal coverage fixture for the shared class-name helper used by every primitive."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ComposedValues: Story = {
  render: () => (
    <div data-testid="class-output" className={cn("base", 1, ["nested", false, ["deep"]], { enabled: true, disabled: false })}>
      {cn("base", 1, ["nested", false, ["deep"]], { enabled: true, disabled: false })}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("class-output")).toHaveTextContent("base 1 nested deep enabled");
  }
};
