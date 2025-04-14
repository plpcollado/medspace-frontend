import { Meta, StoryObj } from "@storybook/react";
import RentRequest from "@/components/RentRequest"; // Adjust the import path as needed
import { addDays } from "date-fns";

const meta: Meta<typeof RentRequest> = {
  title: "Components/RentRequest",
  component: RentRequest,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    clinicName: {
      control: "text",
      description: "Name of the clinic being requested"
    },
    occupiedDates: {
      control: "object",
      description:
        "Array of dates that are already occupied and cannot be selected"
    },
    availableDatesEnd: {
      control: "date",
      description: "The last date available for selection"
    }
  }
};

export default meta;
type Story = StoryObj<typeof RentRequest>;

// Generate some sample occupied dates (today plus a few random days)
const today = new Date();
const generateOccupiedDates = () => [
  today,
  addDays(today, 2),
  addDays(today, 5),
  addDays(today, 8),
  addDays(today, 15)
];

// Default RentRequest
export const Default: Story = {
  args: {
    clinicName: "Downtown Medical Office",
    occupiedDates: generateOccupiedDates(),
    availableDatesEnd: addDays(today, 60) // Available for the next 60 days
  }
};

// RentRequest with different clinic name
export const DifferentClinic: Story = {
  args: {
    clinicName: "Sunset Boulevard Dental Practice",
    occupiedDates: generateOccupiedDates(),
    availableDatesEnd: addDays(today, 90) // Available for the next 90 days
  }
};

// RentRequest with many occupied dates
export const MostlyOccupied: Story = {
  args: {
    clinicName: "Oak Street Pediatric Center",
    occupiedDates: [
      ...Array(20)
        .fill(0)
        .map((_, i) => addDays(today, i + 1))
        .filter((_, i) => i % 2 === 0)
    ],
    availableDatesEnd: addDays(today, 30)
  }
};

// RentRequest with limited availability window
export const LimitedAvailability: Story = {
  args: {
    clinicName: "Central Hospital Consulting Room",
    occupiedDates: generateOccupiedDates(),
    availableDatesEnd: addDays(today, 14) // Only available for the next 2 weeks
  }
};

// RentRequest without end date constraint
export const NoEndDateConstraint: Story = {
  args: {
    clinicName: "Lakeside Radiology Center",
    occupiedDates: generateOccupiedDates()
    // No availableDatesEnd provided, so no upper limit
  }
};
