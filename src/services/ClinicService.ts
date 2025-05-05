import { env } from "@/config/env";
import {
  Clinic,
  ClinicEquipmentType,
  ClinicRegistrationData
} from "@/types/clinicTypes";
import { ApiResponse } from "@/types/serviceTypes";
import { AuthService } from "./AuthService";
import axios from "axios";
import { format } from "date-fns";
import { safeApiCall } from "@/lib/apiUtils";

export class ClinicService {
  static BASE_URL = env.NEXT_PUBLIC_API_URL + "/clinics";

  static async createClinic(
    data: ClinicRegistrationData
  ): Promise<ApiResponse<Clinic>> {
    const body = {
      displayName: data.displayName,
      category: data.category,
      pricePerDay: data.pricePerDay,
      maxStayDays: data.maximumStayInDays,
      description: data.description,
      availableFromDate: data.availableFromDate,
      availableToDate: data.availableToDate,

      // TODO: update address fields with the correct data
      addressStreet: "Av hacker",
      addressCity: "California",
      addressState: "California",
      addressZip: "123",
      addressCountry: "USA",
      addressLongitude: "134.234",
      addressLatitude: "1234.23"
    };

    const headers = await AuthService.getAuthHeaders();
    return safeApiCall(
      () =>
        axios
          .post<ApiResponse<Clinic>>(this.BASE_URL, body, { headers })
          .then((res) => res.data),
      "ClinicService: createClinic"
    );
  }

  static async getClinics(settings: {
    includePhotos: boolean;
    includeEquipments: boolean;
    includeAvailabilities: boolean;
    targetDate?: Date;
    equipmentList?: ClinicEquipmentType[];
    targetHour?: string;
    targetCity?: string;
  }): Promise<Clinic[]> {
    try {
      const headers = await AuthService.getAuthHeaders();

      const params = new URLSearchParams();
      params.append("photos", settings.includePhotos.toString());
      params.append("equipments", settings.includeEquipments.toString());
      params.append(
        "availabilities",
        settings.includeAvailabilities.toString()
      );

      if (settings.targetDate) {
        const date = format(settings.targetDate, "yyyy-MM-dd");
        params.append("date", date);
      }

      if (settings.equipmentList && settings.equipmentList.length > 0) {
        settings.equipmentList.forEach((equipment) => {
          params.append("equipmentList", equipment);
        });
      }

      if (settings.targetHour) {
        params.append("hour", settings.targetHour);
      }

      if (settings.targetCity) {
        params.append("city", settings.targetCity);
      }

      const response = await axios.get<ApiResponse<Clinic[]>>(
        `${this.BASE_URL}?${params.toString()}`,
        {
          headers
        }
      );

      return response.data.data || [];
    } catch (error) {
      console.error("[ClinicService]: Get clinic by ID error:", error);
      throw error;
    }
  }
}
