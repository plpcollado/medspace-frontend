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
  phoneNumber: string;
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

export interface CreateUserProfileData
  extends Omit<
    User,
    | "id"
    | "firebaseUid"
    | "createdAt"
    | "averageRating"
    | "stripeCustomerId"
    | "defaultPaymentMethodId"
    | "password"
    | "tenantSpecialty"
  > {
  tenantSpecialtyId: number;
}
