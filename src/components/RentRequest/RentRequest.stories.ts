import type { Meta, StoryObj } from "@storybook/react";
import RentRequest from "./RentRequest";

const meta: Meta<typeof RentRequest> = {
  title: "Components/RentRequest",
  component: RentRequest,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "A modal component for requesting clinic rentals",
    docs: {
      description: {
        component: `
The RentRequest component provides a user interface for requesting clinic rentals with the following features:

- Calendar for selecting available dates
- Time range selection (placeholder)
- Comment box for additional notes (placeholder)
- Submit and Cancel actions

### Props
- \`clinicName\`: Name of the clinic being requested
- \`availableDates\`: Array of dates available for rent (ISO format: 'YYYY-MM-DD')
- \`occupiedDates\`: Array of dates already booked (ISO format: 'YYYY-MM-DD')
- \`requestDate\`: Object containing the allowed date range
  - \`start\`: Start date of the range (ISO format: 'YYYY-MM-DD')
  - \`end\`: End date of the range (ISO format: 'YYYY-MM-DD')

### Usage Example
\`\`\`tsx
<RentRequest
  clinicName="Modern Medical Clinic"
  availableDates={[
    "2024-03-01", "2024-03-02", // Available dates
    "2024-03-05", "2024-03-06",
  ]}
  occupiedDates={[
    "2024-03-03", "2024-03-04", // Already booked
  ]}
  requestDate={{
    start: "2024-03-01",
    end: "2024-03-31"
  }}
/>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RentRequest>;

// Helper function to generate dates
const generateDates = (start: string, days: number): string[] => {
  const dates: string[] = [];
  const startDate = new Date(start);
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date.toISOString().split("T")[0]);
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
        story: "Basic example showing a clinic with mixed availability across March. Some dates are available for rent, while others are already occupied.",
      },
    },
  },
};

export const LimitedAvailability: Story = {
  args: {
    clinicName: "Downtown Medical Center",
    availableDates: [
      ...generateDates("2024-03-01", 3),  // Only 3 days available
      ...generateDates("2024-03-15", 3),  // Another 3 days
    ],
    occupiedDates: [
      "2024-03-04", "2024-03-05",        // Some occupied days
      "2024-03-18", "2024-03-19",        // More occupied days
    ],
    requestDate: {
      start: "2024-03-01",
      end: "2024-03-31",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Example showing a clinic with very limited availability. Only a few days are available for rent, with most dates either occupied or not offered.",
      },
    },
  },
};

export const FullyAvailable: Story = {
  args: {
    clinicName: "New Medical Facility",
    availableDates: generateDates("2024-03-01", 31),  // All days available
    occupiedDates: [],  // No occupied dates
    requestDate: {
      start: "2024-03-01",
      end: "2024-03-31",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Example showing a new clinic with full availability. All dates in the range are available for rent.",
      },
    },
  },
}; 