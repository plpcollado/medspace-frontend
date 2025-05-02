import { env } from "@/config/env";
import { ClinicModel, ClinicRegistrationData } from "@/types/clinicTypes";
import { ApiResponse } from "@/types/serviceTypes";
import { AuthService } from "./AuthService";
import axios from "axios";

export class ClinicService {
  static BASE_URL = env.NEXT_PUBLIC_API_URL + "/clinics";

  static async createClinic(
    data: ClinicRegistrationData
  ): Promise<ApiResponse<ClinicModel>> {
    try {
      const body = {
        displayName: data.displayName,
        category: data.category,
        pricePerDay: data.pricePerDay,
        maxStayDays: data.maximumStayInDays,
        description: data.description,

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
      const response = await axios.post<ApiResponse<ClinicModel>>(
        this.BASE_URL,
        body,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("[ClinicService]: Create clinic error:", error);
      throw error;
    }
  }
}
