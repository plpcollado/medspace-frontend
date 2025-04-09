import { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
    onClick: () => alert("Button clicked!"),
    icon: null,
    size: "default",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "blue", "outline", "danger"],
      defaultValue: "primary",
    },
    size: {
      control: "select",
      options: ["default", "small", "large", "fill"],
      defaultValue: "default",
    },
    icon: {
      control: false,
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Blue: Story = {
  args: {
    variant: "blue",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
  },
};

export const Icon: Story = {
  args: {
    icon: "🔔",
  },
};
