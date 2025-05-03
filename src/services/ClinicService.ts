import { env } from "@/config/env";
import { Clinic, ClinicRegistrationData } from "@/types/clinicTypes";
import { ApiResponse } from "@/types/serviceTypes";
import { AuthService } from "./AuthService";
import axios from "axios";
import { MOCK_CLINICS } from "@/mocks/clinics";

export class ClinicService {
  static BASE_URL = env.NEXT_PUBLIC_API_URL + "/clinics";

  static async createClinic(data: ClinicRegistrationData): Promise<void> {
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
      await axios.post<ApiResponse<Clinic>>(this.BASE_URL, body, {
        headers
      });
    } catch (error) {
      console.error("[ClinicService]: Create clinic error:", error);
      throw error;
    }
  }

  static async getClinics(): Promise<Clinic[]> {
    try {
      // const headers = await AuthService.getAuthHeaders();
      // const response = await axios.get<ApiResponse<Clinic[]>>(this.BASE_URL, {
      //   headers
      // });

      // return response.data.data!;

      return MOCK_CLINICS;
    } catch (error) {
      console.error("[ClinicService]: Get clinic by ID error:", error);
      throw error;
    }
  }
}
