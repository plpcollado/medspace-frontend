import type { Meta, StoryObj } from "@storybook/react";
import TenantComment from "./TenantComment";

const meta: Meta<typeof TenantComment> = {
  title: "Components/TenantComment",
  component: TenantComment,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "The current value of the comment text",
    },
    onChange: {
      description: "Callback function that is called when the comment text changes",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the textarea element",
    },
    containerClassName: {
      control: "text",
      description: "Additional CSS classes for the container div",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown when the input is empty",
    },
    showTitle: {
      control: "boolean",
      description: "Whether to show the title above the textarea",
    },
    customTitle: {
      control: "text",
      description: "Custom title text to override the default",
    },
    rows: {
      control: "number",
      description: "Number of rows for the textarea",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TenantComment>;

export const Default: Story = {
  args: {
    value: "",
    onChange: (value: string) => console.log("Comment changed:", value),
    placeholder: "Enter your comment",
  },
};

export const WithExistingComment: Story = {
  args: {
    value: "This is an example of a tenant comment that has already been written.",
    onChange: (value: string) => console.log("Comment changed:", value),
    placeholder: "Enter your comment",
  },
};

export const ForModal: Story = {
  args: {
    value: "",
    onChange: (value: string) => console.log("Comment changed:", value),
    placeholder: "Enter your comment",
    showTitle: false,
    rows: 6,
  },
};

export const WithCustomTitle: Story = {
  args: {
    value: "",
    onChange: (value: string) => console.log("Comment changed:", value),
    placeholder: "Enter your comment",
    customTitle: "Add Your Feedback",
  },
};

export const Compact: Story = {
  args: {
    value: "",
    onChange: (value: string) => console.log("Comment changed:", value),
    placeholder: "Enter your comment",
    rows: 4,
    containerClassName: "gap-1",
  },
};
