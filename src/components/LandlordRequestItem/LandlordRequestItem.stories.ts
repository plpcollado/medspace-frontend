import { Meta, StoryObj } from "@storybook/react";
import LandlordRequestItem from "./LandlordRequestItem";

const meta: Meta<typeof LandlordRequestItem> = {
  title: "Components/LandlordRequestItem",
  component: LandlordRequestItem,
  tags: ["autodocs"],
  args: {
    specialistName: "Dr. John Doe",
    date: "April 15, 2025",
    officeName: "Downtown Clinic",
    specialistPhoto: "https://via.placeholder.com/32", // Placeholder image
    onClickAccept: () => alert("Accepted"),
    onClickDeny: () => alert("Denied"),
  },
};

export default meta;
type Story = StoryObj<typeof LandlordRequestItem>;

export const Default: Story = {};

export const WithPhoto: Story = {
  args: {
    specialistPhoto: "https://via.placeholder.com/32",
  },
};

export const WithoutPhoto: Story = {
  args: {
    specialistPhoto: undefined,
  },
};