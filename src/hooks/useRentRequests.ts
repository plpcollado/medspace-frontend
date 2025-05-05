import { useEffect, useState } from "react";
import {
  RENT_REQUEST_STATUS,
  RentRequestPreview
} from "@/types/rentRequestTypes";
import { RentRequestService } from "@/services/RentRequestService";
import { StorageService } from "@/services/StorageService";
import { useAuth } from "./useAuth";

export function useRentRequests() {
  const [rentRequests, setRentRequests] = useState<RentRequestPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchRequests = async () => {
      try {
        setLoading(true);

        const response = await RentRequestService.fetchRentRequestsByLandlord(
          RENT_REQUEST_STATUS.PENDING
        );

        if (!response.success || !response.data) {
          throw new Error("Failed to fetch rent requests");
        }

        const requestsWithPhotos = await Promise.all(
          response.data.map(async (request) => {
            try {
              const profilePictureUrl = await StorageService.getFileUrl(
                `profile_pictures/${request.tenantProfilePictureUrl}`
              );

              return {
                ...request,
                tenantProfilePictureUrl: profilePictureUrl
              };
            } catch {
              return {
                ...request,
                tenantProfilePictureUrl: "/pfp_placeholder.png"
              };
            }
          })
        );

        setRentRequests(requestsWithPhotos);
      } catch (err) {
        console.error("Error loading rent requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  return { rentRequests, loading };
}
