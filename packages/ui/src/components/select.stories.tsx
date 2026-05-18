import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Select } from "./forms";

const meta = {
  title: "Components/Forms/Select",
  component: Select,
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component:
          "Use Select for compact single-choice lists. Provide a label, include a meaningful default or placeholder option, and show errors in text. Avoid using Select for long search-heavy lists."
      }
    }
  }
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select label="Product area" defaultValue="frontend">
      <option value="frontend">Frontend</option>
      <option value="platform">Platform</option>
      <option value="data">Data</option>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("combobox", { name: "Product area" })).toHaveValue("frontend");
  }
};

export const States: Story = {
  render: () => (
    <div className="grid max-w-2xl gap-4 md:grid-cols-2">
      <Select label="Default" defaultValue="frontend">
        <option value="frontend">Frontend</option>
      </Select>
      <Select label="Error" error="Choose a product area.">
        <option value="">Select one</option>
      </Select>
      <Select label="Disabled" disabled>
        <option>Locked</option>
      </Select>
    </div>
  )
};

export const Responsive: Story = {
  render: () => (
    <div className="max-w-sm">
      <Select label="Narrow layout">
        <option>Frontend</option>
        <option>Platform</option>
      </Select>
    </div>
  )
};

export const HelperAndAccessibleName: Story = {
  render: () => (
    <Select aria-label="Team" helperText="Choose the owning team." defaultValue="frontend">
      <option value="frontend">Frontend</option>
      <option value="platform">Platform</option>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("combobox", { name: "Team" })).toHaveAccessibleDescription("Choose the owning team.");
  }
};
