import { env } from "@/config/env";
import { AuthService } from "./AuthService";
import axios from "axios";
import { ApiResponse } from "@/types/serviceTypes";

export class ClinicAvailabilityService {
  static BASE_URL = env.NEXT_PUBLIC_API_URL + "/clinic-availabilities";

  static async createClinicAvailability(
    clinicId: number,
    fromTime: string,
    toTime: string,
    dayOfWeek: string
  ) {
    try {
      const headers = await AuthService.getAuthHeaders();
      const body = {
        clinicId,
        startTime: fromTime,
        endTime: toTime,
        weekDay: dayOfWeek
      };

      const response = await axios.post<ApiResponse<null>>(
        this.BASE_URL,
        body,
        {
          headers: {
            ...headers,
            "Content-Type": "application/json"
          }
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (error) {
      console.error(
        "[ClinicAvailabilityService]: Create clinic availability error:",
        error
      );
      throw error;
    }
  }
}
