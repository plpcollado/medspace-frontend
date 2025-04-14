import { Meta, StoryObj } from "@storybook/react";
import DatePicker from "@/components/DatePicker"; // Adjust the import path as needed
import { addDays, subDays } from "date-fns"; // You might need to install date-fns

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "multiple"],
      description: "Selection mode of the date picker"
    },
    onSelectDate: {
      description: "Callback that fires when a date is selected"
    },
    fromDate: {
      control: "date",
      description: "Earliest selectable date"
    },
    toDate: {
      control: "date",
      description: "Latest selectable date"
    },
    disabledDates: {
      description: "Array of specific dates to disable"
    },
    className: {
      description: "Additional CSS classes"
    }
  }
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// Default DatePicker
export const Default: Story = {
  args: {
    onSelectDate: (date) => console.log("Selected date:", date)
  }
};

// DatePicker with date range constraints
export const WithDateRange: Story = {
  args: {
    onSelectDate: (date) => console.log("Selected date:", date),
    fromDate: subDays(new Date(), 5), // 5 days ago
    toDate: addDays(new Date(), 30) // 30 days in future
  }
};

// DatePicker with disabled dates
export const WithDisabledDates: Story = {
  args: {
    onSelectDate: (date) => console.log("Selected date:", date),
    disabledDates: [
      new Date(), // Today
      addDays(new Date(), 2), // Day after tomorrow
      addDays(new Date(), 5) // 5 days from now
    ]
  }
};

// DatePicker with custom styling
export const CustomStyling: Story = {
  args: {
    onSelectDate: (date) => console.log("Selected date:", date),
    className: "bg-blue-50 border-blue-200"
  }
};

// DatePicker in multiple selection mode
export const MultipleSelection: Story = {
  args: {
    onSelectDate: (dates) => console.log("Selected dates:", dates),
    mode: "multiple"
  }
};
