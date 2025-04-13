import type { Meta, StoryObj } from "@storybook/react";
import RentRequest from "./RentRequest";

const meta: Meta<typeof RentRequest> = {
  title: "Components/RentRequest",
  component: RentRequest,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A form component for submitting clinic rental requests. It includes:

- A title and description explaining the request process
- Calendar for selecting available dates
- Time range selector (placeholder for future implementation)
- Optional comment section for additional details
- Submit and Cancel actions

### Props

- \`clinicName\`: Name of the clinic being requested
- \`availableDates\`: Array of dates when the clinic is available (format: 'YYYY-MM-DD')
- \`occupiedDates\`: Array of dates when the clinic is already booked (format: 'YYYY-MM-DD')
- \`requestDate\`: Object containing the allowed date range
  - \`start\`: Start date of the range (format: 'YYYY-MM-DD')
  - \`end\`: End date of the range (format: 'YYYY-MM-DD')
`,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RentRequest>;

// Helper function to generate dates
const generateDates = (startDate: string, count: number) => {
  const dates = [];
  let currentDate = new Date(startDate);
  
  for (let i = 0; i < count; i++) {
    dates.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
};

export const Default: Story = {
  args: {
    clinicName: "Modern Medical Clinic",
    availableDates: [
      ...generateDates("2024-03-01", 5),  // First week
      ...generateDates("2024-03-10", 5),  // Second week
      ...generateDates("2024-03-20", 5),  // Third week
    ],
    occupiedDates: [
      "2024-03-02", "2024-03-03",        // Some days in March
      "2024-03-12", "2024-03-13",        // Some days in March
    ],
    requestDate: {
      start: "2024-03-01",
      end: "2024-03-31",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Default view of the rent request form showing a clinic with mixed availability across March.",
      },
    },
  },
};

export const WithLongClinicName: Story = {
  args: {
    clinicName: "Dr. Smith's Advanced Dental & Orthodontics Center - Downtown Location",
    availableDates: [
      ...generateDates("2024-03-01", 3),
    ],
    occupiedDates: [
      "2024-03-04", "2024-03-05",
    ],
    requestDate: {
      start: "2024-03-01",
      end: "2024-03-07",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Shows how the form handles a long clinic name while maintaining proper layout.",
      },
    },
  },
};

export const LimitedAvailability: Story = {
  args: {
    clinicName: "City Dental Office",
    availableDates: [
      "2024-03-01", "2024-03-15", "2024-03-30",  // Only few dates available
    ],
    occupiedDates: [
      ...generateDates("2024-03-02", 13),  // Most days are occupied
      ...generateDates("2024-03-16", 14),
    ],
    requestDate: {
      start: "2024-03-01",
      end: "2024-03-31",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Shows the form when the clinic has limited availability, with most dates being occupied.",
      },
    },
  },
}; 