import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Skeleton } from "./layout";

const meta = {
  title: "Components/Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component:
          "Use Skeleton to reserve layout while content loads. Pair it with surrounding loading text or status when the loading state needs to be announced. Avoid making skeleton shapes interactive."
      }
    }
  }
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Skeleton className="h-5 w-48" />
};

export const Variants: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-3">
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-10 w-32" />
    </div>
  )
};

export const Responsive: Story = {
  render: () => (
    <div className="grid gap-3 md:grid-cols-2">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  )
};
