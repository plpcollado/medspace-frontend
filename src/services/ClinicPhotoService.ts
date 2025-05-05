import { env } from "@/config/env";
import { AuthService } from "./AuthService";
import axios from "axios";
import { ApiResponse } from "@/types/serviceTypes";
import { StorageService } from "./StorageService";
import { safeApiCall } from "@/lib/apiUtils";

export class ClinicPhotoService {
  static BASE_URL = env.NEXT_PUBLIC_API_URL + "/clinic-photos";

  static async uploadClinicPhoto(
    photo: File,
    path: string,
    clinicId: number,
    isPrimary: boolean
  ) {
    const bucketPath = `clinic-photos/${clinicId}-${path}`;
    await safeApiCall(
      () => StorageService.uploadImage(photo, bucketPath),
      "ClinicPhotoService: upload clinic photo"
    );

    const headers = await AuthService.getAuthHeaders();
    const body = {
      clinicId,
      isPrimary,
      path: bucketPath
    };

    return safeApiCall(
      () =>
        axios
          .post<ApiResponse<null>>(this.BASE_URL, body, {
            headers: { ...headers, "Content-Type": "application/json" }
          })
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.message);
            return res.data;
          }),
      "ClinicPhotoService: uploadClinicPhoto"
    );
  }
}
