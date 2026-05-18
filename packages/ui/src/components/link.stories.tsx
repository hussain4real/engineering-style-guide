import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Link } from "./link";

const meta = {
  title: "Components/Actions/Link",
  component: Link,
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component:
          "Use Link for navigation and references. Use the default treatment for prominent links and subtle links inside dense supporting copy. Avoid using links to submit forms or mutate data."
      }
    }
  },
  args: {
    href: "https://example.com",
    children: "Open guidance"
  }
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("link", { name: "Open guidance" })).toHaveAttribute("href", "https://example.com");
  }
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-3 text-sm">
      <p>
        <Link href="https://example.com">Default link</Link>
      </p>
      <p>
        <Link href="https://example.com" subtle>
          Subtle link
        </Link>
      </p>
    </div>
  )
};

export const Responsive: Story = {
  render: () => (
    <p className="max-w-xs text-sm leading-6 text-text">
      Long inline copy should wrap naturally while the <Link href="https://example.com">linked phrase remains readable</Link> on narrow
      screens.
    </p>
  )
};
