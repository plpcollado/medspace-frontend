import { Meta, StoryObj } from "@storybook/react";
import LandlordClinicListItem from "./LandlordClinicListItem";

const meta: Meta<typeof LandlordClinicListItem> = {
  title: "Components/LandlordClinicListItem",
  component: LandlordClinicListItem,
  tags: ["autodocs"],
  args: {
    clinicName: "Consultorio Médico Moderno",
    clinicLocation: "Aguascalientes",
    clinicImageURL:
      "https://upload.wikimedia.org/wikipedia/commons/b/b3/Double_hospital_room._Ulan-Ude%2C_Buryatia.jpg",

    onEdit: () => {
      alert("Edit clicked");
    },
    onDelete: () => {
      alert("Delete clicked");
    },
    onShare: () => {
      alert("Share clicked");
    }
  }
};

export default meta;
type Story = StoryObj<typeof LandlordClinicListItem>;

export const Primary: Story = {};
