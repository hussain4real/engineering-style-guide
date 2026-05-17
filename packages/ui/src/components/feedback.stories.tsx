import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Alert } from "./alert";
import { Badge } from "./badge";
import { Spinner } from "./spinner";
import { Toast } from "./toast";
import { Skeleton } from "./layout";

const meta = {
  title: "Components/Feedback",
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component: "Feedback components communicate state without relying on color alone."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Badges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge tone="primary">Primary</Badge>
      <Badge tone="accent">Accent</Badge>
      <Badge tone="info">Info</Badge>
      <Badge tone="success">Success</Badge>
      <Badge tone="warning">Warning</Badge>
      <Badge tone="danger">Danger</Badge>
    </div>
  )
};

export const Alerts: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-4 md:grid-cols-2">
      <Alert title="Information">Use this for neutral guidance or updates.</Alert>
      <Alert tone="success" title="Saved">The changes were saved successfully.</Alert>
      <Alert tone="warning" title="Review needed">This action can affect production users.</Alert>
      <Alert tone="danger" title="Unable to save">Resolve the validation errors and try again.</Alert>
    </div>
  )
};

export const LoadingAndEmpty: Story = {
  render: () => (
    <div className="space-y-5">
      <Spinner />
      <div className="w-full max-w-md space-y-3">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  )
};

export const Toasts: Story = {
  render: () => (
    <div className="space-y-3">
      <Toast title="Deployment started">Production deployment is now running.</Toast>
      <Toast tone="danger" title="Deployment failed">
        Check the failing workflow before retrying.
      </Toast>
    </div>
  )
};
