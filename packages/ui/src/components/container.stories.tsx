import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Container } from "./layout";

const meta = {
  title: "Components/Layout/Container",
  component: Container,
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component:
          "Use Container to constrain page sections while keeping them responsive. Avoid using it inside small cards or controls where local spacing is enough."
      }
    }
  }
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Container>
      <div className="rounded-lg bg-background-soft p-4 text-sm text-text">Contained content</div>
    </Container>
  )
};

export const Responsive: Story = {
  render: () => (
    <Container className="bg-background-soft py-4">
      <p className="text-sm leading-6 text-text">Container padding changes across breakpoints while content remains readable.</p>
    </Container>
  )
};
