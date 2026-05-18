import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Checkbox, Input, Radio, Select, Textarea } from "./forms";

describe("form controls", () => {
  it("associates input labels and helper text", () => {
    render(<Input label="Email" helperText="Use your company email." />);

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAccessibleDescription("Use your company email.");
  });

  it("marks fields invalid when an error is shown", () => {
    render(<Textarea label="Reason" error="Reason is required." />);

    const textarea = screen.getByLabelText("Reason");
    expect(textarea).toBeInvalid();
    expect(textarea).toHaveAccessibleDescription("Reason is required.");
  });

  it("renders native select options", () => {
    render(
      <Select label="Team" defaultValue="frontend">
        <option value="frontend">Frontend</option>
      </Select>
    );

    expect(screen.getByRole("combobox", { name: "Team" })).toHaveValue("frontend");
  });

  it("renders labeled checkboxes", () => {
    render(<Checkbox label="Include Storybook story" defaultChecked />);

    expect(screen.getByRole("checkbox", { name: "Include Storybook story" })).toBeChecked();
  });

  it("associates checkbox helper text and radio errors", () => {
    render(
      <>
        <Checkbox label="Needs review" helperText="Required for shared UI." />
        <Radio name="priority" label="Strict gate" error="Select this only for stable components." />
      </>
    );

    expect(screen.getByRole("checkbox", { name: "Needs review" })).toHaveAccessibleDescription("Required for shared UI.");
    expect(screen.getByRole("radio", { name: "Strict gate" })).toBeInvalid();
    expect(screen.getByRole("radio", { name: "Strict gate" })).toHaveAccessibleDescription(
      "Select this only for stable components."
    );
  });
});
