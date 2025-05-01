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
    variant: "primary",
    isLoading: false // Default value for isLoading
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "blue", "outline", "danger"],
      defaultValue: "primary"
    },
    size: {
      control: "select",
      options: ["default", "small", "large", "fill"],
      defaultValue: "default"
    },
    icon: {
      control: "text", // Allow emoji or any valid string icon representation
      description: "Icon to display in the Button (React Node)"
    },
    className: {
      table: {
        disable: true
      }
    },
    isLoading: {
      control: "boolean",
      description: "Enable loading state with a spinner"
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button"
  }
};

export const Blue: Story = {
  args: {
    variant: "blue",
    children: "Blue Button"
  }
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button"
  }
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Danger Button"
  }
};

export const Icon: Story = {
  args: {
    icon: "🔔",
    children: "Button with Icon"
  }
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: "Loading..."
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Hello!"
  }
};
