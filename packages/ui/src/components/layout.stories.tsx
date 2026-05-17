import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Container, Inline, Stack } from "./layout";

const meta = {
  title: "Components/Layout",
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component: "Layout helpers keep spacing consistent without replacing app-level layout decisions."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cards: Story = {
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
  )
};

export const StackAndInline: Story = {
  render: () => (
    <Container>
      <Stack gap="lg">
        <div className="rounded-lg bg-background-soft p-4">Stack item one</div>
        <div className="rounded-lg bg-background-soft p-4">Stack item two</div>
        <Inline>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </Inline>
      </Stack>
    </Container>
  )
};
