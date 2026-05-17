import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Checkbox, Input, Radio, Select, Textarea } from "./forms";
import { Switch } from "./switch";

const meta = {
  title: "Components/Forms",
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component: "Form controls provide labels, helper copy, validation states, and keyboard-friendly defaults."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextFields: Story = {
  render: () => (
    <div className="grid max-w-2xl gap-5 md:grid-cols-2">
      <Input label="Full name" placeholder="Amisha" helperText="Use the name shown in the product." />
      <Input label="Email" type="email" placeholder="name@company.com" error="Enter a valid company email." />
      <Textarea label="Notes" placeholder="Add context for the team" helperText="Keep notes short and specific." className="md:col-span-2" />
    </div>
  )
};

export const ChoiceFields: Story = {
  render: () => (
    <div className="max-w-xl space-y-5">
      <Select label="Product area" defaultValue="frontend">
        <option value="frontend">Frontend</option>
        <option value="platform">Platform</option>
        <option value="data">Data</option>
      </Select>
      <div className="space-y-3">
        <Checkbox label="Include Storybook story" defaultChecked helperText="Required for reusable UI." />
        <Checkbox label="Needs migration notes" />
      </div>
      <div className="space-y-3">
        <Radio name="priority" label="Standard rollout" defaultChecked />
        <Radio name="priority" label="Strict gate" />
      </div>
    </div>
  )
};

export const SwitchStates: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch label="Enable notifications" defaultChecked />
      <Switch label="Disable notifications" />
      <Switch label="Unavailable setting" disabled />
    </div>
  )
};
