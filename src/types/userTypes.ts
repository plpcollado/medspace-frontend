import { ClinicPreview } from "./clinicTypes";
import { Review } from "./reviewTypes";

export type UserType = "TENANT" | "LANDLORD" | "ANALYST";

export const TENANT_SPECIALTIES = [
  "DENTAL",
  "GASTROENTEROLOGY",
  "UROLOGY"
] as const;

export type TenantSpecialtyType = (typeof TENANT_SPECIALTIES)[number];

export interface TenantSpecialty {
  id: number;
  name: TenantSpecialtyType;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  firebaseUid: string;
  pfpPath: string;
  userType: UserType;
  tenantSpecialty?: TenantSpecialty;
  averageRating: number;
  createdAt: Date;
  tenantLicensePath?: string;
  stripeCustomerId: string;
  defaultPaymentMethodId: string;
  bio: string;
}

export interface UserPublic
  extends Pick<
    User,
    | "id"
    | "fullName"
    | "averageRating"
    | "tenantSpecialty"
    | "userType"
    | "createdAt"
    | "bio"
    | "pfpPath"
  > {
  reviews: Review[];
  clinics?: ClinicPreview[];
}

export interface UserRegistrationData {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  pfp: File;
  userType: UserType;
  officialId: File;
  tenantProfessionalLicense?: File;
  tenantProfessionalLicenseNumber?: string;
  tenantSpecialtyId?: number;
}
