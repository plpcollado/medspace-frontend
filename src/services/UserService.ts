import axios from "axios";
import { env } from "@/config/env";
import { User, UserPublic, UserRegistrationData } from "@/types/userTypes";
import { ApiResponse } from "@/types/serviceTypes";
import { AuthService } from "./AuthService";

export class UserService {
  static BASE_URL = env.NEXT_PUBLIC_API_URL + "/users";

  static async createUserProfile(
    data: Omit<UserRegistrationData, "password">
  ): Promise<ApiResponse<null>> {
    try {
      const formData = new FormData();

      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("pfp", data.pfp);
      formData.append("userType", data.userType);
      formData.append("officialId", data.officialId);

      if (data.userType === "TENANT") {
        formData.append(
          "tenantProfessionalLicense",
          data.tenantProfessionalLicense!
        );
        formData.append(
          "tenantProfessionalLicenseNumber",
          data.tenantProfessionalLicenseNumber!
        );
        formData.append("tenantSpecialtyId", String(data.tenantSpecialtyId));
      }
      const headers = await AuthService.getAuthHeaders();

      const response = await axios.post<ApiResponse<null>>(
        this.BASE_URL,
        formData,
        { headers }
      );

      return response.data;
    } catch (error) {
      console.error("[UserService]: Create user profile error:", error);
      throw error;
    }
  }

  static async fetchCurrentUserProfile(): Promise<User> {
    try {
      const headers = await AuthService.getAuthHeaders();

      const response = await axios.get(this.BASE_URL + "/me", {
        headers
      });

      const userData = response.data.data as User;
      userData.createdAt = new Date(userData.createdAt);

      return userData;
    } catch (error) {
      console.error("Error fetching user data", error);
      throw error; // You can customize the error handling as needed
    }
  }

  static async fetchPublicUserProfile(userId: number): Promise<UserPublic> {
    try {
      //simulate delay
      // await new Promise((resolve) => setTimeout(resolve, 5000));

      return {
        id: userId,
        fullName: "Osdaddy",
        averageRating: 3.8,
        createdAt: new Date(),
        pfpPath: "https://avatar.iran.liara.run/public",
        bio: `Hi, I'm Sarah! I love traveling and meeting new people. When I'm not
                  hosting, you can find me hiking in the mountains or trying out new
                  restaurants in the city. I've been hosting on this platform for over 5
                  years and love sharing my favorite local spots with guests.`,
        userType: "LANDLORD",
        tenantSpecialty: {
          id: 1,
          name: "DENTAL"
        },
        clinics: [
          {
            id: 1,
            displayName: "Test Cl",
            averageRating: 4.5,
            addressState: "Tehran",
            category: "DERMATOLOGICAL",
            description: "A great place for dental care",
            pricePerDay: 100,
            mainPhotoPath:
              "https://ebmedical.ca/wp-content/uploads/2023/11/eb-medical-clinic-dougall-rd-0017-scaled.jpg"
          },
          {
            id: 1,
            displayName: "Test Cl",
            averageRating: 4.5,
            addressState: "Tehran",
            category: "DERMATOLOGICAL",
            description: "A great place for dental care",
            pricePerDay: 100,
            mainPhotoPath:
              "https://ebmedical.ca/wp-content/uploads/2023/11/eb-medical-clinic-dougall-rd-0017-scaled.jpg"
          },
          {
            id: 1,
            displayName: "Test Cl",
            averageRating: 4.5,
            addressState: "Tehran",
            category: "DERMATOLOGICAL",
            description: "A great place for dental care",
            pricePerDay: 100,
            mainPhotoPath:
              "https://ebmedical.ca/wp-content/uploads/2023/11/eb-medical-clinic-dougall-rd-0017-scaled.jpg"
          }
        ],
        reviews: [
          {
            rating: 5,
            body: "Great place!",
            createdAt: new Date(),
            userName: "John Doe",
            userPfpPath: "https://avatar.iran.liara.run/public"
          },
          {
            rating: 1,
            body: "Not good",
            createdAt: new Date(),
            userName: "Jane Doe",
            userPfpPath: "https://avatar.iran.liara.run/public"
          }
        ]
      };

      // const headers = await AuthService.getAuthHeaders();

      // const response = await axios.get(this.BASE_URL + "/me", {
      //   headers
      // });

      // const userData = response.data.data as User;
      // userData.createdAt = new Date(userData.createdAt);

      // return userData;
    } catch (error) {
      console.error("[UserService]: Error fetching public user data", error);
      throw error; // You can customize the error handling as needed
    }
  }
}
