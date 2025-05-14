import { ApiResponse } from "./serviceTypes";

export const RENT_REQUEST_STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  DENIED: "DENIED"
};
export type RentRequestStatusType =
  (typeof RENT_REQUEST_STATUS)[keyof typeof RENT_REQUEST_STATUS];

export interface RentRequestPreview {
  id: string;
  startDate: string;
  endDate: string;
  comments: string;
  status: RentRequestStatusType;
  tenantId: number;
  clinicId: number;
  clinicDisplayName: string;
  tenantFullName: string;
  tenantProfilePictureUrl: string;
}

export interface RentRequestDashboardData {
  rentRequestId: number;
  tenantName: string;
  clinicName: string;
  status: string;
  createdAt: string;
  tenantSpecialty: string;
  clinicAddress: string;
  clinicBorough: string;
  clinicLatitude: number;
  clinicLongitude: number;
}

export interface RentRequestDashboardResponse extends ApiResponse<RentRequestDashboardData[]> {
  success: boolean;
  message: string;
  data: RentRequestDashboardData[];
}
