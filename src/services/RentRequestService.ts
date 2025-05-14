import { ApiResponse } from "@/types/serviceTypes";
import { AuthService } from "./AuthService";
import axios from "axios";
import { env } from "@/config/env";
import {
  RentRequestPreview,
  RentRequestStatusType,
  RentRequestDashboardResponse,
  RentRequestDashboardData
} from "@/types/rentRequestTypes";
import { safeApiCall } from "@/lib/apiUtils";

export class RentRequestService {
  static BASE_URL = env.NEXT_PUBLIC_API_URL + "/rent-requests";

  static async getSpecialistsDashboard(): Promise<RentRequestDashboardResponse> {
    try {
      const headers = await AuthService.getAuthHeaders();
      
      // If no auth headers, user is not authenticated
      if (!headers.Authorization) {
        return {
          success: false,
          message: 'User not authenticated',
          data: []
        };
      }

      const response = await safeApiCall<ApiResponse<RentRequestDashboardData[]>>(
        () => axios.get(`${this.BASE_URL}/specialists-dashboard`, { headers })
          .then(res => res.data),
        "RentRequestService: getSpecialistsDashboard"
      );

      return {
        success: response.success,
        message: response.message,
        data: response.data || []
      };
    } catch (error) {
      console.error('Error in getSpecialistsDashboard:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred',
        data: []
      };
    }
  }

  static async fetchRentRequestsByLandlord(
    status: RentRequestStatusType
  ): Promise<ApiResponse<RentRequestPreview[]>> {
    try {
      const headers = await AuthService.getAuthHeaders();

      const params = new URLSearchParams();
      params.append("status", status);
      const response = await axios.get<ApiResponse<RentRequestPreview[]>>(
        this.BASE_URL + "/my-received-requests" + `?${params}`,
        {
          headers
        }
      );
      return response.data;
    } catch (error) {
      console.error("[RentRequestService]: Fetch rent requests error:", error);
      throw error;
    }
  }

  static async sendRentRequest(
    clinicId: number,
    comments: string,
    dates: Date[]
  ): Promise<void> {
    try {
      const headers = await AuthService.getAuthHeaders();

      const body = {
        clinicId,
        comments,
        dates: dates.map((date) => date.toISOString().split("T")[0])
      };

      await axios.post<ApiResponse<null>>(this.BASE_URL, body, {
        headers
      });
    } catch (error) {
      console.error("[RentRequestService]: Send rent request error:", error);
      throw error;
    }
  }

  static async rejectRentRequest(rentRequestId: string) {
    try {
      const headers = await AuthService.getAuthHeaders();

      await axios.put<ApiResponse<null>>(
        this.BASE_URL + `/${rentRequestId}/reject`,
        {},
        {
          headers
        }
      );
    } catch (error) {
      console.error("[RentRequestService]: Reject rent request error:", error);
      throw error;
    }
  }

  static async acceptRentRequest(rentRequestId: string) {
    try {
      const headers = await AuthService.getAuthHeaders();

      await axios.put<ApiResponse<null>>(
        this.BASE_URL + `/${rentRequestId}/accept`,
        {},
        {
          headers
        }
      );
    } catch (error) {
      console.error("[RentRequestService]: Accept rent request error:", error);
      throw error;
    }
  }
}
