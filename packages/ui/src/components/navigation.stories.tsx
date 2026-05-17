import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import { Dialog } from "./dialog";
import { Tabs } from "./tabs";

const meta = {
  title: "Components/Navigation And Overlays",
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component: "Tabs and dialogs support focused product workflows without inventing page-level patterns in v1."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TabsExample: Story = {
  render: () => (
    <Tabs
      items={[
        { value: "overview", label: "Overview", content: <p className="text-sm leading-6 text-text">Use overview for summary information.</p> },
        { value: "usage", label: "Usage", content: <p className="text-sm leading-6 text-text">Use usage for implementation guidance.</p> },
        { value: "disabled", label: "Disabled", content: "Unavailable", disabled: true }
      ]}
    />
  )
};

export const DialogExample: Story = {
  render: () => (
    <div>
      <Dialog
        open
        title="Confirm component change"
        description="Dialogs should focus on one decision and provide clear exits."
        footer={
          <>
            <Button variant="secondary">Cancel</Button>
            <Button>Confirm</Button>
          </>
        }
      >
        <p className="text-sm leading-6 text-text">This example is pinned open so reviewers can inspect structure and accessibility in Storybook.</p>
      </Dialog>
    </div>
  )
};
