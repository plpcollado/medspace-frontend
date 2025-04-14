import type { Meta, StoryObj } from "@storybook/react";
import AvailabilityCalendar from "./AvailabilityCalendar";

const meta: Meta<typeof AvailabilityCalendar> = {
  title: "Components/AvailabilityCalendar",
  component: AvailabilityCalendar,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "A calendar component for selecting multiple rental days",
    docs: {
      description: {
        component: `
The AvailabilityCalendar allows users to select individual days for renting, with smart validation:

- Supports multiple, non-consecutive day selection
- Shows two months at a time for better planning
- Distinguishes between unavailable and occupied dates:
  - Unavailable: Dates not offered for rent (not in availableDates)
  - Occupied: Dates that are already booked (in occupiedDates)
- Handles timezone safely using noon-based dates

### Date Validation Rules
- Users can only select dates that are both:
  1. Within the allowed range (request_date)
  2. Listed in availableDates
- Users cannot select occupied dates
- Users can select any combination of available dates

### Date Format
All dates should be provided in ISO format ('YYYY-MM-DD')

### Usage Example
\`\`\`tsx
const [selectedDates, setSelectedDates] = useState<Date[]>([]);

<AvailabilityCalendar
  availableDates={[
    "2024-03-01", "2024-03-02", // Available for rent
    "2024-03-05", "2024-03-06", // Available for rent
  ]}
  occupiedDates={[
    "2024-03-03", "2024-03-04"  // Already booked
  ]}
  request_date={{
    start: "2024-03-01",
    end: "2024-04-30"
  }}
  selected_dates={selectedDates}
  onDatesChange={setSelectedDates}
/>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AvailabilityCalendar>;

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
    // Only specific dates are available for rent
    availableDates: [
      ...generateDates("2024-03-01", 5),  // First week
      ...generateDates("2024-03-10", 5),  // Second week
      ...generateDates("2024-03-20", 5),  // Third week
      ...generateDates("2024-04-01", 5),  // First week of April
      ...generateDates("2024-04-15", 5),  // Mid April
    ],
    // Some available dates are already booked
    occupiedDates: [
      "2024-03-02", "2024-03-03",        // Some days in March
      "2024-04-02", "2024-04-03",        // Some days in April
    ],
    request_date: {
      start: "2024-03-01",
      end: "2024-04-30",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Shows two months with a mix of available, unavailable, and occupied dates. White dates are unavailable (not offered for rent), disabled dates are occupied (already booked), and the rest are available for selection.",
      },
    },
  },
};

export const WithPreselectedDates: Story = {
  args: {
    availableDates: [
      ...generateDates("2024-03-01", 10),
      ...generateDates("2024-03-15", 10),
      ...generateDates("2024-04-01", 10),
      ...generateDates("2024-04-15", 10),
    ],
    occupiedDates: [
      "2024-03-05", "2024-03-06",
      "2024-04-03", "2024-04-04",
    ],
    request_date: {
      start: "2024-03-01",
      end: "2024-04-30",
    },
    selected_dates: [
      new Date("2024-03-02"),
      new Date("2024-03-15"),
      new Date("2024-04-01"),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Calendar initialized with pre-selected dates across both months. Note how selected dates are all from the available dates list.",
      },
    },
  },
};

export const MostlyUnavailable: Story = {
  args: {
    // Very few dates available for rent
    availableDates: [
      ...generateDates("2024-03-15", 5),
      ...generateDates("2024-04-15", 5),
    ],
    // Some of the available dates are occupied
    occupiedDates: [
      "2024-03-16", "2024-04-16"
    ],
    request_date: {
      start: "2024-03-01",
      end: "2024-04-30",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Calendar with very limited availability. Most dates are unavailable (not offered for rent), with a few occupied dates within the available periods.",
      },
    },
  },
};

export const SplitAvailability: Story = {
  args: {
    availableDates: [
      ...generateDates("2024-03-01", 5),   // Early March
      ...generateDates("2024-03-20", 5),   // Late March
      ...generateDates("2024-04-05", 5),   // Early April
      ...generateDates("2024-04-25", 5),   // Late April
    ],
    occupiedDates: [
      "2024-03-02", "2024-03-21",         // One day in each March period
      "2024-04-06", "2024-04-26",         // One day in each April period
    ],
    request_date: {
      start: "2024-03-01",
      end: "2024-04-30",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Calendar with split availability periods across two months. Shows clear distinction between dates that are unavailable (not offered) versus those that are occupied (booked).",
      },
    },
  },
};
