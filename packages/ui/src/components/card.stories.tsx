import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

const meta = {
  title: "Components/Layout/Card",
  component: Card,
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component:
          "Use Card to group one related object, decision, or summary. Use header, content, and footer slots consistently. Avoid nesting cards inside cards."
      }
    }
  }
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Style guide review</CardTitle>
        <CardDescription>Reusable UI changes should be reviewed through Storybook before merging.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-text">This card demonstrates the default border, radius, spacing, and typography.</p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary">Cancel</Button>
        <Button>Approve</Button>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Style guide review")).toBeVisible();
  }
};

export const Variants: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Compact card</CardTitle>
          <CardDescription>Short supporting context.</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardContent>
          <p className="text-sm leading-6 text-text">Content-only cards are acceptable for simple repeated objects.</p>
        </CardContent>
      </Card>
    </div>
  )
};

export const Responsive: Story = {
  render: () => (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Responsive card</CardTitle>
        <CardDescription>Footer actions wrap cleanly below content.</CardDescription>
      </CardHeader>
      <CardFooter className="flex-wrap justify-start">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </CardFooter>
    </Card>
  )
};
