export type UserType = "TENANT" | "LANDLORD" | "ANALYST";

export interface TenantSpecialty {
  id: number;
  name: string;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  firebaseUid: string;
  profilePhotoUrl: string;
  userType: UserType;
  tenantSpecialty: TenantSpecialty;
  averageRating: number;
  createdAt: Date;
  tenantProfessionalLicenseUrl: string;
  stripeCustomerId: string;
  defaultPaymentMethodId: string;
}

export type UserCompact = Pick<
  User,
  "id" | "fullName" | "email" | "profilePhotoUrl" | "userType"
>;
