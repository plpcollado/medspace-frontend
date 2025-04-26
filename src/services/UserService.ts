import axios from "axios";
import { env } from "@/config/env";
import { User } from "@/types/userTypes";

export class UserService {
  static async getSelfUserDataFromDatabase(token: string): Promise<User> {
    try {
      const response = await axios.get(env.NEXT_PUBLIC_API_URL + "/users/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const userData = response.data.data as User;
      userData.createdAt = new Date(userData.createdAt);

      return userData;
    } catch (error) {
      console.error("Error fetching user data", error);
      throw error; // You can customize the error handling as needed
    }
  }
}
