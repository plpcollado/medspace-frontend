import { env } from "@/config/env";
import { AuthService } from "./AuthService";
import axios from "axios";
import { ApiResponse } from "@/types/serviceTypes";
import { ClinicEquipmentType } from "@/types/clinicTypes";

export class ClinicEquipmentService {
  static BASE_URL = env.NEXT_PUBLIC_API_URL + "/clinic-equipments";

  static async uploadClinicEquipment(
    type: ClinicEquipmentType,
    quantity: number,
    clinicId: number
  ) {
    try {
      const headers = await AuthService.getAuthHeaders();
      const body = {
        clinicId,
        type,
        quantity
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
        "[ClinicEquipmentService]: Upload clinic equipment to server error:",
        error
      );
      throw error;
    }
  }
}
