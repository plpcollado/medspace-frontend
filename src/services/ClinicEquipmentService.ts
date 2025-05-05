import { env } from "@/config/env";
import { AuthService } from "./AuthService";
import axios from "axios";
import { ApiResponse } from "@/types/serviceTypes";
import { ClinicEquipmentType } from "@/types/clinicTypes";
import { safeApiCall } from "@/lib/apiUtils";

export class ClinicEquipmentService {
  static BASE_URL = env.NEXT_PUBLIC_API_URL + "/clinic-equipments";

  static async uploadClinicEquipment(
    type: ClinicEquipmentType,
    quantity: number,
    clinicId: number
  ) {
    const headers = await AuthService.getAuthHeaders();
    const body = {
      clinicId,
      type,
      quantity
    };

    return safeApiCall(
      () =>
        axios
          .post<ApiResponse<null>>(this.BASE_URL, body, { headers })
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.message);
            return res.data;
          }),
      "ClinicEquipmentService: upload clinic equipment"
    );
  }
}
