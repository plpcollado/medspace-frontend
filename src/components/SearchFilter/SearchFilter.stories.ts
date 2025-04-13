import type { Meta, StoryObj } from "@storybook/react";
import SearchFilter from "./SearchFilter";

const meta = {
  title: "Components/SearchFilter",
  component: SearchFilter,
  parameters: {
    layout: 'centered',
    componentSubtitle: 'A filter component that groups selection and action options to enhance user search experience',
    docs: {
      description: {
        component: 'The SearchFilter component provides duration selection options and action buttons for saving and equipment selection. It helps users refine their search and access additional functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onShowSavedToggle: {
      action: 'toggled',
      description: 'Callback when show saved is toggled',
    },
    onEquipmentChange: {
      action: 'equipment changed',
      description: 'Callback when equipment selection changes, receives array of selected equipment IDs',
    },
    onDurationChange: {
      action: 'duration changed',
      description: 'Callback when duration options change, receives array of selected durations',
    },
    equipmentOptions: {
      control: 'object',
      description: 'Required array of equipment options with id and name',
      table: {
        type: { 
          summary: '{ id: string; name: string }[]',
          detail: 'Array of equipment objects with id and name properties'
        }
      }
    },
  },
} satisfies Meta<typeof SearchFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

// Example equipment options for different scenarios
const basicEquipment = [
  { id: 'stethoscope', name: 'Stethoscope' },
  { id: 'blood_pressure', name: 'Blood Pressure Monitor' },
  { id: 'thermometer', name: 'Thermometer' },
];

const imagingEquipment = [
  { id: 'xray', name: 'X-Ray Machine' },
  { id: 'mri', name: 'MRI Scanner' },
  { id: 'ultrasound', name: 'Ultrasound Machine' },
  { id: 'ct', name: 'CT Scanner' },
];

const diagnosticEquipment = [
  { id: 'ecg', name: 'ECG Machine' },
  { id: 'eeg', name: 'EEG Machine' },
  { id: 'emg', name: 'EMG Machine' },
  { id: 'holter', name: 'Holter Monitor' },
];

export const BasicEquipment: Story = {
  args: {
    equipmentOptions: basicEquipment,
    onShowSavedToggle: () => {},
    onEquipmentChange: (selectedEquipment) => {
      console.log('Selected equipment:', selectedEquipment);
    },
    onDurationChange: (selectedDurations) => {
      console.log('Selected durations:', selectedDurations);
    },
  },
};

export const ImagingEquipment: Story = {
  args: {
    equipmentOptions: imagingEquipment,
    onShowSavedToggle: () => {},
    onEquipmentChange: (selectedEquipment) => {
      console.log('Selected equipment:', selectedEquipment);
    },
    onDurationChange: (selectedDurations) => {
      console.log('Selected durations:', selectedDurations);
    },
  },
};

export const DiagnosticEquipment: Story = {
  args: {
    equipmentOptions: diagnosticEquipment,
    onShowSavedToggle: () => {},
    onEquipmentChange: (selectedEquipment) => {
      console.log('Selected equipment:', selectedEquipment);
    },
    onDurationChange: (selectedDurations) => {
      console.log('Selected durations:', selectedDurations);
    },
  },
};
