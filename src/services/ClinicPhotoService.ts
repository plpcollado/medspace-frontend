import { env } from "@/config/env";
import { AuthService } from "./AuthService";
import axios from "axios";
import { ApiResponse } from "@/types/serviceTypes";
import { StorageService } from "./StorageService";

export class ClinicPhotoService {
  static BASE_URL = env.NEXT_PUBLIC_API_URL + "/clinic-photos";

  static async uploadClinicPhoto(
    photo: File,
    path: string,
    clinicId: number,
    isPrimary: boolean
  ) {
    const bucketPath = `clinic-photos/${clinicId}-${path}`;
    try {
      await StorageService.uploadImage(photo, bucketPath);
    } catch (error) {
      console.error(
        "[ClinicPhotoService]: Upload clinic to Cloud error:",
        error
      );
      throw error;
    }
    try {
      const headers = await AuthService.getAuthHeaders();
      const body = {
        clinicId,
        isPrimary,
        path: bucketPath
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
        "[ClinicPhotoService]: Upload clinic photo to server error:",
        error
      );
      throw error;
    }
  }
}
