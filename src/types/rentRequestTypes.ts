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
