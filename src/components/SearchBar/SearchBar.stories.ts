import { Meta, StoryObj } from "@storybook/react";
import SearchBar from "@/components/SearchBar"; // Adjust the import path as needed
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof SearchBar> = {
  title: "Components/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    defaultLocation: {
      control: "text",
      description: "Default location value"
    },
    defaultDate: {
      control: "date",
      description: "Default date value"
    },
    defaultTime: {
      control: "text",
      description: "Default time value in format HH:MM"
    },
    locations: {
      control: "select",
      description: "List of available locations"
    },
    onSearch: {
      action: "searched",
      description: "Callback fired when search is clicked"
    },
    isLoading: {
      control: "boolean",
      description: "Whether the component is in a loading state"
    }
  }
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

// Default SearchBar
export const Default: Story = {
  args: {
    locations: ["CMDX", "MONTERREY", "GUADALAJARA"],
    onSearch: action("search-clicked")
  }
};

// SearchBar with default values
export const WithDefaultValues: Story = {
  args: {
    defaultLocation: "GUADALAJARA",
    defaultDate: new Date(2025, 3, 20), // April 20, 2025
    defaultTime: "14:30",
    locations: ["CMDX", "MONTERREY", "GUADALAJARA", "PUEBLA"],
    onSearch: action("search-clicked")
  }
};

// SearchBar with many locations
export const ManyLocations: Story = {
  args: {
    locations: [
      "CMDX",
      "MONTERREY",
      "GUADALAJARA",
      "PUEBLA",
      "TIJUANA",
      "CANCUN",
      "MERIDA",
      "QUERETARO"
    ],
    onSearch: action("search-clicked")
  }
};

// SearchBar in loading state
export const Loading: Story = {
  args: {
    locations: ["CMDX", "MONTERREY"],
    isLoading: true,
    onSearch: action("search-clicked")
  }
};

// SearchBar with single location
export const SingleLocation: Story = {
  args: {
    locations: ["CDMX"],
    onSearch: action("search-clicked")
  }
};
