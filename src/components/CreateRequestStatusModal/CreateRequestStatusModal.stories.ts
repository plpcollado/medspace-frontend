import { Meta, StoryObj } from "@storybook/react";
import CreateRequestStatusModal from "./CreateRequestStatusModal";

const meta: Meta<typeof CreateRequestStatusModal> = {
  title: "Components/CreateRequestStatusModal",
  component: CreateRequestStatusModal,
  tags: ["autodocs"],
  args: {
    icon: "success",
    onClose: () => alert("Modal closed"),
  },
  argTypes: {
    icon: {
      control: {
        type: "select",
        options: ["success", "error"],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CreateRequestStatusModal>;

export const Success: Story = {
  args: {
    icon: "success",
  },
};

export const Error: Story = {
  args: {
    icon: "error",
  },
};