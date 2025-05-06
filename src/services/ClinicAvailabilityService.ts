import { env } from "@/config/env";
import { AuthService } from "./AuthService";
import axios from "axios";
import { ApiResponse } from "@/types/serviceTypes";
import { safeApiCall } from "@/lib/apiUtils";

export class ClinicAvailabilityService {
  static BASE_URL = env.NEXT_PUBLIC_API_URL + "/clinic-availabilities";

  static async uploadClinicAvailability(
    clinicId: number,
    fromTime: string,
    toTime: string,
    dayOfWeek: string
  ) {
    const headers = await AuthService.getAuthHeaders();
    const body = {
      clinicId,
      startTime: fromTime,
      endTime: toTime,
      weekDay: dayOfWeek
    };

    return safeApiCall(
      () =>
        axios
          .post<ApiResponse<null>>(this.BASE_URL, body, { headers })
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.message);
            return res.data;
          }),
      "ClinicAvailabilityService: upload clinic availability"
    );
  }
}
