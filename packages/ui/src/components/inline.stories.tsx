import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import { Inline } from "./layout";

const meta = {
  title: "Components/Layout/Inline",
  component: Inline,
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component:
          "Use Inline for horizontal groups that can wrap. Choose alignment by content shape and let actions wrap on narrow screens. Avoid using Inline for complex page grids."
      }
    }
  },
  argTypes: {
    gap: { control: "select", options: ["sm", "md", "lg"] },
    align: { control: "select", options: ["start", "center", "end"] }
  }
} satisfies Meta<typeof Inline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Inline>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
    </Inline>
  )
};

export const Responsive: Story = {
  render: () => (
    <Inline className="max-w-xs">
      <Button>Approve</Button>
      <Button variant="secondary">Request changes</Button>
      <Button variant="ghost">Cancel</Button>
    </Inline>
  )
};
