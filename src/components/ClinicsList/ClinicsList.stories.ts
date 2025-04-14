import type { Meta, StoryObj } from "@storybook/react";
import ClinicsList from "./ClinicsList";

type ClinicCardProps = {
  imageURL: string;
  title: string;
  features: string[];
  rating: number;
  reviewsCount: number;
  price: number;
  priceUnit: string;
  isFavorited: boolean;
  onFavoriteToggle: () => void;
  onClick: () => void;
};

const meta = {
  title: "Components/ClinicsList",
  component: ClinicsList,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "A grid display of available medical clinic spaces",
    docs: {
      description: {
        component: "ClinicsList displays a collection of medical clinic spaces in a responsive grid layout. Each clinic card shows an image, title, features, rating, and price information.",
      },
    },
    viewport: {
      defaultViewport: "responsive",
    },
  },
} satisfies Meta<typeof ClinicsList>;

export default meta;
type Story = StoryObj<typeof ClinicsList>;

// Sample clinic data
const sampleClinics: ClinicCardProps[] = [
  {
    imageURL: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
    title: "Medical Office with all the amenities",
    features: ["Entire Office", "2 Consulting Rooms", "Waiting Area", "1 Private Bath"],
    rating: 5.0,
    reviewsCount: 318,
    price: 325,
    priceUnit: "day",
    isFavorited: false,
    onFavoriteToggle: () => console.log("Toggle favorite"),
    onClick: () => console.log("Clinic clicked"),
  },
  {
    imageURL: "https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=800&auto=format&fit=crop",
    title: "Premium Medical Center",
    features: ["3 Consulting Rooms", "Reception Area", "2 Private Baths", "Staff Room"],
    rating: 4.8,
    reviewsCount: 245,
    price: 450,
    priceUnit: "day",
    isFavorited: false,
    onFavoriteToggle: () => console.log("Toggle favorite"),
    onClick: () => console.log("Clinic clicked"),
  }
];

/**
 * Default story showing multiple clinic cards in a grid
 */
export const Default: Story = {
  args: {
    clinics: sampleClinics,
  },
};

/**
 * Story showing a single clinic card
 */
export const SingleClinic: Story = {
  args: {
    clinics: [sampleClinics[0]],
  },
};

/**
 * Story showing favorited clinics
 */
export const WithFavorites: Story = {
  args: {
    clinics: [
      { ...sampleClinics[0], isFavorited: true },
      { ...sampleClinics[1], isFavorited: true },
      { ...sampleClinics[2], isFavorited: false },
    ],
  },
};
