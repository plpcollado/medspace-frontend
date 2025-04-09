import { Meta, StoryObj } from "@storybook/react";
import LandlordClinicListItem from "./LandlordClinicListItem";

const meta: Meta<typeof LandlordClinicListItem> = {
  title: "Components/LandlordClinicListItem",
  component: LandlordClinicListItem,
  tags: ["autodocs"],
  args: {
    clinicName: "Consultorio Médico Moderno",
    clinicState: "Aguascalientes",
    clinicImageURL:
      "https://upload.wikimedia.org/wikipedia/commons/b/b3/Double_hospital_room._Ulan-Ude%2C_Buryatia.jpg",
    numberOfClinicRequests: 12,
    onClickEdit: () => {
      alert("Edit clicked");
    },
    onClickRequests: () => {
      alert("Requests clicked");
    },
    onShareClick: () => {
      alert("Share clicked");
    },
  },
};

export default meta;
type Story = StoryObj<typeof LandlordClinicListItem>;

export const Primary: Story = {};
