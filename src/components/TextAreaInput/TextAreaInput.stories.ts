import { Meta, StoryObj } from "@storybook/react";
import TextAreaInput from "./TextAreaInput";

const meta: Meta<typeof TextAreaInput> = {
  title: "Components/TextAreaInput",
  component: TextAreaInput,
  tags: ["autodocs"],
  argTypes: {
    isInvalid: { control: "boolean" },
    label: { control: "text" },
    invalidMessage: { control: "text" },
    className: { control: "text" }
  }
};

export default meta;

type Story = StoryObj<typeof TextAreaInput>;

export const Default: Story = {
  args: {
    label: "Default Input"
  }
};

export const InvalidInput: Story = {
  args: {
    label: "Invalid Input",
    isInvalid: true,
    invalidMessage: "This field is required."
  }
};
