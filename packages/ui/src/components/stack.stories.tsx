import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Stack } from "./layout";

const meta = {
  title: "Components/Layout/Stack",
  component: Stack,
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component:
          "Use Stack for vertical spacing between related elements. Choose the smallest gap that keeps the group scannable. Avoid using custom margins for repeated vertical rhythm."
      }
    }
  },
  argTypes: {
    gap: { control: "select", options: ["sm", "md", "lg"] }
  }
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Stack>
      <div className="rounded-lg bg-background-soft p-4">Stack item one</div>
      <div className="rounded-lg bg-background-soft p-4">Stack item two</div>
    </Stack>
  )
};

export const Variants: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-3">
      {(["sm", "md", "lg"] as const).map((gap) => (
        <Stack key={gap} gap={gap}>
          <div className="rounded-lg bg-background-soft p-3 text-sm">{gap}</div>
          <div className="rounded-lg bg-background-soft p-3 text-sm">gap</div>
        </Stack>
      ))}
    </div>
  )
};
