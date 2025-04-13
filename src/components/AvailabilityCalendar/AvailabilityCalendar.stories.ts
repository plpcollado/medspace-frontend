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
- Validates individual dates based on availability and occupancy
- Handles timezone safely using noon-based dates

### Date Validation Rules
- Users can only select dates within the allowed range (request_date)
- Users cannot select occupied dates
- Users cannot select unavailable dates
- Users can select any combination of available dates

### Date Format
All dates should be provided in ISO format ('YYYY-MM-DD')

### Usage Example
\`\`\`tsx
const [selectedDates, setSelectedDates] = useState<Date[]>([]);

<AvailabilityCalendar
  availableDates={availableDates}
  occupiedDates={occupiedDates}
  request_date={{
    start: "2024-03-01",
    end: "2024-03-31"
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
    availableDates: generateDates("2024-03-01", 30),
    occupiedDates: ["2024-03-15", "2024-03-16", "2024-03-17"],
    request_date: {
      start: "2024-03-01",
      end: "2024-03-31",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Basic calendar with some occupied dates in the middle of the month. You can select any available dates, they don't need to be consecutive.",
      },
    },
  },
};

export const WithPreselectedDates: Story = {
  args: {
    ...Default.args,
    selected_dates: [
      new Date("2024-03-05"),
      new Date("2024-03-10"),
      new Date("2024-03-14"),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Calendar initialized with pre-selected dates. Note how the dates can be non-consecutive.",
      },
    },
  },
};

export const MostlyOccupied: Story = {
  args: {
    availableDates: generateDates("2024-03-01", 30),
    occupiedDates: generateDates("2024-03-10", 15), // 15 days occupied in the middle
    request_date: {
      start: "2024-03-01",
      end: "2024-03-31",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Calendar with a large block of occupied dates (March 10-24). Shows how users can select dates from the available periods before and after the occupied block.",
      },
    },
  },
};

export const SplitAvailability: Story = {
  args: {
    availableDates: [
      ...generateDates("2024-03-01", 5),
      ...generateDates("2024-03-15", 5),
      ...generateDates("2024-03-25", 5),
    ],
    occupiedDates: ["2024-03-17", "2024-03-18"],
    request_date: {
      start: "2024-03-01",
      end: "2024-03-31",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Calendar with split availability periods. Users can select any combination of available dates across different periods.",
      },
    },
  },
};
