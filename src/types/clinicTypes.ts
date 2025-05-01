export const CLINIC_CATEGORIES = [
  "GENERAL_PURPOSE",
  "DENTAL",
  "DERMATOLOGY",
  "GYNECOLOGY",
  "CARDIOLOGY",
  "PEDIATRICS"
];
export type ClinicCategory = (typeof CLINIC_CATEGORIES)[number];

export const CLINIC_EQUIPMENTS = [
  "X_RAY",
  "ULTRASOUND",
  "MRI",
  "CT_SCAN",
  "LABORATORY",
  "SURGICAL_THEATER",
  "PHARMACY",
  "REHABILITATION"
];
export type ClinicEquipment = (typeof CLINIC_EQUIPMENTS)[number];

export interface ClinicDailyAvailability {
  dayOfWeek: string;
  fromTime: string | null;
  toTime: string | null;
  isActive: boolean;
}

export interface ClinicRegistrationData {
  displayName: string;
  description: string;
  category: ClinicCategory;
  equipments: ClinicEquipment[];
  size: number | null;
  photos: string[];
  pricePerDay: number | null;
  maximumStayInDays: number | null;
  availabilities: ClinicDailyAvailability[];
  propertyProof: File | null;
}
